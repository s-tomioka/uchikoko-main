import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }))

vi.mock('resend', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Resend: vi.fn(function (this: any) {
    this.emails = { send: mockSend }
  }),
}))

import { POST } from './route'

const SHOP_EMAIL = 'shop@test.com'
const BLOB_URL = 'https://example.blob.vercel-storage.com/orders/2026-05-22_1430_uuid/pet.jpg'
const TEST_UUID = '550e8400-e29b-41d4-a716-446655440000'

beforeEach(() => {
  process.env.RESEND_API_KEY = 're_test'
  process.env.SHOP_EMAIL = SHOP_EMAIL
  process.env.RESEND_FROM_EMAIL = 'onboarding@resend.dev'
  process.env.PHOTO_DOWNLOAD_SECRET = 'test-secret'
  mockSend.mockResolvedValue({ data: { id: 'email-id' }, error: null })
  vi.spyOn(crypto, 'randomUUID').mockReturnValue(TEST_UUID as ReturnType<typeof crypto.randomUUID>)
})

const VALID_FIELDS: Record<string, string> = {
  name: '山田 太郎',
  email: 'test@example.com',
  phone: '09012345678',
  postalCode: '100-0001',
  prefecture: '東京都',
  addressLine: '千代田区千代田1-1',
  productName: 'オリジナルペット陶器のみ',
  price: '¥33,000',
  priceNote: '税込・送料無料',
}

function makeRequest(fields: Record<string, string>, photoUrls: string[] = [], orderId: string | null = TEST_UUID) {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.append(k, v)
  photoUrls.forEach((url) => fd.append('photoUrls', url))
  if (orderId !== null) fd.append('orderId', orderId)
  return { formData: () => Promise.resolve(fd) } as unknown as Request
}

describe('POST /api/order', () => {
  it('有効な注文データで200とok:trueを返す', async () => {
    const res = await POST(makeRequest(VALID_FIELDS))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('ショップオーナーとお客様の両方に合計2通メールを送信する', async () => {
    await POST(makeRequest(VALID_FIELDS))
    expect(mockSend).toHaveBeenCalledTimes(2)
  })

  it('ショップオーナー宛メールの件名に【うちここ】新規注文と注文IDが含まれる', async () => {
    await POST(makeRequest(VALID_FIELDS))
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: SHOP_EMAIL,
        subject: `【うちここ】新規注文：${TEST_UUID}`,
      })
    )
  })

  it('お客様宛メールに【ご注文確認】が含まれ正しいアドレスに送る', async () => {
    await POST(makeRequest(VALID_FIELDS))
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        subject: expect.stringContaining('【ご注文確認】'),
      })
    )
  })

  it('ショップ・お客様両方のメール本文に注文IDが含まれる', async () => {
    await POST(makeRequest(VALID_FIELDS))
    for (const call of mockSend.mock.calls) {
      expect(call[0].html).toContain(TEST_UUID)
    }
  })

  it('photoUrlsが渡された場合ショップ宛メールにプロキシURLが含まれる', async () => {
    const res = await POST(makeRequest(VALID_FIELDS, [BLOB_URL]))
    expect(res.status).toBe(200)
    const shopCall = mockSend.mock.calls[0][0]
    expect(shopCall.html).toContain('/api/photos/download')
  })

  it('メールに添付ファイルは含まれない', async () => {
    await POST(makeRequest(VALID_FIELDS, [BLOB_URL]))
    expect(mockSend).not.toHaveBeenCalledWith(
      expect.objectContaining({ attachments: expect.anything() })
    )
  })

  it('Vercel Blob以外のURLはメールに含まれない（SSRF対策）', async () => {
    const maliciousUrl = 'https://evil.example.com/steal-data'
    await POST(makeRequest(VALID_FIELDS, [maliciousUrl]))
    const shopCall = mockSend.mock.calls[0][0]
    expect(shopCall.html).not.toContain('evil.example.com')
    expect(shopCall.html).toContain('写真なし')
  })

  it('必須フィールド(email)が欠けている場合は400を返しメールを送らない', async () => {
    const { email: _email, ...withoutEmail } = VALID_FIELDS
    const res = await POST(makeRequest(withoutEmail))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('メール送信が失敗した場合は500を返す', async () => {
    mockSend.mockRejectedValueOnce(new Error('network error'))
    const res = await POST(makeRequest(VALID_FIELDS))
    expect(res.status).toBe(500)
  })

  it('無効なメールアドレスは400を返しメールを送らない', async () => {
    const res = await POST(makeRequest({ ...VALID_FIELDS, email: 'not-an-email' }))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('無効な電話番号は400を返しメールを送らない', async () => {
    const res = await POST(makeRequest({ ...VALID_FIELDS, phone: 'invalid' }))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('無効な郵便番号は400を返しメールを送らない', async () => {
    const res = await POST(makeRequest({ ...VALID_FIELDS, postalCode: '12345678' }))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('名前に改行が含まれる場合は400を返す（メールヘッダーインジェクション対策）', async () => {
    const res = await POST(makeRequest({ ...VALID_FIELDS, name: '山田\r\n太郎' }))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })

  it('名前に<script>が含まれる場合もメール本文でHTMLエスケープされる', async () => {
    const fields = { ...VALID_FIELDS, name: '<script>alert("xss")</script>' }
    const res = await POST(makeRequest(fields))
    if (res.status === 200) {
      const shopCall = mockSend.mock.calls[0][0]
      expect(shopCall.html).toContain('&lt;script&gt;')
      expect(shopCall.html).not.toContain('<script>')
    } else {
      expect(res.status).toBe(400)
    }
  })

  it('クライアントからorderIdが渡された場合、それをそのまま注文番号として使用する', async () => {
    const clientId = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
    await POST(makeRequest(VALID_FIELDS, [], clientId))
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: `【うちここ】新規注文：${clientId}`,
      })
    )
  })

  it('orderIdが渡されない場合は400を返しメールを送らない', async () => {
    const res = await POST(makeRequest(VALID_FIELDS, [], null))
    expect(res.status).toBe(400)
    expect(mockSend).not.toHaveBeenCalled()
  })
})

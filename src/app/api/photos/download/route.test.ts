import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createHmac } from 'crypto'

import { GET } from './route'

const SECRET = 'test-secret'
const BLOB_URL = 'https://example.blob.vercel-storage.com/orders/2026-05-22_1430_uuid/pet.jpg'

function makeToken(blobUrl: string, exp: number): string {
  return createHmac('sha256', SECRET).update(`${blobUrl}:${exp}`).digest('hex')
}

function makeUrl(blobUrl: string, exp: number, sig: string): Request {
  const params = new URLSearchParams({ url: blobUrl, exp: String(exp), sig })
  return new Request(`http://localhost/api/photos/download?${params}`)
}

beforeEach(() => {
  process.env.PHOTO_DOWNLOAD_SECRET = SECRET
  process.env.BLOB_READ_WRITE_TOKEN = 'rw_test_token'
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response('image-data', {
        status: 200,
        headers: { 'Content-Type': 'image/jpeg' },
      })
    )
  )
})

describe('GET /api/photos/download', () => {
  it('有効なトークンで200とblobコンテンツを返す', async () => {
    const exp = Date.now() + 1000 * 60 * 60
    const sig = makeToken(BLOB_URL, exp)
    const res = await GET(makeUrl(BLOB_URL, exp, sig))
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('image/jpeg')
  })

  it('有効なトークンでVercel BlobにAuthorizationヘッダー付きでfetchする', async () => {
    const exp = Date.now() + 1000 * 60 * 60
    const sig = makeToken(BLOB_URL, exp)
    await GET(makeUrl(BLOB_URL, exp, sig))
    expect(fetch).toHaveBeenCalledWith(
      BLOB_URL,
      expect.objectContaining({
        headers: { Authorization: 'Bearer rw_test_token' },
      })
    )
  })

  it('期限切れトークンで401を返す', async () => {
    const exp = Date.now() - 1000
    const sig = makeToken(BLOB_URL, exp)
    const res = await GET(makeUrl(BLOB_URL, exp, sig))
    expect(res.status).toBe(401)
  })

  it('不正な署名で401を返す', async () => {
    const exp = Date.now() + 1000 * 60 * 60
    const res = await GET(makeUrl(BLOB_URL, exp, 'invalid-signature-here-padded-to-64chars0000000000000000000000000'))
    expect(res.status).toBe(401)
  })

  it('urlパラメータが欠けている場合は400を返す', async () => {
    const exp = Date.now() + 1000 * 60 * 60
    const sig = makeToken(BLOB_URL, exp)
    const params = new URLSearchParams({ exp: String(exp), sig })
    const res = await GET(new Request(`http://localhost/api/photos/download?${params}`))
    expect(res.status).toBe(400)
  })

  it('expパラメータが欠けている場合は400を返す', async () => {
    const exp = Date.now() + 1000 * 60 * 60
    const sig = makeToken(BLOB_URL, exp)
    const params = new URLSearchParams({ url: BLOB_URL, sig })
    const res = await GET(new Request(`http://localhost/api/photos/download?${params}`))
    expect(res.status).toBe(400)
  })
})

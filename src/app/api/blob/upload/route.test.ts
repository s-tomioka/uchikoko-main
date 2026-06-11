import { describe, it, expect, vi, beforeEach } from 'vitest'

const { mockHandleUpload } = vi.hoisted(() => ({ mockHandleUpload: vi.fn() }))

vi.mock('@vercel/blob/client', () => ({
  handleUpload: mockHandleUpload,
}))

import { POST } from './route'

function makeRequest(body: object) {
  return new Request('http://localhost/api/blob/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  mockHandleUpload.mockResolvedValue({ type: 'blob.generate-client-token', clientToken: 'ct_test' })
})

describe('POST /api/blob/upload', () => {
  it('handleUploadの結果をJSONで返す', async () => {
    const result = { type: 'blob.generate-client-token', clientToken: 'ct_test' }
    mockHandleUpload.mockResolvedValue(result)

    const res = await POST(makeRequest({ type: 'blob.generate-client-token', payload: {} }))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual(result)
  })

  it('onBeforeGenerateTokenで許可画像形式と10MB上限を設定する', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let capturedOnBeforeGenerateToken: ((pathname: string) => Promise<any>) | undefined

    mockHandleUpload.mockImplementation(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async ({ onBeforeGenerateToken }: { onBeforeGenerateToken: (p: string) => Promise<any> }) => {
        capturedOnBeforeGenerateToken = onBeforeGenerateToken
        return { type: 'blob.generate-client-token', clientToken: 'ct_test' }
      }
    )

    await POST(makeRequest({ type: 'blob.generate-client-token', payload: {} }))

    const constraints = await capturedOnBeforeGenerateToken!('test.jpg')
    expect(constraints.allowedContentTypes).toEqual(
      expect.arrayContaining(['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp'])
    )
    expect(constraints.allowedContentTypes).not.toContain('application/pdf')
    expect(constraints.maximumSizeInBytes).toBe(20 * 1024 * 1024)
  })
})

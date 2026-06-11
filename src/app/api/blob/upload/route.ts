import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody
  const res = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp'],
      maximumSizeInBytes: 20 * 1024 * 1024,
    }),
  })
  return Response.json(res)
}

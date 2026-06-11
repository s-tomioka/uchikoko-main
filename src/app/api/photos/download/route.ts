import { createHmac, timingSafeEqual } from 'crypto'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  const exp = searchParams.get('exp')
  const sig = searchParams.get('sig')

  if (!url || !exp || !sig) return new Response(null, { status: 400 })
  if (Date.now() > Number(exp)) return new Response(null, { status: 401 })

  const secret = process.env.PHOTO_DOWNLOAD_SECRET!
  const expected = createHmac('sha256', secret).update(`${url}:${exp}`).digest('hex')

  let valid = false
  try {
    valid = timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return new Response(null, { status: 401 })
  }
  if (!valid) return new Response(null, { status: 401 })

  const blobRes = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  })

  return new Response(blobRes.body, {
    status: blobRes.status,
    headers: {
      'Content-Type': blobRes.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Disposition': blobRes.headers.get('Content-Disposition') ?? 'attachment',
    },
  })
}

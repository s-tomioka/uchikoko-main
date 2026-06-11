import { Resend } from 'resend'
import { createHmac } from 'crypto'
import { orderSchema, type OrderFields } from '@/lib/order-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

function isVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith('.blob.vercel-storage.com')
  } catch {
    return false
  }
}

function signPhotoUrl(blobUrl: string): string {
  const exp = Date.now() + 90 * 24 * 60 * 60 * 1000
  const secret = process.env.PHOTO_DOWNLOAD_SECRET!
  const sig = createHmac('sha256', secret).update(`${blobUrl}:${exp}`).digest('hex')
  const params = new URLSearchParams({ url: blobUrl, exp: String(exp), sig })
  const base =
    process.env.APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3001')
  return `${base}/api/photos/download?${params}`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildShopHtml(o: OrderFields, signedPhotoUrls: string[], orderId: string): string {
  const photoSection =
    signedPhotoUrls.length > 0
      ? `<h3 style="margin-top:16px">ペット写真</h3><ul>${signedPhotoUrls.map((url, i) => `<li><a href="${url}">写真 ${i + 1}</a></li>`).join('')}</ul>`
      : '<p>写真なし</p>'

  return `
<h2>新規注文が入りました</h2>
<table style="border-collapse:collapse">
  <tr><th style="text-align:left;padding:4px 12px 4px 0">注文番号</th><td>${orderId}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">お名前</th><td>${escapeHtml(o.name)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">メールアドレス</th><td>${escapeHtml(o.email)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">電話番号</th><td>${escapeHtml(o.phone)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">郵便番号</th><td>${escapeHtml(o.postalCode)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">都道府県</th><td>${escapeHtml(o.prefecture)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">住所</th><td>${escapeHtml(o.addressLine)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">メモ</th><td>${o.memo ? escapeHtml(o.memo).replace(/\n/g, '<br>') : '（なし）'}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">商品</th><td>${escapeHtml(o.productName)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">金額</th><td>${escapeHtml(o.price)}（${escapeHtml(o.priceNote)}）</td></tr>
</table>
${photoSection}
`.trim()
}

function buildCustomerHtml(o: OrderFields, orderId: string): string {
  return `
<p>${escapeHtml(o.name)} 様</p>
<p>この度は「うちここ」にご注文いただきありがとうございます。</p>
<p>以下の内容でご注文を受け付けました。</p>
<table style="border-collapse:collapse">
  <tr><th style="text-align:left;padding:4px 12px 4px 0">注文番号</th><td>${orderId}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">商品</th><td>${escapeHtml(o.productName)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">金額</th><td>${escapeHtml(o.price)}（${escapeHtml(o.priceNote)}）</td></tr>
</table>
<p>
  ご注文内容を確認し、担当者よりメールにてご連絡いたします。<br>
  頂いたメールアドレスに3Dデータとお支払い手続きのURLをお送りいたします。<br>
  お支払い後、制作を開始致します。
</p>
<p>なにかご不明な点がございましたら、お気軽にご連絡ください。</p>
<p>うちここ</p>
`.trim()
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const result = orderSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const order = result.data

  const clientOrderId = formData.get('orderId')
  if (typeof clientOrderId !== 'string' || clientOrderId.length === 0) {
    console.error('[order] orderId missing — possible unauthorized direct API call')
    return Response.json({ error: 'orderId is required' }, { status: 400 })
  }
  const orderId = clientOrderId

  const photoUrls = formData
    .getAll('photoUrls')
    .filter((u): u is string => typeof u === 'string' && isVercelBlobUrl(u))

  const signedPhotoUrls = photoUrls.map(signPhotoUrl)
  const shopEmail = process.env.SHOP_EMAIL!
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

  try {
    await resend.emails.send({
      from,
      to: shopEmail,
      subject: `【うちここ】新規注文：${orderId}`,
      html: buildShopHtml(order, signedPhotoUrls, orderId),
    })

    await resend.emails.send({
      from,
      to: order.email,
      subject: '【ご注文確認】うちここより ご注文を受け付けました',
      html: buildCustomerHtml(order, orderId),
    })
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

import { Resend } from 'resend'
import { contactSchema, type ContactFields } from '@/lib/contact-schema'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function nl2br(str: string): string {
  return escapeHtml(str).replace(/\r?\n/g, '<br>')
}

function buildShopHtml(c: ContactFields): string {
  return `
<h2>お問い合わせが届きました</h2>
<table style="border-collapse:collapse">
  <tr><th style="text-align:left;padding:4px 12px 4px 0">お名前</th><td>${escapeHtml(c.name)}</td></tr>
  <tr><th style="text-align:left;padding:4px 12px 4px 0">メールアドレス</th><td>${escapeHtml(c.email)}</td></tr>
</table>
<h3 style="margin-top:16px">お問い合わせ内容</h3>
<p>${nl2br(c.message)}</p>
`.trim()
}

function buildCustomerHtml(c: ContactFields): string {
  return `
<p>${escapeHtml(c.name)} 様</p>
<p>この度は「うちここ」へお問い合わせいただきありがとうございます。</p>
<p>以下の内容で受け付けました。担当者より追ってご連絡いたします。</p>
<h3 style="margin-top:16px">お問い合わせ内容</h3>
<p>${nl2br(c.message)}</p>
<p>うちここ</p>
`.trim()
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const result = contactSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return Response.json({ error: result.error.flatten() }, { status: 400 })
  }
  const contact = result.data

  const shopEmail = process.env.SHOP_EMAIL!
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from,
      to: shopEmail,
      replyTo: contact.email,
      subject: `【うちここ】お問い合わせ：${contact.name} 様`,
      html: buildShopHtml(contact),
    })

    await resend.emails.send({
      from,
      to: contact.email,
      subject: '【お問い合わせ受付】うちここ',
      html: buildCustomerHtml(contact),
    })
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return Response.json({ ok: true })
}

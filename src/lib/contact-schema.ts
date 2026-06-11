import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください')
    .regex(/^[^\r\n]+$/, 'お名前に改行を含めることはできません'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  message: z.string().min(1, 'お問い合わせ内容を入力してください').max(5000, 'お問い合わせ内容が長すぎます'),
})

export type ContactFields = z.infer<typeof contactSchema>

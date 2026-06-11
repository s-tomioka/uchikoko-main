import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください').regex(/^[^\r\n]+$/, 'お名前に改行を含めることはできません'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  phone: z
    .string()
    .regex(/^[\d\-]{10,13}$/, '有効な電話番号を入力してください（例：090-1234-5678）'),
  postalCode: z
    .string()
    .regex(/^\d{3}-?\d{4}$/, '有効な郵便番号を入力してください（例：100-0001）'),
  prefecture: z.string().min(1, '都道府県を入力してください'),
  addressLine: z.string().min(1, '住所を入力してください'),
  memo: z.string().max(1000, 'メモは1000文字以内で入力してください').optional(),
})

export const orderSchema = customerSchema.extend({
  productName: z.string().min(1),
  price: z.string().min(1),
  priceNote: z.string().min(1),
})

export type CustomerFields = z.infer<typeof customerSchema>
export type OrderFields = z.infer<typeof orderSchema>

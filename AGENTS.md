<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# プロジェクト概要

**サービス名：** うちここ  
ペットの写真をもとに瀬戸焼の老舗工房でオリジナル陶器を制作・販売するECサービス。

**商品ラインナップ**
- 単体注文（`/single/order`）: オリジナルペット陶器のみ。8cm / 13cm / 18cm / 21cm の4サイズ
- セット注文（`/sets/[id]/order`）: 陶器＋仏壇小物セット。サイズ固定（13cm）

---

# 技術スタック

| 用途 | ライブラリ |
|------|-----------|
| フレームワーク | Next.js App Router（`node_modules/next/dist/docs/` を必ず参照） |
| メール送信 | Resend |
| ファイルストレージ | Vercel Blob（プライベートストア） |
| バリデーション | Zod v4（`src/lib/order-schema.ts` で共有スキーマ） |
| テスト | Vitest + jsdom |

---

# 開発ルール

## TDD（テスト駆動開発）
- **テストを先に書いてから実装する**
- テストが通るまで実装を修正する
- テストを通すためにテストケースを捻じ曲げることは絶対にやめること

## コミット
- **コード変更と CHANGELOG 更新は必ず同一コミットに含める**
- CHANGELOG は `CHANGELOG.md` の `## [Unreleased]` セクション先頭に追記する

## サービス名表記
- 正式名称は **うちここ**
- メール本文・UIテキストでは `「うちここ」`（鉤括弧付き）と表記する
- メール署名・件名括弧内（`【うちここ】`）は鉤括弧なしでよい

---

# アーキテクチャ

## 写真アップロードフロー

```
ブラウザ → POST /api/blob/upload（トークン取得）
ブラウザ → PUT vercel.com/api/blob/（直接アップロード）
ブラウザ → POST /api/order（テキスト + Blob URL のみ）
```

- Vercel Function の 4.5MB 制限を回避するため、写真はブラウザから Vercel Blob に直接アップロード
- 許可形式: `image/jpeg / image/png / image/heic / image/heif / image/webp`
- 1枚あたり 20MB まで、最大3枚

## 注文ID（orderId）

- **クライアントで `crypto.randomUUID()` を1回だけ生成**（`handleSubmit` の先頭、ループの外）
- 全写真を `orders/${datePart}_${orderId}/` の同一フォルダに格納
- `orderId` を FormData でサーバーに送り、メールの注文番号として使用
- Blob フォルダ名とメールの注文番号が一致する設計
- サーバー側で `orderId` が含まれないリクエストは不正として 400 を返す

## 写真アクセス（HMACプロキシ）

- Blob は `access: 'private'` で保存
- メール内リンクは `/api/photos/download?url=…&exp=…&sig=…` 形式のプロキシURL
- HMAC-SHA256 署名・有効期限 90 日・`timingSafeEqual` で検証
- `PHOTO_DOWNLOAD_SECRET` 環境変数が必要

## SSRF対策

- `/api/order` で受け取る `photoUrls` は `*.blob.vercel-storage.com` のみ許可
- それ以外の URL はメールに含めない

---

# 環境変数

`.env.example` を参照。最低限以下が必要：

| 変数名 | 用途 |
|--------|------|
| `RESEND_API_KEY` | メール送信 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob アクセス |
| `SHOP_EMAIL` | 受注通知の送信先 |
| `RESEND_FROM_EMAIL` | 送信元アドレス |
| `PHOTO_DOWNLOAD_SECRET` | HMACプロキシ署名キー |
| `APP_URL` | プロキシURLのベース（本番ドメイン or `http://localhost:3001`） |

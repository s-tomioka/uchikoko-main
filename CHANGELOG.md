# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Fixed

- **ヘッダーのナビリンクを別ページから踏んだときアンカーが効かないバグを修正**
  - `/privacy` や `/tokusho` などの別ページからナビリンクをクリックすると TOP に遷移するが `#sets` 等へスクロールされない問題
  - `isTopPage` でない場合は `<Link>` から `<a>` タグに切り替え、ブラウザのネイティブハッシュスクロールに委ねる方式で解決

### Added

- **`fix` 写真アップロード上限を 10MB → 20MB に引き上げ・サイズオーバー時のエラー表示追加**
  - iPhone の高解像度 PNG（16MB 超）が 10MB 上限の client token に弾かれ 403 になっていた
  - `/api/blob/upload` の `maximumSizeInBytes` を 20MB に変更、UI 注記・テストも合わせて更新
  - ファイル選択時に 20MB 超のファイルをクライアントで弾き、ファイル名付きのエラーメッセージを表示
  - アップロードボタン（未選択状態）の注記にも「1枚あたり20MBまで」を追記
  - サイズオーバーエラーを条件分岐の外に移動し、1枚目が大きすぎる場合でも必ず表示されるよう修正

- **`fix` メール文面のサービス名表記を「うちここ」に統一**
  - `uchikoko（うちここ）` → `「うちここ」`（本文・署名）

- **`fix` 単体注文メールの商品名に選択サイズを追記**
  - `productName` を `"オリジナルペット陶器のみ（8cm）"` 形式でサーバーに送信し、メール記載内容に反映

- **`fix` 注文UUIDをクライアントで生成しBlobフォルダと注文番号を一致させる**
  - `handleSubmit` でループ前に `orderId = crypto.randomUUID()` を1回生成し、全写真を同一フォルダ（`orders/${datePart}_${orderId}/`）に格納
  - `orderId` を FormData でサーバーに送り注文メールの注文番号として使用（Blob フォルダと一致）
  - `orderId` なしリクエストはサーバーで 400 + `console.error` で不正アクセスとして扱う
  - テスト 2 件追加（クライアント orderId 使用・orderId なし 400）、計 25 件

- **`fix` Blob アップロードパスを `uploads/` から `orders/` に修正**
  - クライアントサイドアップロード移行時に誤って `uploads/` になっていたパスを `orders/` に戻す

- **`fix` 確認画面の HEIC/HEIF プレースホルダーの文言を修正**
  - 確認ステップではファイル名が表示されないため「ファイル名をクリックで確認できます」→「クリックして確認できます」に変更（プレースホルダー全体がリンク）

- **`fix` 確認画面の HEIC/HEIF サムネイルもプレースホルダーに変更**
  - 確認ステップの写真一覧でも HEIC/HEIF はプレースホルダー（`ImageOff` アイコン）を表示し、クリックで別窓オープン

- **`feat` HEIC/HEIF 写真のプレースホルダー表示**
  - HEIC/HEIF ファイルはブラウザでプレビューできないため、サムネイル欄にアイコン＋説明テキストのプレースホルダーを表示
  - ファイル名をクリックするとオブジェクト URL を別窓で開くリンクに変更（Safari では表示、Chrome は DL）
  - JPEG / PNG / WebP は従来通りサムネイル＋ズームボタンを維持

- **`feat` [4624b16] UUID注文番号・プライベートBlob・HMACプロキシ・写真形式制限**
  - `crypto.randomUUID()` で注文IDを生成し、フォルダパス・メール件名から顧客名・商品名を排除
  - Blob を `access: private` に変更、写真は HMAC署名付きプロキシ（`/api/photos/download`）経由でのみアクセス可能に（有効期限90日・`timingSafeEqual` 検証）
  - `APP_URL` / `VERCEL_URL` 環境変数でダウンロードURLを絶対パスで生成
  - メール件名：`【うちここ】新規注文：{注文番号}` / `【ご注文確認】うちここよりご注文を受け付けました`
  - 両メール本文に注文番号を記載
  - 許可画像形式を `jpeg / png / heic / heif / webp` に限定（クライアント・サーバー両方）
  - `.env.example` に `PHOTO_DOWNLOAD_SECRET`・`APP_URL` を追加
  - テスト 7 件追加（計 23 件）

- **`feat` [5924eed] 写真を Vercel Blob にアップロードしメールにダウンロードリンクを記載**
  - `@vercel/blob` を導入
  - 写真は `orders/YYYY-MM-DD_{商品名}_{注文者名}/{timestamp}-{filename}` のパスに保存
  - Resend の 40MB 添付制限を回避。メール本文にダウンロード URL を記載する方式に変更
  - テスト 3 件追加（Blob アップロード確認・URL 含有確認・添付なし確認、計 14 件）
  - `.env.example` に `BLOB_READ_WRITE_TOKEN` を追加

- **`feat` [02512f5] Zod によるフォームバリデーション追加**
  - 共有スキーマ `src/lib/order-schema.ts` を新設（`customerSchema` / `orderSchema`）
  - email 形式・電話番号（`/^[\d\-]{10,13}$/`）・郵便番号（`/^\d{3}-?\d{4}$/`）のフォーマット検証
  - API ルートの手動バリデーションを `orderSchema.safeParse()` に置き換え
  - 両注文フォームに「次へ」押下時のフィールド単位エラーメッセージ表示を追加
  - バリデーションテスト 3 件追加（計 10 件）

- **`feat` [cfe67a0] 注文フォームに Resend を使ったメール送信機能を追加**
  - API ルート `src/app/api/order/route.ts` を新設（FormData + 写真対応 POST ハンドラー）
  - 注文送信時にショップオーナーへ注文詳細の通知メール、お客様へ自動返信メールを送信
  - 両フォームの送信ボタンをローディング表示・エラーハンドリング付きの API 呼び出しに変更
  - Vitest を導入し単体テスト 7 件追加（TDD）

### Fixed

- **`fix` [42ab49f] メールヘッダーインジェクション対策と HTML エスケープのテスト追加**
  - `name` フィールドの Zod バリデーションに改行禁止ルール（`/^[^\r\n]+$/`）を追加
  - Subject 行への `\r\n` 注入を防止
  - `escapeHtml` の動作を検証するテストを追加（`<script>` タグのエスケープ確認）

### Chore

- **`chore` [708c37a] `.env.example` を追加し `.gitignore` に例外設定**
  - `cp .env.example .env.local` で必要な環境変数を把握できるテンプレートを追加
  - `.gitignore` に `!.env.example` の例外を追加

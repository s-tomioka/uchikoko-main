# うちここ ペットメモリアル陶器 ランディングページ

大切な家族との思い出をかたちにする、ペットメモリアル陶器サービスのランディングページ（単一ページ）です。

本番公開先: **https://uchikoko.com/**

## 技術スタック

- Next.js 14 (App Router)
- React 18
- Tailwind CSS v3
- TypeScript

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは http://localhost:3000 で起動します（ポート競合時は `npm run dev:4000` で 4000 番を使用）。

## 構成

- `app/layout.tsx` — 共通レイアウト・メタデータ・フォント読み込み
- `app/page.tsx` — トップページ（各セクションを縦に配置）
- `app/error.tsx` / `app/global-error.tsx` — エラーバウンダリ
- `app/globals.css` — グローバルスタイル
- `components/Header.tsx` — ヘッダー
- `components/Firstview.tsx` — ファーストビュー
- `components/Secondview.tsx` — セカンドビュー
- `components/Thirdview.tsx` — サードビュー
- `components/OrderFlow.tsx` — 注文の流れ
- `components/PricingPlans.tsx` — 料金プラン
- `components/FAQ.tsx` — よくある質問
- `components/Footer.tsx` — フッター
- `public/` — 画像（before/after、家族写真、ロゴ など）

## デプロイ（uchikoko.com）

Vercel での公開を想定しています。

1. このリポジトリを GitHub に push する
2. Vercel で New Project から GitHub リポジトリを Import（フレームワークは Next.js が自動検出されます）
3. プロジェクトの Settings → Domains で `uchikoko.com`（および任意で `www.uchikoko.com`）を追加
4. DNS（お名前.com 側）で、apex（`uchikoko.com`）は Vercel 指定の A レコード（`76.76.21.21`）、`www` は CNAME（`cname.vercel-dns.com.`）に向ける（実際の値は Vercel の Domains 画面の表示に従ってください）

公開ドメインを変更する場合は `app/layout.tsx` の `metadataBase` の URL も合わせて修正してください。

## 画像について

`public/` 配下の before/after 画像やプレースホルダーは、本番では実際の陶器写真に差し替えてください。

## ローカルでのトラブルシューティング

- **ビルドが不安定（Google Drive 上で作業している場合）**: ローカルフォルダ（例 `~/Projects/uchi-koko`）にコピーしてから実行してください。
- **`EMFILE: too many open files` が出る**: `ulimit -n 10240` を実行してから `npm run dev`。
- **ポートが使用中**: `lsof -i :3000` で確認し、`kill -9 <PID>`、または `npm run dev:4000`。

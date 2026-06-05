# ローカルでプレビューする方法

## 方法1: ポート4000でプレビュー（推奨・ポート競合を避ける）

```bash
npm run preview
```

ブラウザで **http://localhost:4000** を開いてください。

## 方法2: ポート4000で開発サーバー

```bash
npm run dev:4000
```

ブラウザで **http://localhost:4000** を開いてください。

## 方法3: 通常の開発サーバー（ポート3000）

```bash
npm run dev
```

ブラウザで **http://localhost:3000** を開いてください。
※ポート3000が使用中の場合は、ターミナルに表示されるURLにアクセスしてください。

## ポートが使用中で起動できない場合

```bash
# 使用中のポートを確認（例: 4000）
lsof -i :4000

# プロセスを終了（PIDは上記で確認）
kill -9 <PID>
```

## 「EMFILE: too many open files」エラーが出る場合

```bash
ulimit -n 10240
npm run dev
```

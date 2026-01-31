# Rocket CUP BAN & PICK Tool

Rocket CUP 向けの BAN & PICK 管理ツールです。大会のジャッジ・運営者がチームごとのデッキの BAN / PICK を管理し、Discord に貼り付けられるフォーマットで出力できます。

## 機能

- チームごとに 5 つのデッキを管理
- デッキの BAN / PICK ステータスの切り替え
- PICK 順の自動採番
- Discord 向けフォーマット出力（BAN されたデッキは取り消し線表示）
- ワンクリックでクリップボードにコピー
- モバイル対応のレスポンシブデザイン

## 技術スタック

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Compiler (babel-plugin-react-compiler)
- lucide-react (アイコン)

## 開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# Lint
pnpm lint

# プレビュー
pnpm preview
```

## デプロイ

GitHub Pages に自動デプロイされます。`master` ブランチへの push をトリガーに GitHub Actions でビルド・デプロイが実行されます。

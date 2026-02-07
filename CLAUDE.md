# CLAUDE.md - LINE Stamp Maker

## プロジェクト概要
スマホ内の画像を選ぶだけで、LINEスタンプ審査ガイドラインに準拠したスタンプ画像セット（8〜40枚）を専門知識なしで作成できるモバイルアプリ。

## 技術スタック
- **フレームワーク**: React Native (Expo)
- **言語**: TypeScript (strict mode)
- **スタイリング**: NativeWind (Tailwind CSS for RN)
- **ナビゲーション**: React Navigation (Bottom Tabs + Stack)
- **状態管理**: Zustand
- **フォント**: Zen Maru Gothic + Plus Jakarta Sans
- **アイコン**: Material Symbols
- **ストレージ**: expo-sqlite
- **AI処理**: 端末内処理のみ（サーバー費ゼロ）

## デザインシステム
- Primary: `#a8e6cf` (ミントグリーン)
- Background: `#f9f9f9` / `#f6f8f7`
- Dark Background: `#131f1a`
- Border Radius: 1rem (default), 2rem (lg), 3rem (xl)
- デザインリファレンス: `/docs/design-ref/` 配下

## 開発ルール

### コミット
- conventional commits形式: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- 説明は日本語で記述
- 機能単位でこまめにコミット

### ブランチ
- `main`: 常に動作する状態を保つ
- 機能単位で feature ブランチを切る（`feat/screen-home` 等）

### コード品質
- TypeScript strict mode を遵守
- 影響範囲を必ず確認してから修正する
- エラー発生時は根本原因を特定し、恒久対応まで行う

### セキュリティ
- `.env` やAPIキー等の秘密情報は絶対にコミットしない
- `.gitignore` を適切に設定する

### コミュニケーション
- やりとりは日本語で行う
- 許可を求める際は、何をする処理かの説明を添える

## LINEスタンプ仕様（守るべきルール）
- スタンプ画像: 最大 370×320px、PNG形式、背景透過必須
- 画像サイズは偶数ピクセル
- 上下左右に10pxの余白を確保
- メイン画像: 240×240px
- タブ画像: 96×74px
- 枚数: 8, 16, 24, 32, 40枚のいずれか
- ZIPファイルで一括エクスポート

## 画面構成
1. HomeScreen - パック一覧（カード型、進捗バッジ）
2. AIProcessingScreen - AI生成中（プログレスバー）
3. StampCompleteScreen - 完成画面（紙吹雪演出）
4. StampEditorScreen - テキスト編集（セリフ選択）
5. PackEditScreen - パック編集（並び替え・削除）
6. PreviewScreen - LINEプレビュー（チャット風）

## 開発フェーズ
- **Phase 1**: UI モック（全画面のデザイン実装）← 現在
- **Phase 2**: コア機能（写真選択・背景除去・テキスト合成）
- **Phase 3**: データ永続化（パック管理・並び替え）
- **Phase 4**: エクスポート（ZIP生成・バリデーション）

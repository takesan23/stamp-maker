// LINEスタンプ仕様
export const LINE_STAMP = {
  MAX_WIDTH: 370,
  MAX_HEIGHT: 320,
  MARGIN: 10,
  MAIN_IMAGE_SIZE: 240,
  TAB_IMAGE_WIDTH: 96,
  TAB_IMAGE_HEIGHT: 74,
  PACK_SIZES: [8, 16, 24, 32, 40] as const,
} as const;

// よく使うセリフのプリセット
export const PHRASE_PRESETS = [
  "ありがとう",
  "OK",
  "了解",
  "ぴえん",
  "おつかれ",
  "おはよう",
  "おやすみ",
  "やったー",
  "ごめんね",
  "大好き",
  "わーい",
  "なるほど",
] as const;

// モックデータ
export const MOCK_PACKS = [
  {
    id: "1",
    name: "うちの猫",
    totalCount: 24,
    completedCount: 12,
    status: "editing" as const,
    thumbnailUri: "https://placekitten.com/370/320",
  },
  {
    id: "2",
    name: "おやすみワンちゃん",
    totalCount: 24,
    completedCount: 24,
    status: "completed" as const,
    thumbnailUri: "https://placedog.net/370/320",
  },
  {
    id: "3",
    name: "毎日の挨拶",
    totalCount: 24,
    completedCount: 5,
    status: "editing" as const,
    thumbnailUri: "https://placekitten.com/371/321",
  },
];

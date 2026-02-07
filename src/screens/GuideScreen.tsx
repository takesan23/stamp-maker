import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LINE_STAMP } from "../constants/stamps";
import { colors, shadows } from "../constants/theme";

type GuideCard = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  items: string[];
};

const GUIDE_SECTIONS: GuideCard[] = [
  {
    icon: "straighten",
    title: "画像サイズ仕様",
    items: [
      `スタンプ画像: 最大 ${LINE_STAMP.MAX_WIDTH}×${LINE_STAMP.MAX_HEIGHT}px`,
      "PNG形式・背景透過が必須",
      "画像サイズは偶数ピクセルにする",
      `メイン画像: ${LINE_STAMP.MAIN_IMAGE_SIZE}×${LINE_STAMP.MAIN_IMAGE_SIZE}px`,
      `タブ画像: ${LINE_STAMP.TAB_IMAGE_WIDTH}×${LINE_STAMP.TAB_IMAGE_HEIGHT}px`,
    ],
  },
  {
    icon: "crop-free",
    title: "余白ルール",
    items: [
      `上下左右に ${LINE_STAMP.MARGIN}px 以上の余白を確保`,
      "絵柄が端に接しないようにする",
      "余白は透明（背景色なし）にする",
    ],
  },
  {
    icon: "format-list-numbered",
    title: "申請手順",
    items: [
      "1. LINE Creators Marketに登録",
      "2. 新規スタンプを作成",
      `3. スタンプ画像を${LINE_STAMP.PACK_SIZES.join("/")}枚アップロード`,
      "4. メイン画像・タブ画像を設定",
      "5. テキスト情報を入力して審査リクエスト",
    ],
  },
  {
    icon: "tips-and-updates",
    title: "審査通過のコツ",
    items: [
      "背景を完全に透過させる",
      "文字は読みやすいサイズ・コントラストで",
      "日常会話で使いやすいセリフを選ぶ",
      "全スタンプに統一感を持たせる",
      "他者の著作物を使わない",
    ],
  },
];

export default function GuideScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <View className="px-6 pt-8 pb-4">
        <Text className="text-3xl font-bold text-text-main tracking-tight">
          使い方ガイド
        </Text>
        <Text className="text-sm text-text-sub mt-1">
          LINEスタンプの審査ガイドラインと申請手順
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-5 pb-32">
          {GUIDE_SECTIONS.map((section) => (
            <View
              key={section.title}
              className="bg-white rounded-2xl p-5"
              style={shadows.sm}
            >
              <View className="flex-row items-center gap-3 mb-4">
                <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons
                    name={section.icon}
                    size={22}
                    color={colors.secondary}
                  />
                </View>
                <Text className="text-lg font-bold text-text-main">
                  {section.title}
                </Text>
              </View>
              <View className="gap-2.5">
                {section.items.map((item, i) => (
                  <View key={i} className="flex-row items-start gap-2">
                    <View className="w-5 h-5 items-center justify-center mt-0.5">
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color={colors.primary}
                      />
                    </View>
                    <Text className="flex-1 text-sm text-text-main leading-5">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

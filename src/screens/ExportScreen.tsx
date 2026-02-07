import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, shadows } from "../constants/theme";
import { LINE_STAMP, MOCK_PACKS } from "../constants/stamps";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { HomeStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Export">;
  route: RouteProp<HomeStackParamList, "Export">;
};

type CheckItem = {
  label: string;
  passed: boolean;
};

export default function ExportScreen({ navigation, route }: Props) {
  const [isGenerated, setIsGenerated] = useState(false);
  const pack = MOCK_PACKS.find((p) => p.id === route.params.packId) ?? MOCK_PACKS[0];

  const validationChecks: CheckItem[] = [
    {
      label: `画像サイズ: ${LINE_STAMP.MAX_WIDTH}×${LINE_STAMP.MAX_HEIGHT}px 以下`,
      passed: true,
    },
    { label: "背景が透過されている", passed: true },
    { label: "偶数ピクセルサイズ", passed: true },
    {
      label: `余白 ${LINE_STAMP.MARGIN}px 以上確保`,
      passed: true,
    },
    { label: "PNG形式で保存", passed: true },
    {
      label: `枚数が規定値 (${LINE_STAMP.PACK_SIZES.join("/")}) のいずれか`,
      passed: pack.completedCount === pack.totalCount,
    },
    {
      label: "メイン画像が設定済み",
      passed: pack.completedCount > 0,
    },
    { label: "タブ画像が設定済み", passed: pack.completedCount > 0 },
  ];

  const allPassed = validationChecks.every((c) => c.passed);

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View
        className="bg-white/80 border-b px-2 pt-2 pb-2"
        style={{ borderBottomColor: colors.separator }}
      >
        <ScreenHeader
          variant="back"
          title="書き出し"
          onBack={() => navigation.goBack()}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6 gap-6">
          {/* Pack Summary Card */}
          <View className="bg-white rounded-2xl p-5" style={shadows.sm}>
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-12 h-12 rounded-xl bg-primary/20 items-center justify-center">
                <MaterialIcons name="folder" size={28} color={colors.secondary} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-text-main">
                  {pack.name}
                </Text>
                <Text className="text-sm text-text-sub">
                  {pack.completedCount} / {pack.totalCount} 枚完成
                </Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${
                  allPassed ? "bg-primary" : "bg-fill-secondary"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    allPassed ? "text-text-main" : "text-text-sub"
                  }`}
                >
                  {allPassed ? "準備完了" : "未完了"}
                </Text>
              </View>
            </View>
          </View>

          {/* Validation Checklist */}
          <View className="bg-white rounded-2xl p-5" style={shadows.sm}>
            <Text className="text-sm font-bold text-text-sub mb-4 uppercase tracking-wider">
              バリデーションチェック
            </Text>
            <View className="gap-3">
              {validationChecks.map((check, i) => (
                <View key={i} className="flex-row items-center gap-3">
                  <MaterialIcons
                    name={check.passed ? "check-circle" : "cancel"}
                    size={22}
                    color={check.passed ? colors.secondary : colors.destructive}
                  />
                  <Text
                    className={`flex-1 text-sm ${
                      check.passed ? "text-text-main" : "text-destructive"
                    }`}
                  >
                    {check.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Generate Button */}
          {!isGenerated ? (
            <Button
              variant="primary"
              label="ZIPを生成"
              onPress={() => setIsGenerated(true)}
              icon={
                <MaterialIcons
                  name="archive"
                  size={22}
                  color={colors.textMain}
                />
              }
            />
          ) : (
            <View className="gap-3">
              <View
                className="bg-primary/10 rounded-2xl p-4 flex-row items-center gap-3"
                accessibilityLabel="ZIP生成完了"
              >
                <MaterialIcons
                  name="check-circle"
                  size={28}
                  color={colors.secondary}
                />
                <View className="flex-1">
                  <Text className="text-base font-bold text-text-main">
                    ZIP生成完了！
                  </Text>
                  <Text className="text-sm text-text-sub">
                    {pack.name}.zip ({pack.completedCount}枚)
                  </Text>
                </View>
              </View>
              <Button
                variant="primary"
                label="ダウンロード"
                onPress={() => {}}
                icon={
                  <MaterialIcons
                    name="download"
                    size={22}
                    color={colors.textMain}
                  />
                }
              />
              <Button
                variant="secondary"
                label="シェアする"
                onPress={() => {}}
                icon={
                  <MaterialIcons
                    name="share"
                    size={22}
                    color={colors.textMain}
                  />
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

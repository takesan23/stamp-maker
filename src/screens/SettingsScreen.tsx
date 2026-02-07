import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, shadows } from "../constants/theme";

type SettingsItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
};

const APP_VERSION = "1.0.0";

const SUPPORT_ITEMS: SettingsItem[] = [
  {
    icon: "help-outline",
    label: "ヘルプ・よくある質問",
    onPress: () => {},
  },
  {
    icon: "mail-outline",
    label: "お問い合わせ",
    onPress: () => {},
  },
  {
    icon: "star-outline",
    label: "アプリを評価する",
    onPress: () => {},
  },
  {
    icon: "description",
    label: "利用規約",
    onPress: () => {},
  },
  {
    icon: "privacy-tip",
    label: "プライバシーポリシー",
    onPress: () => {},
  },
];

function SettingsRow({ icon, label, value, onPress }: SettingsItem) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3.5 px-1"
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityLabel={label}
    >
      <View className="w-9 h-9 rounded-full bg-primary/10 items-center justify-center mr-3">
        <MaterialIcons name={icon} size={20} color={colors.secondary} />
      </View>
      <Text className="flex-1 text-base text-text-main">{label}</Text>
      {value ? (
        <Text className="text-sm text-text-sub">{value}</Text>
      ) : onPress ? (
        <MaterialIcons
          name="chevron-right"
          size={22}
          color={colors.labelSecondary}
        />
      ) : null}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <View className="px-6 pt-8 pb-4">
        <Text className="text-3xl font-bold text-text-main tracking-tight">
          設定
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          {/* Profile Section */}
          <View className="bg-white rounded-2xl p-5" style={shadows.sm}>
            <Text className="text-sm font-bold text-text-sub mb-3 uppercase tracking-wider">
              プロフィール
            </Text>
            <View>
              <Text className="text-sm font-medium text-text-sub mb-1.5 ml-1">
                作者名
              </Text>
              <TextInput
                className="h-12 px-4 text-base rounded-xl bg-bg-light text-text-main"
                placeholder="スタンプの作者名を入力"
                placeholderTextColor={colors.labelSecondary}
                defaultValue=""
                accessibilityLabel="作者名"
              />
            </View>
          </View>

          {/* App Info Section */}
          <View className="bg-white rounded-2xl p-5" style={shadows.sm}>
            <Text className="text-sm font-bold text-text-sub mb-1 uppercase tracking-wider">
              アプリ情報
            </Text>
            <SettingsRow
              icon="info-outline"
              label="バージョン"
              value={APP_VERSION}
            />
          </View>

          {/* Support Section */}
          <View className="bg-white rounded-2xl p-5" style={shadows.sm}>
            <Text className="text-sm font-bold text-text-sub mb-1 uppercase tracking-wider">
              サポート
            </Text>
            {SUPPORT_ITEMS.map((item) => (
              <SettingsRow key={item.label} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

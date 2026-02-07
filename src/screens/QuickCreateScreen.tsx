import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, shadows } from "../constants/theme";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList, MainTabParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, "QuickCreateTab">,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const MOCK_PHOTOS = [
  "https://placekitten.com/200/200",
  "https://placekitten.com/201/201",
  "https://placekitten.com/202/202",
  "https://placekitten.com/203/203",
  "https://placekitten.com/204/204",
  "https://placekitten.com/205/205",
  "https://placekitten.com/206/206",
  "https://placekitten.com/207/207",
  "https://placekitten.com/208/208",
];

export default function QuickCreateScreen({ navigation }: Props) {
  const openEditor = (imageUri?: string) => {
    navigation.navigate("StickerEditor", {
      imageUri,
      returnTo: "quick",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      <View className="px-6 pt-8 pb-4">
        <Text className="text-3xl font-bold text-text-main tracking-tight">
          すぐ作る
        </Text>
        <Text className="text-sm text-text-sub mt-1">
          写真を選んでスタンプを1枚作成
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-4 flex-row gap-4">
        <TouchableOpacity
          className="flex-1 bg-primary py-5 rounded-2xl items-center gap-2"
          style={shadows.md}
          activeOpacity={0.7}
          onPress={() => openEditor()}
          accessibilityRole="button"
          accessibilityLabel="カメラで撮る"
        >
          <MaterialIcons name="camera-alt" size={32} color={colors.textMain} />
          <Text className="text-base font-bold text-text-main">カメラで撮る</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 bg-white py-5 rounded-2xl items-center gap-2 border-2 border-primary"
          style={shadows.sm}
          activeOpacity={0.7}
          onPress={() => openEditor()}
          accessibilityRole="button"
          accessibilityLabel="ギャラリーから選ぶ"
        >
          <MaterialIcons name="photo-library" size={32} color={colors.secondary} />
          <Text className="text-base font-bold text-text-main">
            ギャラリーから選ぶ
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recent Photos Grid (Mock) */}
      <View className="px-6 pt-2">
        <Text className="text-sm font-bold text-text-sub mb-3 uppercase tracking-wider">
          最近の写真
        </Text>
      </View>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-2 pb-32">
          {MOCK_PHOTOS.map((uri, i) => (
            <TouchableOpacity
              key={i}
              className="rounded-xl overflow-hidden bg-fill-tertiary"
              style={[{ width: "31.5%" }, shadows.sm]}
              activeOpacity={0.7}
              onPress={() => openEditor(uri)}
              accessibilityRole="button"
              accessibilityLabel={`写真 ${i + 1} を選択`}
            >
              <Image
                source={{ uri }}
                className="w-full aspect-square"
                resizeMode="cover"
                accessible={false}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

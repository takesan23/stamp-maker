import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { MOCK_PACKS } from "../constants/stamps";
import { colors, shadows } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View className="px-6 pt-8 pb-4">
        <ScreenHeader
          variant="home"
          title=""
          onMenuPress={() => {}}
          rightElement={
            <TouchableOpacity
              className="w-11 h-11 rounded-full bg-primary/20 items-center justify-center"
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="プロフィール"
            >
              <MaterialIcons name="person" size={24} color={colors.secondary} />
            </TouchableOpacity>
          }
        />
        <Text className="text-3xl font-bold text-text-main tracking-tight py-2">
          マイスタンプ
        </Text>
      </View>

      {/* Pack List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pt-4 pb-32">
          {MOCK_PACKS.map((pack) => (
            <TouchableOpacity
              key={pack.id}
              className="bg-white rounded-lg overflow-hidden"
              style={shadows.sm}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("PackDetail", { packId: pack.id })}
              accessibilityRole="button"
              accessibilityLabel={`${pack.name} ${pack.completedCount}/${pack.totalCount}枚 ${pack.status === "completed" ? "完了" : "作成中"}`}
            >
              <View className="p-4">
                {/* Thumbnail */}
                <View className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-fill-tertiary">
                  <Image
                    source={{ uri: pack.thumbnailUri }}
                    className="w-full h-full"
                    resizeMode="cover"
                    accessible={false}
                  />
                  <View
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full ${
                      pack.status === "completed"
                        ? "bg-primary"
                        : "bg-white/90"
                    }`}
                    accessibilityLabel={`${pack.completedCount}/${pack.totalCount}枚完成`}
                  >
                    <Text className="text-xs font-bold text-text-main">
                      {pack.completedCount} / {pack.totalCount}
                    </Text>
                  </View>
                </View>

                {/* Info */}
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-lg font-bold text-text-main">
                      {pack.name}
                    </Text>
                    <Text className="text-sm text-text-sub">
                      {pack.status === "completed" ? "完了" : "作成中"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className={`px-4 py-2 rounded-full ${
                      pack.status === "completed"
                        ? "bg-primary"
                        : "bg-primary/20"
                    }`}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel={pack.status === "completed" ? `${pack.name}を公開` : `${pack.name}を編集`}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Text className="text-sm font-bold text-text-main">
                      {pack.status === "completed" ? "公開" : "編集"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-24 right-6 bg-primary flex-row items-center gap-2 px-6 py-4 rounded-full"
        style={shadows.md}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("PackDetail", { packId: "new" })}
        accessibilityRole="button"
        accessibilityLabel="新規スタンプパックを作成"
      >
        <MaterialIcons name="add" size={24} color={colors.textMain} />
        <Text className="text-base font-bold text-text-main">新規作成</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

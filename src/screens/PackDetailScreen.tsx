import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, shadows } from "../constants/theme";
import { LINE_STAMP, MOCK_PACKS } from "../constants/stamps";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { HomeStackParamList, RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackParamList, "PackDetail">,
    NativeStackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<HomeStackParamList, "PackDetail">;
};

const MOCK_STAMPS = [
  "https://placekitten.com/120/120",
  "https://placekitten.com/121/121",
  "https://placekitten.com/122/122",
  "https://placekitten.com/123/123",
  "https://placekitten.com/124/124",
  "https://placekitten.com/125/125",
  "https://placekitten.com/126/126",
  "https://placekitten.com/127/127",
];

export default function PackDetailScreen({ navigation, route }: Props) {
  const pack = MOCK_PACKS.find((p) => p.id === route.params.packId) ?? MOCK_PACKS[0];
  const totalSlots = pack.totalCount;
  const emptySlots = totalSlots - MOCK_STAMPS.length;

  const openEditor = () => {
    navigation.navigate("StickerEditor", {
      packId: route.params.packId,
      returnTo: "home",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View
        className="bg-white/80 border-b px-2 pt-2 pb-2"
        style={{ borderBottomColor: colors.separator }}
      >
        <ScreenHeader
          variant="back"
          title="パック詳細"
          onBack={() => navigation.goBack()}
          rightAction={{
            icon: "check",
            onPress: () => {},
            accessibilityLabel: "編集を完了",
          }}
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 gap-6">
          {/* Pack Name */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-text-sub ml-2">
              パック名
            </Text>
            <View className="relative">
              <TextInput
                className="w-full h-14 pl-5 pr-12 text-base font-medium rounded-xl bg-white text-text-main"
                style={shadows.sm}
                defaultValue={pack.name}
                accessibilityLabel="パック名"
              />
              <View className="absolute right-4 top-4">
                <MaterialIcons name="edit" size={22} color={colors.secondary} />
              </View>
            </View>
          </View>

          {/* Pack Size Selector */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-text-sub ml-2">
              枚数
            </Text>
            <View className="flex-row gap-2">
              {LINE_STAMP.PACK_SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  className={`flex-1 py-2.5 rounded-xl items-center ${
                    size === totalSlots
                      ? "bg-primary"
                      : "bg-white border border-border-light"
                  }`}
                  style={size === totalSlots ? shadows.sm : undefined}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`${size}枚`}
                  accessibilityState={{ selected: size === totalSlots }}
                >
                  <Text
                    className={`text-sm font-bold ${
                      size === totalSlots ? "text-text-main" : "text-text-sub"
                    }`}
                  >
                    {size}枚
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Grid Header */}
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-sm font-bold text-text-sub uppercase tracking-wider">
              スタンプ一覧
            </Text>
            <Text className="text-xs text-text-sub">
              {MOCK_STAMPS.length} / {totalSlots} 枚
            </Text>
          </View>

          {/* Sticker Grid */}
          <View className="flex-row flex-wrap gap-3">
            {MOCK_STAMPS.map((uri, index) => (
              <View
                key={index}
                className="aspect-square rounded-2xl bg-white overflow-hidden border border-border-light"
                style={[{ width: "30.5%" }, shadows.sm]}
                accessibilityLabel={`スタンプ ${index + 1}`}
              >
                <Image
                  source={{ uri }}
                  className="w-full h-full p-2"
                  resizeMode="cover"
                  accessible={false}
                />
              </View>
            ))}
            {/* Empty Slots */}
            {Array.from({ length: Math.max(0, emptySlots) }).map((_, i) => (
              <TouchableOpacity
                key={`empty-${i}`}
                className="aspect-square rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 items-center justify-center"
                style={{ width: "30.5%" }}
                activeOpacity={0.7}
                onPress={openEditor}
                accessibilityRole="button"
                accessibilityLabel="空きスロット - タップしてスタンプを追加"
              >
                <MaterialIcons
                  name="add"
                  size={36}
                  color="rgba(168,230,207,0.4)"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Add Stickers Button */}
          <TouchableOpacity
            className="w-full py-4 border-2 border-dashed border-border-light rounded-2xl items-center justify-center gap-1"
            onPress={openEditor}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="スタンプを追加"
          >
            <MaterialIcons
              name="add-circle"
              size={30}
              color={colors.textSub}
            />
            <Text className="text-sm font-bold text-text-sub">
              スタンプを追加
            </Text>
          </TouchableOpacity>

          {/* Export Button */}
          <Button
            variant="primary"
            label="書き出し"
            onPress={() =>
              navigation.navigate("Export", { packId: route.params.packId })
            }
            icon={
              <MaterialIcons
                name="file-download"
                size={22}
                color={colors.textMain}
              />
            }
          />
        </View>
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}

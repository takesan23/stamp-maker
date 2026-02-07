import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { MOCK_PACKS } from "../constants/stamps";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-2">
          <MaterialIcons name="menu" size={24} color="#121715" />
          <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center">
            <MaterialIcons name="person" size={24} color="#a8e6cf" />
          </View>
        </View>
        <Text className="text-3xl font-bold text-text-main tracking-tight py-2">
          マイスタンプ
        </Text>
      </View>

      {/* Pack List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-32">
          {MOCK_PACKS.map((pack) => (
            <TouchableOpacity
              key={pack.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
              activeOpacity={0.95}
              onPress={() => navigation.navigate("PackEdit")}
            >
              <View className="p-4">
                {/* Thumbnail */}
                <View className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    source={{ uri: pack.thumbnailUri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full ${
                      pack.status === "completed"
                        ? "bg-primary"
                        : "bg-white/90"
                    }`}
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
        className="absolute bottom-28 right-6 bg-primary flex-row items-center gap-2 px-6 py-4 rounded-full shadow-lg"
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Create")}
      >
        <MaterialIcons name="add" size={24} color="#121715" />
        <Text className="text-base font-bold text-text-main">新規作成</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

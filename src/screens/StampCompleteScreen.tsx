import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

const MOCK_THUMBNAILS = [
  "https://placekitten.com/96/96",
  "https://placekitten.com/97/97",
  "https://placekitten.com/98/98",
  "https://placekitten.com/99/99",
];

export default function StampCompleteScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-2 justify-between">
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <MaterialIcons name="close" size={28} color="#121715" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-text-main flex-1 text-center pr-12">
          スタンプ完成！
        </Text>
      </View>

      {/* Celebration */}
      <View className="px-4 pb-6 pt-8 items-center">
        <Text className="text-3xl font-bold text-text-main mb-2">
          完成しました！
        </Text>
        <Text className="text-sm text-text-sub">
          かわいいスタンプができました
        </Text>
      </View>

      {/* Sticker Preview */}
      <View className="flex-1 items-center justify-center p-6">
        <View className="relative w-72 aspect-square items-center justify-center">
          <View className="absolute inset-0 bg-primary/20 rounded-full" />
          <View className="relative z-10 w-full h-full bg-white rounded-3xl shadow-xl items-center justify-center overflow-hidden border-8 border-white">
            <Image
              source={{ uri: "https://placekitten.com/280/280" }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute bottom-4 left-0 right-0 items-center">
              <View className="bg-white px-4 py-1 rounded-full border-2 border-primary/30">
                <Text className="text-lg font-bold text-text-main">OK!</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full max-w-xs mt-8 gap-3">
          <TouchableOpacity
            className="flex-row items-center justify-center h-14 bg-primary rounded-full shadow-lg"
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="download" size={22} color="#121715" />
            <Text className="text-lg font-bold text-text-main ml-2">
              パックに保存する
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center h-14 bg-transparent border-2 border-gray-100 rounded-full"
            onPress={() => navigation.replace("AIProcessing")}
          >
            <MaterialIcons name="refresh" size={22} color="#121715" />
            <Text className="text-lg font-bold text-text-main ml-2">
              作り直す
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pack Preview Footer */}
      <View className="bg-bg-light p-6 rounded-t-3xl border-t border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-bold text-text-sub">
            作成中のパック (4/8)
          </Text>
          <MaterialIcons name="apps" size={20} color="#a8e6cf" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {MOCK_THUMBNAILS.map((uri, i) => (
              <View
                key={i}
                className={`w-16 h-16 rounded-xl overflow-hidden ${
                  i === 0 ? "border-2 border-primary" : "bg-gray-200"
                }`}
              >
                <Image
                  source={{ uri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ))}
            <View className="w-16 h-16 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 items-center justify-center">
              <MaterialIcons name="add" size={24} color="#ccc" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

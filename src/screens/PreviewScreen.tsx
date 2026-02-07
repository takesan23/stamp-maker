import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

export default function PreviewScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center bg-white p-4 pb-2 justify-between border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#121715" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-main flex-1 text-center pr-10">
          プレビュー
        </Text>
      </View>

      {/* Chat Area (LINE-style) */}
      <ScrollView
        className="flex-1 p-4"
        style={{ backgroundColor: "#7294C1" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          {/* Timestamp */}
          <View className="items-center">
            <View className="bg-black/10 px-3 py-1 rounded-full">
              <Text className="text-white text-xs">今日 12:34</Text>
            </View>
          </View>

          {/* AI Message (Left) */}
          <View className="flex-row items-start gap-2 max-w-[85%]">
            <View className="w-9 h-9 rounded-full bg-white items-center justify-center overflow-hidden">
              <MaterialIcons name="smart-toy" size={20} color="#a8e6cf" />
            </View>
            <View className="gap-1">
              <Text className="text-white text-xs font-medium ml-1">
                AI Assistant
              </Text>
              <View
                className="bg-white rounded-2xl rounded-tl-none px-4 py-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <Text className="text-sm text-text-main">
                  新しいスタンプができました！どうですか？
                </Text>
              </View>
            </View>
          </View>

          {/* Sticker (Left) */}
          <View className="flex-row items-start gap-2 max-w-[85%]">
            <View className="w-9 h-9" />
            <View className="gap-1">
              <View className="w-40 h-40 rounded-xl overflow-hidden">
                <Image
                  source={{ uri: "https://placekitten.com/160/160" }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white/70 text-xs ml-1">12:35</Text>
            </View>
          </View>

          {/* User Message (Right) */}
          <View className="self-end max-w-[85%]">
            <View className="items-end gap-1">
              <View
                className="bg-primary rounded-2xl rounded-tr-none px-4 py-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <Text className="text-sm text-text-main">
                  すごく可愛いです！このまま書き出します。
                </Text>
              </View>
              <Text className="text-white/70 text-xs mr-1">12:36</Text>
            </View>
          </View>

          {/* Sticker (Right) */}
          <View className="self-end max-w-[85%]">
            <View className="items-end gap-1">
              <View className="w-40 h-40 rounded-xl overflow-hidden">
                <Image
                  source={{ uri: "https://placekitten.com/161/161" }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-primary text-xs font-bold">既読</Text>
                <Text className="text-white/70 text-xs">12:37</Text>
              </View>
            </View>
          </View>

          {/* AI Follow-up Message */}
          <View className="flex-row items-start gap-2 max-w-[85%]">
            <View className="w-9 h-9 rounded-full bg-white items-center justify-center overflow-hidden">
              <MaterialIcons name="smart-toy" size={20} color="#a8e6cf" />
            </View>
            <View className="gap-1">
              <Text className="text-white text-xs font-medium ml-1">
                AI Assistant
              </Text>
              <View
                className="bg-white rounded-2xl rounded-tl-none px-4 py-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <Text className="text-sm text-text-main">
                  ありがとうございます！ZIPファイルでまとめました。下のボタンから保存してくださいね
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white px-6 pt-4 pb-8 border-t border-gray-100">
        <View className="gap-3">
          <TouchableOpacity
            className="flex-row items-center justify-center h-14 bg-primary rounded-full"
            style={{
              shadowColor: "#a8e6cf",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <MaterialIcons
              name="download-for-offline"
              size={22}
              color="#121715"
            />
            <Text className="text-base font-bold text-text-main ml-2 tracking-wide">
              書き出す (ZIP)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full items-center py-2">
            <Text className="text-sm text-text-sub font-medium">やり直す</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

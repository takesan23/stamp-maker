import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { PHRASE_PRESETS } from "../constants/stamps";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

export default function StampEditorScreen({ navigation }: Props) {
  const [selectedPhrase, setSelectedPhrase] = useState<string>(PHRASE_PRESETS[0]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center bg-white p-4 pb-2 justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color="#121715" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-main flex-1 text-center">
          スタンプ編集
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="help-outline" size={24} color="#121715" />
        </TouchableOpacity>
      </View>

      {/* Preview Area (Checkerboard) */}
      <View className="flex-1 items-center justify-center p-4">
        <View className="relative w-full aspect-square max-w-[340px] rounded-2xl overflow-hidden border border-gray-100 items-center justify-center bg-gray-50">
          {/* Checkerboard pattern simulated with gray bg */}
          <Image
            source={{ uri: "https://placekitten.com/340/340" }}
            className="absolute inset-0 w-full h-full opacity-90"
            resizeMode="cover"
          />
          {/* Text Overlay */}
          <View className="z-10">
            <Text
              className="text-5xl font-bold text-text-main tracking-wider"
              style={{
                textShadowColor: "#fff",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 8,
              }}
            >
              {selectedPhrase}
            </Text>
          </View>
        </View>
        <Text className="mt-4 text-sm text-text-sub">
          プレビュー：文字の位置は調整できます
        </Text>
      </View>

      {/* Phrase Chips */}
      <View className="w-full py-4 bg-white/80">
        <Text className="text-base font-bold text-text-main px-6 pb-3">
          セリフを選択
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6"
        >
          <View className="flex-row gap-3">
            {PHRASE_PRESETS.map((phrase) => (
              <TouchableOpacity
                key={phrase}
                className={`h-10 items-center justify-center px-6 rounded-full ${
                  selectedPhrase === phrase
                    ? "bg-primary shadow-sm"
                    : "bg-gray-100"
                }`}
                onPress={() => setSelectedPhrase(phrase)}
              >
                <Text
                  className={`text-sm ${
                    selectedPhrase === phrase ? "font-bold" : "font-medium"
                  } text-text-main`}
                >
                  {phrase}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <MaterialIcons name="add" size={18} color="#121715" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Actions */}
      <View className="p-6">
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 items-center justify-center h-14 rounded-full border-2 border-primary"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-base font-bold text-text-main">戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center justify-center h-14 rounded-full bg-primary shadow-lg"
            onPress={() => navigation.navigate("AIProcessing")}
          >
            <Text className="text-base font-bold text-text-main">次へ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

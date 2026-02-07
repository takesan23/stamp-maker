import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { PHRASE_PRESETS, MOOD_PRESETS } from "../constants/stamps";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

export default function StampEditorScreen({ navigation }: Props) {
  const [selectedPhrase, setSelectedPhrase] = useState<string>(PHRASE_PRESETS[0]);
  const [selectedMood, setSelectedMood] = useState<string>(MOOD_PRESETS[0].id);

  const currentMood = MOOD_PRESETS.find((m) => m.id === selectedMood) ?? MOOD_PRESETS[0];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center bg-white p-4 pb-2 justify-between">
        <TouchableOpacity className="w-12 items-start" onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={24} color="#121715" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-main flex-1 text-center">
          スタンプ編集
        </Text>
        <TouchableOpacity className="w-12 items-end">
          <MaterialIcons name="help-outline" size={24} color="#121715" />
        </TouchableOpacity>
      </View>

      {/* Preview Area */}
      <View className="items-center justify-center p-4 flex-1">
        <View
          className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: "#f3f4f6",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Image
            source={{ uri: "https://placekitten.com/340/340" }}
            className="absolute w-full h-full opacity-90"
            resizeMode="cover"
          />
          {/* Text Overlay with outline */}
          <View className="z-10">
            <Text
              className="text-4xl font-bold text-text-main tracking-wider"
              style={{
                textShadowColor: "#fff",
                textShadowOffset: { width: -2, height: -2 },
                textShadowRadius: 0,
              }}
            >
              {selectedPhrase}
            </Text>
            <Text
              className="text-4xl font-bold text-text-main tracking-wider absolute top-0 left-0"
              style={{
                textShadowColor: "#fff",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 0,
              }}
            >
              {selectedPhrase}
            </Text>
            <Text
              className="text-4xl font-bold text-text-main tracking-wider absolute top-0 left-0"
              style={{
                textShadowColor: "#fff",
                textShadowOffset: { width: 0, height: 3 },
                textShadowRadius: 8,
              }}
            >
              {selectedPhrase}
            </Text>
          </View>

          {/* Mood indicator badge */}
          <View
            className="absolute top-3 right-3 px-3 py-1 rounded-full flex-row items-center gap-1"
            style={{ backgroundColor: currentMood.color + "40" }}
          >
            <MaterialIcons name={currentMood.icon} size={14} color={currentMood.color} />
            <Text className="text-xs font-bold" style={{ color: currentMood.color }}>
              {currentMood.label}
            </Text>
          </View>
        </View>
        <Text className="mt-3 text-sm text-text-sub">
          AIがいい感じに配置します
        </Text>
      </View>

      {/* Mood Selector */}
      <View className="w-full py-3 bg-white">
        <Text className="text-base font-bold text-text-main px-6 pb-3">
          ふんいき
        </Text>
        <View className="flex-row px-6 gap-3">
          {MOOD_PRESETS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              className={`flex-1 items-center py-3 rounded-2xl border-2 ${
                selectedMood === mood.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-100 bg-gray-50"
              }`}
              onPress={() => setSelectedMood(mood.id)}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-1"
                style={{ backgroundColor: mood.color + "30" }}
              >
                <MaterialIcons name={mood.icon} size={20} color={mood.color} />
              </View>
              <Text
                className={`text-xs ${
                  selectedMood === mood.id ? "font-bold" : "font-medium"
                } text-text-main`}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Phrase Chips */}
      <View className="w-full py-3 bg-white/80">
        <Text className="text-base font-bold text-text-main px-6 pb-2">
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
                className={`h-10 items-center justify-center px-5 rounded-full ${
                  selectedPhrase === phrase ? "bg-primary" : "bg-gray-100"
                }`}
                style={
                  selectedPhrase === phrase
                    ? {
                        borderWidth: 2,
                        borderColor: "rgba(168, 230, 207, 0.2)",
                      }
                    : undefined
                }
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
              <MaterialIcons name="add" size={16} color="#121715" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Actions */}
      <View className="p-6 pt-4">
        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 items-center justify-center h-14 rounded-full border-2 border-primary"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-base font-bold text-text-main">戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center justify-center h-14 rounded-full bg-primary"
            style={{
              shadowColor: "#a8e6cf",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 4,
            }}
            onPress={() => navigation.navigate("AIProcessing")}
          >
            <Text className="text-base font-bold text-text-main">AIにおまかせ</Text>
          </TouchableOpacity>
        </View>
        <View className="h-4" />
      </View>
    </SafeAreaView>
  );
}

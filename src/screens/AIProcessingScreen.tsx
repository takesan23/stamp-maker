import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
};

const MESSAGES = [
  "背景をきれいに消しています...",
  "いい感じのフチをつけています...",
  "サイズを調整しています...",
  "仕上げ中...",
];

export default function AIProcessingScreen({ navigation }: Props) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          navigation.replace("StampComplete");
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [navigation]);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(msgTimer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View className="flex-row items-center p-6 pb-2 justify-between">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color="#121715" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-main flex-1 text-center pr-10">
          AI生成中
        </Text>
      </View>

      {/* Center Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Circle Animation */}
        <View className="relative w-64 h-64 mb-10">
          <View className="absolute inset-0 bg-primary/20 rounded-full" />
          <View className="w-full h-full bg-white rounded-full shadow-xl items-center justify-center border-8 border-white overflow-hidden">
            <MaterialIcons name="auto-fix-high" size={80} color="#a8e6cf" />
            <View className="flex-row gap-2 mt-2">
              <View className="w-2 h-2 bg-primary rounded-full" />
              <View className="w-2 h-2 bg-primary/60 rounded-full" />
              <View className="w-2 h-2 bg-primary/30 rounded-full" />
            </View>
          </View>
          {/* Floating accents */}
          <View className="absolute -top-4 -right-4 bg-primary p-3 rounded-full shadow-lg">
            <MaterialIcons name="auto-awesome" size={24} color="#fff" />
          </View>
          <View className="absolute bottom-4 -left-2 bg-white p-2 rounded-full shadow-md">
            <MaterialIcons name="favorite" size={20} color="#a8e6cf" />
          </View>
        </View>

        {/* Status Text */}
        <Text className="text-2xl font-bold text-text-main text-center mb-8">
          AIがスタンプを作成中...
        </Text>

        {/* Progress Bar */}
        <View className="w-full max-w-xs">
          <View className="flex-row justify-between items-end mb-2">
            <Text className="text-sm text-text-sub">作成状況</Text>
            <Text className="text-lg font-bold text-text-main">
              {Math.min(progress, 100)}%
            </Text>
          </View>
          <View className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </View>

          {/* Rotating Messages */}
          <View className="items-center mt-6 gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="check-circle" size={16} color="#a8e6cf" />
              <Text className="text-sm text-text-sub">
                {MESSAGES[messageIndex]}
              </Text>
            </View>
            <Text className="text-xs text-text-sub/60 italic text-center">
              {MESSAGES[(messageIndex + 1) % MESSAGES.length]}
            </Text>
          </View>
        </View>
      </View>

      {/* Cancel */}
      <View className="p-8 items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-sm text-text-sub underline">
            生成をキャンセル
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

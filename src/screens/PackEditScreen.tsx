import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<Record<string, undefined>>;
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

export default function PackEditScreen({ navigation }: Props) {
  const renderStampItem = (uri: string, index: number) => {
    const isSelected = index === 0;
    return (
      <View
        key={index}
        className={`aspect-square rounded-2xl bg-white overflow-hidden ${
          isSelected
            ? "border-2 border-primary"
            : "border border-border-light"
        }`}
        style={[
          { width: "30.5%" },
          isSelected
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 8,
                transform: [{ scale: 1.05 }],
                zIndex: 10,
              }
            : {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              },
        ]}
      >
        {/* Delete button */}
        <View className="absolute top-1 left-1 z-20">
          <TouchableOpacity
            className={`w-6 h-6 rounded-full items-center justify-center ${
              isSelected ? "bg-red-500" : "bg-gray-200/80"
            }`}
            style={isSelected ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            } : undefined}
          >
            <MaterialIcons
              name="close"
              size={14}
              color={isSelected ? "#fff" : "#555"}
            />
          </TouchableOpacity>
        </View>
        {/* Drag handle */}
        <View className="absolute top-1 right-1 z-20 w-6 h-6 items-center justify-center gap-0.5">
          <View
            className={`w-3.5 h-0.5 rounded-full ${
              isSelected ? "bg-primary" : "bg-gray-400"
            }`}
          />
          <View
            className={`w-3.5 h-0.5 rounded-full ${
              isSelected ? "bg-primary" : "bg-gray-400"
            }`}
          />
          <View
            className={`w-3.5 h-0.5 rounded-full ${
              isSelected ? "bg-primary" : "bg-gray-400"
            }`}
          />
        </View>
        <Image
          source={{ uri }}
          className="w-full h-full p-2"
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-light">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-white/80 px-4 py-4 border-b border-border-light">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="w-10 h-10 rounded-full items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back-ios-new" size={20} color="#121715" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-text-main tracking-tight">
            パックを編集
          </Text>
        </View>
        <TouchableOpacity className="bg-primary px-6 py-2 rounded-full">
          <Text className="text-sm font-bold text-text-main">完了</Text>
        </TouchableOpacity>
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
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
                defaultValue="うちの猫"
              />
              <View className="absolute right-4 top-4">
                <MaterialIcons name="edit" size={22} color="#a8e6cf" />
              </View>
            </View>
          </View>

          {/* Grid Header */}
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-sm font-bold text-text-sub uppercase tracking-wider">
              スタンプの並び替え
            </Text>
            <Text className="text-xs text-text-sub">ドラッグして移動</Text>
          </View>

          {/* Sticker Grid */}
          <View className="flex-row flex-wrap gap-3">
            {MOCK_STAMPS.map((uri, index) => renderStampItem(uri, index))}
            {/* Add placeholder */}
            <View
              className="aspect-square rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 items-center justify-center"
              style={{ width: "30.5%" }}
            >
              <MaterialIcons
                name="add"
                size={36}
                color="rgba(168,230,207,0.4)"
              />
            </View>
          </View>

          {/* Add Stickers Button */}
          <TouchableOpacity
            className="w-full py-4 border-2 border-dashed border-border-light rounded-2xl items-center justify-center gap-1"
            onPress={() => navigation.navigate("StampEditor")}
          >
            <MaterialIcons name="add-circle" size={30} color="#688279" />
            <Text className="text-sm font-bold text-text-sub">
              スタンプを追加
            </Text>
          </TouchableOpacity>
        </View>
        {/* Bottom spacer for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}

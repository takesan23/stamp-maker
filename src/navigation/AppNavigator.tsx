import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

import HomeScreen from "../screens/HomeScreen";
import PackDetailScreen from "../screens/PackDetailScreen";
import ExportScreen from "../screens/ExportScreen";
import QuickCreateScreen from "../screens/QuickCreateScreen";
import GuideScreen from "../screens/GuideScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StickerEditorScreen from "../screens/StickerEditorScreen";

// --- 型定義 ---
export type RootStackParamList = {
  MainTabs: undefined;
  StickerEditor: {
    imageUri?: string;
    packId?: string;
    returnTo?: "home" | "quick";
  };
};

export type HomeStackParamList = {
  Home: undefined;
  PackDetail: { packId: string };
  Export: { packId: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  QuickCreateTab: undefined;
  GuideTab: undefined;
  SettingsTab: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeStackNavigator() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="PackDetail" component={PackDetailScreen} />
      <HomeStackNav.Screen name="Export" component={ExportScreen} />
    </HomeStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: {
          backgroundColor: "rgba(255,255,255,0.97)",
          borderTopWidth: 0.5,
          borderTopColor: colors.separator,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "ホーム",
          tabBarAccessibilityLabel: "ホーム タブ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="QuickCreateTab"
        component={QuickCreateScreen}
        options={{
          tabBarLabel: "すぐ作る",
          tabBarAccessibilityLabel: "すぐ作る タブ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-photo-alternate" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GuideTab"
        component={GuideScreen}
        options={{
          tabBarLabel: "使い方",
          tabBarAccessibilityLabel: "使い方 タブ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: "設定",
          tabBarAccessibilityLabel: "設定 タブ",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="StickerEditor"
        component={StickerEditorScreen}
        options={{ presentation: "fullScreenModal" }}
      />
    </RootStack.Navigator>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import StampEditorScreen from "../screens/StampEditorScreen";
import AIProcessingScreen from "../screens/AIProcessingScreen";
import StampCompleteScreen from "../screens/StampCompleteScreen";
import PackEditScreen from "../screens/PackEditScreen";
import PreviewScreen from "../screens/PreviewScreen";

// Stack types
export type HomeStackParamList = {
  Home: undefined;
  PackEdit: undefined;
  Preview: undefined;
};

export type CreateStackParamList = {
  StampEditor: undefined;
  AIProcessing: undefined;
  StampComplete: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CreateStack = createNativeStackNavigator<CreateStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="PackEdit" component={PackEditScreen} />
      <HomeStack.Screen name="Preview" component={PreviewScreen} />
    </HomeStack.Navigator>
  );
}

function CreateStackNavigator() {
  return (
    <CreateStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateStack.Screen name="StampEditor" component={StampEditorScreen} />
      <CreateStack.Screen name="AIProcessing" component={AIProcessingScreen} />
      <CreateStack.Screen
        name="StampComplete"
        component={StampCompleteScreen}
      />
    </CreateStack.Navigator>
  );
}

// Placeholder screens for tabs that aren't built yet
function PlaceholderScreen() {
  return null;
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#a8e6cf",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "rgba(255,255,255,0.9)",
          borderTopColor: "#f3f4f6",
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "ホーム",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={CreateStackNavigator}
        options={{
          tabBarLabel: "作成",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="auto-fix-high" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: "作成履歴",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: "設定",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

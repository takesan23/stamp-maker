import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { PHRASE_PRESETS, MOOD_PRESETS } from "../constants/stamps";
import { colors, shadows } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";
import Button from "../components/Button";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "StickerEditor">;
  route: RouteProp<RootStackParamList, "StickerEditor">;
};

type EditorStep = 1 | 2 | 3;

const STEP_LABELS = ["背景除去", "文字入れ", "プレビュー"] as const;

const AI_MESSAGES = [
  "背景をきれいに消しています...",
  "いい感じのフチをつけています...",
  "サイズを調整しています...",
  "仕上げ中...",
];

const MOCK_THUMBNAILS = [
  "https://placekitten.com/96/96",
  "https://placekitten.com/97/97",
  "https://placekitten.com/98/98",
  "https://placekitten.com/99/99",
];

// --- Step Indicator ---
function StepIndicator({ currentStep }: { currentStep: EditorStep }) {
  return (
    <View className="flex-row items-center justify-center gap-3 py-3">
      {STEP_LABELS.map((label, i) => {
        const step = (i + 1) as EditorStep;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <View key={step} className="flex-row items-center gap-2">
            {i > 0 && (
              <View
                className={`w-8 h-0.5 ${
                  isCompleted ? "bg-primary" : "bg-fill-secondary"
                }`}
              />
            )}
            <View className="items-center gap-1">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  isActive
                    ? "bg-primary"
                    : isCompleted
                      ? "bg-primary/60"
                      : "bg-fill-secondary"
                }`}
              >
                {isCompleted ? (
                  <MaterialIcons name="check" size={16} color="#fff" />
                ) : (
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? "text-text-main" : "text-text-sub"
                    }`}
                  >
                    {step}
                  </Text>
                )}
              </View>
              <Text
                className={`text-xs ${
                  isActive ? "font-bold text-text-main" : "text-text-sub"
                }`}
              >
                {label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

// --- Step 1: AI Background Removal ---
function Step1BackgroundRemoval({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % AI_MESSAGES.length);
    }, 2000);
    return () => clearInterval(msgTimer);
  }, []);

  const clampedProgress = Math.min(progress, 100);

  return (
    <View className="flex-1 items-center justify-center px-8">
      {/* Circle Animation */}
      <View className="relative w-64 h-64 mb-10">
        <View
          className="absolute bg-primary/20 rounded-full"
          style={{ top: -12, left: -12, right: -12, bottom: -12 }}
        />
        <View
          className="w-full h-full bg-white rounded-full items-center justify-center border-8 border-white overflow-hidden"
          style={shadows.lg}
        >
          <MaterialIcons name="auto-fix-high" size={80} color={colors.primary} />
          <View className="flex-row gap-2 mt-2" accessible={false}>
            <View className="w-2 h-2 bg-primary rounded-full" />
            <View className="w-2 h-2 bg-primary/60 rounded-full" />
            <View className="w-2 h-2 bg-primary/30 rounded-full" />
          </View>
        </View>
        <View
          className="absolute -top-4 -right-4 bg-primary p-3 rounded-full"
          style={shadows.md}
          accessible={false}
        >
          <MaterialIcons name="auto-awesome" size={24} color="#fff" />
        </View>
        <View
          className="absolute bottom-4 -left-2 bg-white p-2 rounded-full"
          style={shadows.sm}
          accessible={false}
        >
          <MaterialIcons name="favorite" size={20} color={colors.primary} />
        </View>
      </View>

      <Text
        className="text-2xl font-bold text-text-main text-center mb-8 tracking-tight"
        accessibilityRole="header"
      >
        AIがスタンプを作成中...
      </Text>

      {/* Progress Bar */}
      <View
        className="w-full max-w-xs"
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: 100,
          now: clampedProgress,
          text: `${clampedProgress}%完了`,
        }}
      >
        <View className="flex-row justify-between items-end mb-2">
          <Text className="text-sm font-medium text-text-sub">作成状況</Text>
          <Text className="text-lg font-bold text-text-main">
            {clampedProgress}%
          </Text>
        </View>
        <View className="h-2 w-full bg-fill-secondary rounded-full overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${clampedProgress}%` }}
          />
        </View>
        <View className="items-center mt-6 gap-2">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="check-circle" size={16} color={colors.primary} />
            <Text className="text-sm text-text-sub">
              {AI_MESSAGES[messageIndex]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// --- Step 2: Text Editor ---
function Step2TextEditor({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [selectedPhrase, setSelectedPhrase] = useState<string>(PHRASE_PRESETS[0]);
  const [selectedMood, setSelectedMood] = useState<string>(MOOD_PRESETS[0].id);

  const currentMood =
    MOOD_PRESETS.find((m) => m.id === selectedMood) ?? MOOD_PRESETS[0];

  return (
    <View className="flex-1">
      {/* Preview Area */}
      <View className="items-center justify-center p-4 flex-1">
        <View
          className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden items-center justify-center"
          style={{
            borderWidth: 1,
            borderColor: "#f3f4f6",
            backgroundColor: "#f5f5f5",
          }}
          accessibilityLabel={`プレビュー: ${selectedPhrase} ${currentMood.label}スタイル`}
        >
          <Image
            source={{ uri: "https://placekitten.com/340/340" }}
            className="absolute w-full h-full opacity-90"
            resizeMode="cover"
            accessible={false}
          />
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
          </View>
          <View
            className="absolute top-3 right-3 px-3 py-1 rounded-full flex-row items-center gap-1"
            style={{ backgroundColor: currentMood.color + "40" }}
          >
            <MaterialIcons
              name={currentMood.icon}
              size={14}
              color={currentMood.color}
            />
            <Text
              className="text-xs font-bold"
              style={{ color: currentMood.color }}
            >
              {currentMood.label}
            </Text>
          </View>
        </View>
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
                  : "border-fill-tertiary bg-bg-light"
              }`}
              onPress={() => setSelectedMood(mood.id)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`ふんいき: ${mood.label}`}
              accessibilityState={{ selected: selectedMood === mood.id }}
            >
              <View
                className="w-11 h-11 rounded-full items-center justify-center mb-1"
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
                className={`h-11 items-center justify-center px-5 rounded-full ${
                  selectedPhrase === phrase ? "bg-primary" : "bg-fill-tertiary"
                }`}
                style={
                  selectedPhrase === phrase
                    ? { borderWidth: 2, borderColor: "rgba(168, 230, 207, 0.2)" }
                    : undefined
                }
                onPress={() => setSelectedPhrase(phrase)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`セリフ: ${phrase}`}
                accessibilityState={{ selected: selectedPhrase === phrase }}
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
          </View>
        </ScrollView>
      </View>

      {/* Bottom Actions */}
      <View className="p-6 pt-4">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Button variant="secondary" label="戻る" onPress={onBack} />
          </View>
          <View className="flex-1">
            <Button variant="primary" label="次へ" onPress={onNext} />
          </View>
        </View>
      </View>
    </View>
  );
}

// --- Step 3: Preview & Save ---
function Step3Preview({
  onSave,
  onBack,
}: {
  onSave: () => void;
  onBack: () => void;
}) {
  return (
    <View className="flex-1">
      {/* Celebration Header */}
      <View className="px-4 pb-6 pt-8 items-center overflow-hidden">
        <View
          className="absolute top-0 left-8 w-3 h-3 rounded-full bg-pink-200 opacity-60"
          accessible={false}
        />
        <View
          className="absolute top-4 right-12 w-2 h-2 rounded-full bg-yellow-200 opacity-60"
          accessible={false}
        />
        <View
          className="absolute top-8 left-20 w-2 h-2 rounded-full bg-blue-200 opacity-60"
          accessible={false}
        />
        <View
          className="absolute bottom-2 right-20 w-3 h-3 rounded-full bg-primary opacity-40"
          accessible={false}
        />
        <Text
          className="text-3xl font-bold text-text-main mb-2"
          accessibilityRole="header"
        >
          完成しました！
        </Text>
        <Text className="text-sm font-medium text-text-sub">
          かわいいスタンプができました
        </Text>
      </View>

      {/* Sticker Preview */}
      <View className="flex-1 items-center justify-center p-6">
        <View
          className="relative w-72 aspect-square items-center justify-center"
          accessibilityLabel="完成したスタンプのプレビュー"
        >
          <View
            className="absolute inset-0 bg-primary/20 rounded-full"
            accessible={false}
          />
          <View
            className="relative z-10 w-full h-full bg-white rounded-3xl items-center justify-center overflow-hidden border-8 border-white"
            style={shadows.lg}
          >
            <Image
              source={{ uri: "https://placekitten.com/280/280" }}
              className="w-full h-full"
              resizeMode="cover"
              accessible={false}
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
          <Button
            variant="primary"
            label="パックに保存する"
            onPress={onSave}
            icon={
              <MaterialIcons name="download" size={22} color={colors.textMain} />
            }
          />
          <Button
            variant="secondary"
            label="作り直す"
            onPress={onBack}
            icon={
              <MaterialIcons name="refresh" size={22} color={colors.textMain} />
            }
          />
        </View>
      </View>

      {/* Pack Preview Footer */}
      <View
        className="bg-bg-light p-6 rounded-t-3xl"
        style={{
          borderTopWidth: 0.5,
          borderTopColor: colors.separator,
          ...shadows.sm,
        }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm font-bold text-text-sub">
            作成中のパック (4/8)
          </Text>
          <MaterialIcons name="apps" size={20} color={colors.secondary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-3">
            {MOCK_THUMBNAILS.map((uri, i) => (
              <View
                key={i}
                className={`w-16 h-16 rounded-xl overflow-hidden ${
                  i === 0 ? "border-2 border-primary" : "bg-fill-secondary"
                }`}
                accessibilityLabel={`スタンプ ${i + 1}`}
              >
                <Image
                  source={{ uri }}
                  className="w-full h-full"
                  resizeMode="cover"
                  accessible={false}
                />
              </View>
            ))}
            <View
              className="w-16 h-16 rounded-xl bg-bg-light border-2 border-dashed border-border-light items-center justify-center"
              accessibilityLabel="スタンプを追加"
            >
              <MaterialIcons name="add" size={24} color="#ccc" />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// --- Main StickerEditorScreen ---
export default function StickerEditorScreen({ navigation }: Props) {
  const [step, setStep] = useState<EditorStep>(1);

  const closeEditor = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <ScreenHeader
        variant="close"
        title={
          step === 1
            ? "AI処理中"
            : step === 2
              ? "文字入れ"
              : "スタンプ完成！"
        }
        onClose={closeEditor}
      />

      {/* Step Indicator */}
      <StepIndicator currentStep={step} />

      {/* Step Content */}
      {step === 1 && <Step1BackgroundRemoval onComplete={() => setStep(2)} />}
      {step === 2 && (
        <Step2TextEditor
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3Preview onSave={closeEditor} onBack={() => setStep(2)} />
      )}
    </SafeAreaView>
  );
}

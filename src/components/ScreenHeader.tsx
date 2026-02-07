import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

type HeaderAction = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  accessibilityLabel: string;
};

type BackHeaderProps = {
  variant: "back";
  title: string;
  onBack: () => void;
  rightAction?: HeaderAction;
};

type CloseHeaderProps = {
  variant: "close";
  title: string;
  onClose: () => void;
  rightAction?: HeaderAction;
};

type HomeHeaderProps = {
  variant: "home";
  title: string;
  onMenuPress: () => void;
  rightAction?: HeaderAction;
  rightElement?: React.ReactNode;
};

type ScreenHeaderProps = BackHeaderProps | CloseHeaderProps | HomeHeaderProps;

function HeaderButton({
  icon,
  onPress,
  accessibilityLabel,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <TouchableOpacity
      className="w-11 h-11 items-center justify-center"
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
    >
      <MaterialIcons name={icon} size={24} color={colors.textMain} />
    </TouchableOpacity>
  );
}

export default function ScreenHeader(props: ScreenHeaderProps) {
  const renderLeft = () => {
    switch (props.variant) {
      case "back":
        return (
          <HeaderButton
            icon="arrow-back-ios-new"
            onPress={props.onBack}
            accessibilityLabel="戻る"
          />
        );
      case "close":
        return (
          <HeaderButton
            icon="close"
            onPress={props.onClose}
            accessibilityLabel="閉じる"
          />
        );
      case "home":
        return (
          <HeaderButton
            icon="menu"
            onPress={props.onMenuPress}
            accessibilityLabel="メニュー"
          />
        );
    }
  };

  const renderRight = () => {
    if (props.variant === "home" && props.rightElement) {
      return props.rightElement;
    }
    if (props.rightAction) {
      return (
        <HeaderButton
          icon={props.rightAction.icon}
          onPress={props.rightAction.onPress}
          accessibilityLabel={props.rightAction.accessibilityLabel}
        />
      );
    }
    return <View className="w-11 h-11" />;
  };

  return (
    <View className="flex-row items-center justify-between px-4 h-11">
      {renderLeft()}
      <Text
        className="flex-1 text-lg font-bold text-text-main ml-2"
        numberOfLines={1}
      >
        {props.title}
      </Text>
      {renderRight()}
    </View>
  );
}

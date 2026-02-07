import React from "react";
import { Text, TouchableOpacity, type ViewStyle } from "react-native";
import { colors, shadows } from "../constants/theme";

type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  variant?: ButtonVariant;
  label: string;
  onPress: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

export default function Button({
  variant = "primary",
  label,
  onPress,
  icon,
  destructive = false,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const baseClass = "flex-row items-center justify-center h-14 rounded-full";

  const variantClass = {
    primary: "bg-primary",
    secondary: "border-2 border-primary",
    tertiary: "",
  }[variant];

  const textColor = destructive
    ? colors.destructive
    : variant === "tertiary"
      ? colors.textSub
      : colors.textMain;

  const textClass =
    variant === "tertiary"
      ? "text-sm font-bold"
      : "text-base font-bold";

  return (
    <TouchableOpacity
      className={`${baseClass} ${variantClass}`}
      style={[variant === "primary" ? shadows.md : undefined, style]}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {icon && <>{icon}</>}
      <Text className={textClass} style={[{ color: textColor }, icon ? { marginLeft: 8 } : undefined]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

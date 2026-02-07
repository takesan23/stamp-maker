import { Platform } from "react-native";

export const colors = {
  primary: "#a8e6cf",
  primaryLight: "rgba(168, 230, 207, 0.2)",
  secondary: "#2d9d6f",
  destructive: "#ff3b30",
  background: "#f9f9f9",
  backgroundDark: "#131f1a",
  textMain: "#121715",
  textSub: "#688279",
  labelSecondary: "#8e8e93",
  borderLight: "#dde4e1",
  separator: "rgba(60, 60, 67, 0.12)",
  fillSecondary: "rgba(120, 120, 128, 0.16)",
  fillTertiary: "rgba(120, 120, 128, 0.12)",
  cardDark: "#1c2a24",
  white: "#ffffff",
  chatBg: "#7294C1",
} as const;

export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
    },
    android: { elevation: 2 },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
    },
    android: { elevation: 12 },
    default: {},
  }),
} as const;

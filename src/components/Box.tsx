import React from "react";
import { View, ViewProps, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { composeStyles } from "../core/createStyles";

export interface BoxProps extends ViewProps {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string;
  flex?: number;
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
  alignItems?: "flex-start" | "center" | "flex-end";
  gap?: number;
}

export const Box: React.FC<BoxProps> = ({
  children,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  backgroundColor,
  flex,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const boxStyle: ViewStyle = {
    ...(padding && { padding }),
    ...(paddingHorizontal && { paddingHorizontal }),
    ...(paddingVertical && { paddingVertical }),
    ...(margin && { margin }),
    ...(marginHorizontal && { marginHorizontal }),
    ...(marginVertical && { marginVertical }),
    ...(backgroundColor && { backgroundColor }),
    ...(flex !== undefined && { flex }),
    ...(flexDirection && { flexDirection }),
    ...(justifyContent && { justifyContent }),
    ...(alignItems && { alignItems }),
    ...(gap && { gap }),
  };

  return (
    <View style={[boxStyle, style as ViewStyle]} {...props}>
      {children}
    </View>
  );
};

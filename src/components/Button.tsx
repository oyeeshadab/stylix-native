import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { createStyles } from "../core/createStyles";

const getStyles = createStyles((theme) => ({
  button: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  text: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.6,
  },
  textPrimary: {
    color: theme.colors.text,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
  },
  textOutline: {
    color: theme.colors.primary,
  },
  textDisabled: {
    color: theme.colors.textSecondary,
  },
}));

export interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "text";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  disabled = false,
  children,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
        return styles.textPrimary;
      case "secondary":
        return styles.textSecondary;
      case "outline":
        return styles.textOutline;
      default:
        return styles.textPrimary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <Text style={[theme.typography.body, getTextStyle()]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

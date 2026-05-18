import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { createStyles } from "../core/createStyles";

const getStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  bordered: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
}));

export interface CardProps extends ViewProps {
  elevated?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  bordered = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        bordered && styles.bordered,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

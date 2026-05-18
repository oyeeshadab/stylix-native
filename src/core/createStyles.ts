import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    body: TextStyle;
    caption: TextStyle;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    round: number;
  };
}

// Default theme
export const defaultTheme: Theme = {
  colors: {
    primary: "#0066cc",
    secondary: "#6c757d",
    background: "#ffffff",
    surface: "#f8f9fa",
    error: "#dc3545",
    text: "#212529",
    textSecondary: "#6c757d",
    border: "#dee2e6",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: "bold", lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: "bold", lineHeight: 32 },
    body: { fontSize: 16, lineHeight: 24 },
    caption: { fontSize: 12, lineHeight: 16, color: "#6c757d" },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    round: 999,
  },
};

// Style creator with theme support
export function createStyles<T extends Record<string, Style>>(
  stylesFn: (theme: Theme) => T,
) {
  let cachedStyles: { [key: string]: T } = {};

  return (theme: Theme = defaultTheme) => {
    const themeKey = JSON.stringify(theme);

    if (!cachedStyles[themeKey]) {
      cachedStyles[themeKey] = StyleSheet.create(stylesFn(theme));
    }

    return cachedStyles[themeKey];
  };
}

// Variant system
export function createVariant<T extends string>(variants: Record<T, Style>) {
  return (variant: T) => variants[variant];
}

// Compose styles
export function composeStyles(...styles: Style[]): Style {
  return Object.assign({}, ...styles);
}

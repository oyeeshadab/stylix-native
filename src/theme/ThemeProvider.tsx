import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, defaultTheme } from "../core/createStyles";
import { useColorScheme } from "react-native";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Dark theme
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#a0a0a0",
    border: "#2c2c2c",
  },
};

export const StylixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? darkTheme : defaultTheme,
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === defaultTheme ? darkTheme : defaultTheme));
  };

  const isDark = theme === darkTheme;

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : defaultTheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within StylixProvider");
  }
  return context;
};

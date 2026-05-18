import { useWindowDimensions, ScaledSize } from "react-native";
import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const getBreakpoint = (): Breakpoint => {
    if (width < breakpoints.sm) return "xs";
    if (width < breakpoints.md) return "sm";
    if (width < breakpoints.lg) return "md";
    if (width < breakpoints.xl) return "lg";
    return "xl";
  };

  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;

  return {
    width,
    height,
    breakpoint: getBreakpoint(),
    isMobile,
    isTablet,
    isDesktop,
    orientation: width > height ? "landscape" : "portrait",
  };
};

// Responsive value helper
export function useResponsiveValue<T>(values: Record<Breakpoint, T>): T {
  const { breakpoint } = useResponsive();
  return values[breakpoint];
}

// Responsive style helper
export function useResponsiveStyle<T>(
  baseStyle: T,
  responsiveStyles: Partial<Record<Breakpoint, T>>,
): T {
  const { breakpoint } = useResponsive();
  return {
    ...baseStyle,
    ...responsiveStyles[breakpoint],
  };
}

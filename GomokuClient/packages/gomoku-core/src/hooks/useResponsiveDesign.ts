import { useEffect, useMemo, useState } from "react";

type Breakpoints = Record<string, number>;

export const defaultBreakpoints: Breakpoints = {
  isSmall: 400,
  isMedium: 768,
  isLarge: 1488,
};

/**
 * A React hook to monitor and respond to viewport width changes. This hook supports
 * either a single numeric breakpoint or multiple named breakpoints.
 *
 * @param breakpointsOrSingleValue - Either a single numeric breakpoint (e.g., `1488`) or
 * a collection of named breakpoints (e.g., `{ isSmall: 400, isMedium: 768 }`).
 * If omitted, default breakpoints (`isSmall`, `isMedium`, `isLarge`) are used.
 *
 * @returns A consistent object mapping each breakpoint name to a `boolean` indicating its match status.
 */
export const useResponsiveDesign = (
  breakpointsOrSingleValue:
    | Breakpoints
    | number
    | undefined = defaultBreakpoints,
): Record<string, boolean> => {
  const isSingleValue = typeof breakpointsOrSingleValue === "number";

  const breakpoints = useMemo(() => {
    if (breakpointsOrSingleValue === undefined) {
      return defaultBreakpoints;
    }
    return isSingleValue
      ? { isMobile: breakpointsOrSingleValue }
      : breakpointsOrSingleValue;
  }, [breakpointsOrSingleValue, isSingleValue]);

  const [matches, setMatches] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(Object.keys(breakpoints).map((key) => [key, false])),
  );

  useEffect(() => {
    const mediaQueries = Object.entries(breakpoints).map(([key, value]) => ({
      key,
      query: window.matchMedia(`(max-width: ${value}px)`),
    }));

    const updateMatches = () => {
      setMatches(
        mediaQueries.reduce(
          (acc, { key, query }) => {
            acc[key] = query.matches;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
    };

    updateMatches();

    mediaQueries.forEach(({ query }) =>
      query.addEventListener("change", updateMatches),
    );

    return () =>
      mediaQueries.forEach(({ query }) =>
        query.removeEventListener("change", updateMatches),
      );
  }, [breakpoints]);

  return matches;
};

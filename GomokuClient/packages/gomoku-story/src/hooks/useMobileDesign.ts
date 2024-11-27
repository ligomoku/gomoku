import { useEffect, useState } from "react";

const MobileBreakpoints = {
  default: 768,
  mobile: 1488,
} as const;

export const useMobileDesign = (
  mobileWidth: (typeof MobileBreakpoints)[keyof typeof MobileBreakpoints] = MobileBreakpoints.default,
) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileWidth}px)`);
    setIsMobile(mediaQuery.matches);
    const handleResize = (): void => setIsMobile(mediaQuery.matches);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileWidth]);

  return isMobile;
};

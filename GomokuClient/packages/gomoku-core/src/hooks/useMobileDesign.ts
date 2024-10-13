import { useEffect, useState } from "react";

export const useMobileDesign = (mobileWidth = 768) => {
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

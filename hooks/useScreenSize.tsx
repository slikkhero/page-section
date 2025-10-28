import { useState, useEffect } from "react";
import { ScreenSize } from "@/utils";

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("sm");

  useEffect(() => {
    function getScreenSize(): ScreenSize {
      if (window.innerWidth < 768) return "sm";
      if (window.innerWidth < 1024) return "md";
      return "lg";
    }

    function handleResize() {
      setScreenSize(getScreenSize());
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;

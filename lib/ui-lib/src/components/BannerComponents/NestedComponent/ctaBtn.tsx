// components/WebCTAButton.tsx
"use client";

import { CtaConfigProps, ScreenSize } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type SelectedCategory = {
  id?: string | number;
  name?: string;
};

type Props = {
  cta_config?: CtaConfigProps;
  childData?: any[];
  selectedCategory: SelectedCategory;
  windowWidth?: number;
  size?: ScreenSize;
};

const CtaBtn: React.FC<Props> = ({ cta_config, childData, selectedCategory, size }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setContainerWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    if (window) window.addEventListener("resize", updateWidth);
    return () => window?.removeEventListener("resize", updateWidth);
  }, []);

  const width = containerWidth * (cta_config?.width || 0.5);
  if (!(cta_config?.text && childData?.length)) return null;

  const handleClick = () => {
    const redirect =
      "/products?" +
      "banner_id=" +
      selectedCategory.id +
      "&namex=" +
      encodeURIComponent(selectedCategory?.name || "");
    router.push(redirect);
  };

  const getTextAlignment = (pos: string) => {
    switch (pos) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
      default:
        return "center";
    }
  };

  // Helper to pick web/mobile value
  const pickWebOrDefault = <T,>(
    webValue: T | undefined,
    defaultValue: T | undefined,
    size: string | undefined
  ): T | undefined =>
    size === "lg" && webValue && webValue !== undefined ? webValue : defaultValue;

  const containerStyle: React.CSSProperties = {
    width: width,
    borderRadius:
      pickWebOrDefault(cta_config.web_cornerRadius, cta_config.cornerRadius, size) || 0,
    marginTop:
      pickWebOrDefault(cta_config.web_topMargin, cta_config.topMargin, size) || 0,
    marginBottom:
      pickWebOrDefault(cta_config.web_bottomMargin, cta_config.bottomMargin, size) || 0,
    paddingLeft:
      pickWebOrDefault(
        cta_config.web_horizontalPadding,
        cta_config.horizontalPadding,
        size
      ) || 0,
    paddingRight:
      pickWebOrDefault(
        cta_config.web_horizontalPadding,
        cta_config.horizontalPadding,
        size
      ) || 0,
    paddingTop:
      pickWebOrDefault(
        cta_config.web_verticalPadding,
        cta_config.verticalPadding,
        size
      ) || 0,
    paddingBottom:
      pickWebOrDefault(
        cta_config.web_verticalPadding,
        cta_config.verticalPadding,
        size
      ) || 0,
    borderWidth:
      pickWebOrDefault(cta_config.web_borderWidth, cta_config.borderWidth, size) || 0,
    borderColor:
      pickWebOrDefault(cta_config.web_borderColor, cta_config.borderColor, size) ||
      "#000000",
    borderStyle:
      pickWebOrDefault(cta_config.web_borderStyle, cta_config.borderStyle, size) ||
      "solid",
    backgroundColor:
      pickWebOrDefault(
        cta_config.web_background_color,
        cta_config.background_color,
        size
      ) || "transparent",
    display: "flex",
    justifyContent: getTextAlignment(cta_config.alignment || "center"),
    cursor: "pointer",
  };

  const textStyle: React.CSSProperties = {
    letterSpacing:
      pickWebOrDefault(cta_config.web_letter_spacing, cta_config.letter_spacing, size) ||
      0,
    fontSize:
      pickWebOrDefault(cta_config.web_font_size, cta_config.font_size, size) || 24,
    color:
      pickWebOrDefault(cta_config.web_font_color, cta_config.font_color, size) ||
      "#A5A4A5",
    fontStyle: cta_config.style === "italic" ? "italic" : "normal",
    fontWeight: cta_config.style === "bold" ? "700" : "400",
    justifyContent: cta_config.alignment || "center",
    textDecoration: cta_config.style === "underline" ? "underline" : "none",
  };

  return (
    <div
      ref={ref}
      className="flex w-full"
      style={{ justifyContent: getTextAlignment(cta_config.position || "left") }}
    >
      <div onClick={handleClick} style={containerStyle}>
        <span style={textStyle}>{cta_config.text}</span>
      </div>
    </div>
  );
};

export default CtaBtn;

import { AlignmentType, HandlingErrorTempBeforeLaunch, ScreenSize } from "@/utils";
import clsx from "clsx";
import React from "react";

interface HeaderWithSubHeaderProps {
  headerConfig: HandlingErrorTempBeforeLaunch | null | undefined;
  subHeaderConfig: HandlingErrorTempBeforeLaunch | null | undefined;
  size: ScreenSize;
}
export function getTextAlignment(
  position?: AlignmentType
): "flex-start" | "center" | "flex-end" {
  switch (position) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
    default:
      return "flex-start";
  }
}
export const HeaderWithSubHeader: React.FC<HeaderWithSubHeaderProps> = ({
  headerConfig,
  subHeaderConfig,
  size,
}) => {
  const {
    icon: headerIcon = "",
    text: headerText = "",
    web_text: webHeaderText = "",
    style: headerStyle = "",
    position: headerPosition = "",
    image: headerImage = "",
    web_image: webHeaderImage = "",
    font_size: headerFontSize = 24,
    web_font_size: headerFontSizeWeb = 24,
    font_color: headerFontColor = "#A5A4A5",
    background_color: headerBackgroundColor = "transparent",
    topMargin: headerTopMargin = 0,
    bottomMargin: headerBottomMargin = 0,
    web_topMargin: webHeaderTopMargin = 0,
    web_bottomMargin: webHeaderBottomMargin = 0,
    web_redirection_url: webHeaderRedirectionUrl,
    width: headerWidth = 1,
    web_width: webHeaderWidth = 1,
  } = headerConfig || {};
  const {
    icon: subHeaderIcon = "",
    text: subHeaderText = "",
    web_text: webSubHeaderText = "",
    style: subHeaderStyle = "",
    image: subHeaderImage = "",
    web_image: webSubHeaderImage = "",
    position: subHeaderPosition = "",
    font_size: subHeaderFontSize = 18,
    web_font_size: subHeaderFontSizeWeb = 18,
    font_color: subHeaderFontColor = "#A5A4A5",
    background_color: subHeaderBackgroundColor = "transparent",
    topMargin: subHeaderTopMargin = 0,
    bottomMargin: subHeaderBottomMargin = 0,
    web_topMargin: webSubHeaderTopMargin = 0,
    web_bottomMargin: webSubHeaderBottomMargin = 0,
    web_redirection_url: webSubHeaderRedirectionUrl,
    width: subHeaderWidth = 1,
    web_width: webSubHeaderWidth = 1,
  } = subHeaderConfig || {};

  // Apply dynamic text styles for Header
  const headerTextStyle = clsx({
    "font-bold": headerStyle?.toLowerCase().includes("bold"),
    italic: headerStyle?.toLowerCase().includes("italic"),
    underline: headerStyle?.toLowerCase().includes("underline"),
  });

  // Apply dynamic text styles for SubHeader
  const subHeaderTextStyle = clsx({
    "font-bold": subHeaderStyle?.toLowerCase().includes("bold"),
    italic: subHeaderStyle?.toLowerCase().includes("italic"),
    underline: subHeaderStyle?.toLowerCase().includes("underline"),
  });

  // Set text alignment for Header and SubHeader
  const headerAlign =
    headerPosition === "left"
      ? "justify-start"
      : headerPosition === "right"
        ? "justify-end"
        : "justify-center";

  const subHeaderAlign =
    subHeaderPosition === "left"
      ? "justify-start"
      : subHeaderPosition === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <div className="w-full flex flex-col">
      <a
        href={webHeaderRedirectionUrl}
        onClick={(e) => {
          if (!webHeaderRedirectionUrl) {
            e.preventDefault();
          }
        }}
        style={{
          backgroundColor: headerBackgroundColor || "transparent",
          color: headerFontColor || "#A5A4A5",
          marginTop: size == "lg" ? webHeaderTopMargin : headerTopMargin,
          marginBottom: size == "lg" ? webHeaderBottomMargin : headerBottomMargin,
        }}
      >
        <div className={`flex items-center ${headerAlign}`}>
          {/* {headerIcon && (
          <img
            src={headerIcon}
            width={80}
            alt="header icon"
            className="inline-block mr-2"
          />
        )} */}

          {/* Render Header Text if available */}
          {((size === "lg" && (webHeaderText || headerText)) ||
            (size !== "lg" && headerText)) && (
            <h1
              className={`${headerTextStyle} `}
              style={{
                fontSize: `${
                  size == "lg" ? headerFontSizeWeb || 24 : headerFontSize || 18
                }px`,
                color: headerFontColor || "#A5A4A5",
              }}
            >
              {size == "lg" ? webHeaderText || headerText : headerText}
            </h1>
          )}
          {((size !== "lg" && headerImage) ||
            (size == "lg" && (webHeaderImage || headerImage))) && (
            <img
              className="object-contain"
              src={size === "lg" ? webHeaderImage || headerImage : headerImage}
              alt=""
              style={{
                width:
                  size == "lg"
                    ? `${(webHeaderWidth || 1) * 100}%`
                    : `${(headerWidth || 1) * 100}%`,
              }}
            />
          )}
        </div>
      </a>
      <a
        href={webSubHeaderRedirectionUrl}
        onClick={(e) => {
          if (!webSubHeaderRedirectionUrl) {
            e.preventDefault();
          }
        }}
        style={{
          backgroundColor: subHeaderBackgroundColor || "transparent",
          color: subHeaderFontColor || "#A5A4A5",
          marginTop: size == "lg" ? webSubHeaderTopMargin : subHeaderTopMargin,
          marginBottom: size == "lg" ? webSubHeaderBottomMargin : subHeaderBottomMargin,
        }}
      >
        <div className={`flex items-center ${subHeaderAlign}`}>
          {/* {headerIcon && (
          <img
            src={headerIcon}
            width={80}
            alt="header icon"
            className="inline-block mr-2"
          />
        )} */}

          {/* Render Header Text if available */}
          {((size === "lg" && (webSubHeaderText || subHeaderText)) ||
            (size !== "lg" && subHeaderText)) && (
            <h1
              className={`${subHeaderTextStyle}`}
              style={{
                fontSize: `${
                  size == "lg" ? subHeaderFontSizeWeb || 24 : subHeaderFontSize || 18
                }px`,
                color: subHeaderFontColor || "#A5A4A5",
              }}
            >
              {size == "lg" ? webSubHeaderText || subHeaderText : subHeaderText}
            </h1>
          )}
          {((size !== "lg" && subHeaderImage) ||
            (size == "lg" && (webSubHeaderImage || subHeaderImage))) && (
            <img
              className="object-contain"
              src={size == "lg" ? webSubHeaderImage || subHeaderImage : subHeaderImage}
              alt=""
              style={{
                width:
                  size == "lg"
                    ? `${(webSubHeaderWidth || 1) * 100}%`
                    : `${(subHeaderWidth || 1) * 100}%`,
              }}
            />
          )}
        </div>
      </a>
    </div>
  );
};

// Example usage:
const headerConfig = {
  icon: "https://example.com/icon.png", // You can leave this empty if no icon is needed
  text: "Brand Discounts",
  style: "B",
  position: "left",
};

const subHeaderConfig = {
  text: "get discounts on trending brands", // Leave this empty to hide subheader
  style: "I",
  position: "left",
};

import { HandlingErrorTempBeforeLaunch, ScreenSize } from "@/utils";
import clsx from "clsx";
import React from "react";

interface FooterProps {
  footerConfig: HandlingErrorTempBeforeLaunch | null | undefined;
  size: ScreenSize;
}

export const Footer: React.FC<FooterProps> = ({ footerConfig, size }) => {
  const {
    icon: footerIcon = "",
    text: footerText = "",
    web_text: webFooterText = "",
    image: footerImage = "",
    web_image: webFooterImage = "",
    style: footerStyle = "",
    position: footerPosition = "",
    font_size: footerFontSize = 16,
    web_font_size: footerFontSizeWeb = 18,
    font_color: footerFontColor = "#A5A4A5",
    background_color: footerBackgroundColor = "transparent",
    topMargin: footerTopMargin = 0,
    bottomMargin: footerBottomMargin = 0,
    web_topMargin: webFooterTopMargin = 0,
    web_bottomMargin: webFooterBottomMargin = 0,
    web_redirection_url: webFooterRedirectionUrl,
    web_width: webFooterWidth = 1,
    width: footerWidth = 1,
  } = footerConfig || {};

  // Apply dynamic text styles for Footer
  const footerTextStyle = clsx({
    "font-bold": footerStyle?.toLowerCase().includes("bold"),
    italic: footerStyle?.toLowerCase().includes("italic"),
    underline: footerStyle?.toLowerCase().includes("underline"),
  });

  const footerAlign =
    footerPosition === "left"
      ? "justify-start"
      : footerPosition === "right"
        ? "justify-end"
        : "justify-center";

  return (
    <a
      href={webFooterRedirectionUrl}
      onClick={(e) => {
        if (!webFooterRedirectionUrl) {
          e.preventDefault();
        }
      }}
      className=" w-full"
      style={{
        backgroundColor: footerBackgroundColor,
        marginTop: size == "lg" ? webFooterTopMargin : footerTopMargin,
        marginBottom: size == "lg" ? webFooterBottomMargin : footerBottomMargin,
      }}
    >
      {((size !== "lg" && footerImage) ||
        (size == "lg" && (webFooterImage || footerImage))) && (
        <img
          className="object-contain"
          style={{
            width:
              size == "lg"
                ? `${(webFooterWidth || 1) * 100}%`
                : `${(footerWidth || 1) * 100}%`,
          }}
          src={size == "lg" ? webFooterImage || footerImage : footerImage}
          alt=""
        />
      )}
      <div
        style={{
          backgroundColor: footerBackgroundColor || "transparent",
          color: footerFontColor || "#A5A4A5",
        }}
      >
        <div className={`flex items-center ${footerAlign}`}>
          {/* {headerIcon && (
          <img
            src={headerIcon}
            width={80}
            alt="header icon"
            className="inline-block mr-2"
          />
        )} */}

          {/* Render Header Text if available */}
          {((size === "lg" && (webFooterText || footerText)) ||
            (size !== "lg" && footerText)) && (
            <h1
              className={`${footerTextStyle} `}
              style={{
                fontSize: `${
                  size == "lg" ? footerFontSizeWeb || 24 : footerFontSize || 18
                }px`,
                color: footerFontColor || "#A5A4A5",
              }}
            >
              {size == "lg" ? webFooterText || footerText : footerText}
            </h1>
          )}
        </div>
      </div>
    </a>
  );
};

import LottieView from "@/components/Cards/OrderDetail/LottieVIew";
import { ScreenSize } from "@/utils";
import { BANNER_ITEM_FRONTEND, CarouselGridConfig } from "@/utils/DataTypes";
import clsx from "clsx";
import React from "react";
import VideoPlayer from "../../../SupportingComponents/VideoPlayer";

export interface GenericCardProps extends BANNER_ITEM_FRONTEND {
  component_config: CarouselGridConfig; // Config object for the component
  size: ScreenSize; // Screen size (lg, md, etc.)
  isCarousel: boolean; // Is the card part of a carousel
  isGridCarousel?: boolean;
  isPlaying?: boolean;
  isActive?: boolean;
  parentWidth?: number; // Optional parent width for responsive design
}

export const ParentCardMobile: React.FC<GenericCardProps> = ({
  isCarousel,
  component_config,
  isGridCarousel = false,
  image_mobile,
  image_web,
  size,
  name,
  footer,
  extra_attributes,
  isPlaying,
  isActive,
  parentWidth,
  ...props
}) => {
  const {
    name: isName,
    name_position,
    name_align,
    name_footer,
    name_footer_align,
    font_size,
    footer_font_size,
    name_bottomMargin,
    name_topMargin,
    footer_topMargin,
    footer_bottomMargin,
    footer_font_color,
    footer_font_style,
    font_color,
    font_style,
  } = component_config;
  // Dynamic width style based on component_config and carousel mode
  const widthStyle: React.CSSProperties = {
    width: isCarousel
      ? "100%"
      : isGridCarousel
        ? `calc(${(component_config.width || 0.2) * (parentWidth || 100)}px - ${
            component_config?.gap ?? 4
          }px)`
        : `${(component_config.width || 0.2) * (parentWidth || 100)}px`,
  };
  const borderStyle: React.CSSProperties = component_config?.border
    ? {
        borderWidth: component_config.border_width || 0, // Default to 0 if not provided
        borderStyle: component_config.border_style || "solid",
        borderColor: component_config.border_color || "transparent", // Default color
      }
    : {
        borderWidth: 0, // Default to 0 if not provided
        borderStyle: "solid",
        borderColor: "transparent", // Default color
      };

  const cornerRadiusStyle: React.CSSProperties = component_config?.corner_radius
    ? {
        borderRadius: component_config?.corner_radius,
      }
    : { borderRadius: 0 };

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    padding: "0px", // Fixed padding
    boxSizing: "border-box", // Include padding within width
    overflow: "hidden", // Prevent content overflow
    boxShadow: `0px 5px ${(component_config?.shadow_intensity || 0) * 2}px ${(component_config?.shadow_intensity || 0) * 1.5}px ${component_config?.shadow_color ? `${component_config?.shadow_color?.trim()}40` : "#00000000"}`,
    ...borderStyle,
    ...cornerRadiusStyle,
  };
  const nameAlign =
    name_align === "center"
      ? "justify-center"
      : name_align === "right"
        ? "justify-end"
        : "justify-start";

  const footerAlign =
    name_footer_align === "center"
      ? "justify-center"
      : name_footer_align === "right"
        ? "justify-end"
        : "justify-start";
  return (
    <div style={widthStyle}>
      {/* Wrap the image with a link generated from the utility function */}
      {isName && name_position && name_position == "top" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: name_topMargin,
            marginBottom: name_bottomMargin,
          }}
        >
          <p
            className="text-white font-bold text-center"
            style={{
              fontSize: `${font_size || 10}px`,
              color: font_color || "#ffffff",
              fontStyle: font_style === "italic" ? "italic" : "normal",
              fontWeight: font_style === "bold" ? "700" : "400",
              textDecorationLine: font_style === "underline" ? "underline" : "none",
            }}
          >
            {name}
          </p>
        </div>
      )}
      <div className="w-full" style={combinedStyle}>
        {/* Dynamically choose the image source based on the screen size */}
        {extra_attributes?.video_mobile ? (
          <div style={cornerRadiusStyle}>
            <VideoPlayer
              thumbnail={image_mobile || ""}
              url={extra_attributes?.video_mobile}
              aspectRatio={extra_attributes?.mobile_aspect_ratio || 0.56}
              radius={component_config?.corner_radius || 0}
              isPlayingVideo={isPlaying}
            />
          </div>
        ) : extra_attributes?.lottie_mobile ? (
          <LottieView
            path={extra_attributes?.lottie_mobile}
            width={`${(component_config?.width || 0.16) * (parentWidth || 100)}px`}
            height={`${(component_config?.width || 0.16) * 100 * (component_config?.aspect_ratio || 1)}%`}
          />
        ) : (
          <img
            src={size !== "lg" ? image_mobile : image_web}
            className="rounded-md object-cover w-full"
            style={combinedStyle}
          />
        )}
      </div>
      {isName && name_position && name_position == "bottom" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: name_topMargin,
            marginBottom: name_bottomMargin,
          }}
        >
          <div className="flex w-full flex-col items-center justify-between">
            <p
              className="text-white font-bold text-center"
              style={{
                fontSize: `${font_size || 10}px`,
                color: font_color || "#ffffff",
                fontStyle: font_style === "italic" ? "italic" : "normal",
                fontWeight: font_style === "bold" ? "700" : "400",
                textDecorationLine: font_style === "underline" ? "underline" : "none",
                height: `${(font_size || 10) * 2.5}px`, // Ensure text has enough height
                overflow: "hidden", // Hide overflow text
                textOverflow: "ellipsis", // Add ellipsis for overflow
              }}
            >
              {name}
            </p>
          </div>
        </div>
      )}
      {isActive && (
        <div className="flex w-full justify-center items-center">
          <div
            className="h-1.5 mt-1 mb-2 flex w-10/12 rounded-t-full"
            style={{
              backgroundColor: footer_font_color ?? "#FF5F15",
            }}
          ></div>
        </div>
      )}
      {name_footer && (
        <div className={clsx("flex w-full", footerAlign)}>
          <p
            className="font-medium text-center"
            style={{
              marginTop: footer_topMargin,
              marginBottom: footer_bottomMargin,
              fontSize: `${footer_font_size || 10}px`,
              color: footer_font_color || "#FF7733",
              fontStyle: footer_font_style === "italic" ? "italic" : "normal",
              fontWeight: footer_font_style === "bold" ? "700" : "400",
              textDecorationLine:
                footer_font_style === "underline" ? "underline" : "none",
            }}
          >
            {footer}
          </p>
        </div>
      )}
    </div>
  );
};

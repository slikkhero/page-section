import LottieView from "@/components/Cards/OrderDetail/LottieVIew";
import { ScreenSize } from "@/utils";
import { BANNER_ITEM_FRONTEND, CarouselGridConfig } from "@/utils/DataTypes";
import clsx from "clsx";
import React from "react";
import VideoPlayer from "../../SupportingComponents/VideoPlayer";

export interface GenericCardProps extends BANNER_ITEM_FRONTEND {
  component_config: CarouselGridConfig; // Config object for the component
  size: ScreenSize; // Screen size (lg, md, etc.)
  isCarousel: boolean; // Is the card part of a carousel
  isGridCarousel?: boolean;
  isPlaying?: boolean;
  isActive?: boolean;
  parentWidth?: number; // Optional parent width for responsive design
}

export const ParentCard: React.FC<GenericCardProps> = ({
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
    web_name,
    name_position,
    web_name_position,
    name_align,
    web_name_align,
    name_footer,
    web_name_footer,
    name_footer_align,
    web_name_footer_align,
    font_size,
    web_font_size,
    web_font_color,
    web_font_style,
    web_footer_font_color,
    web_footer_font_style,
    web_footer_font_size,
    web_name_bottomMargin,
    web_name_topMargin,
    web_footer_topMargin,
    web_footer_bottomMargin,
  } = component_config;
  // Dynamic width style based on component_config and carousel mode
  const widthStyle: React.CSSProperties = {
    width: isCarousel
      ? "100%"
      : isGridCarousel
        ? `calc(${(component_config.web_width || 0.16) * (parentWidth || 100)}px - ${
            component_config?.web_gap ?? 8
          }px)`
        : `${(component_config.web_width || 0.16) * (parentWidth || 100)}px`,
    marginTop: web_name_topMargin,
    marginBottom: web_name_bottomMargin,
  };
  const borderStyle: React.CSSProperties = component_config?.web_border
    ? {
        borderWidth: component_config.web_border_width || 0, // Default to 0 if not provided
        borderStyle: component_config.web_border_style || "solid",
        borderColor: component_config.web_border_color || "transparent", // Default color
      }
    : {
        borderWidth: 0, // Default to 0 if not provided
        borderStyle: "solid",
        borderColor: "transparent", // Default color
      };

  const cornerRadiusStyle: React.CSSProperties = component_config?.web_corner_radius
    ? {
        borderRadius: component_config?.web_corner_radius,
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
    web_name_align === "center"
      ? "justify-center"
      : web_name_align === "right"
        ? "justify-end"
        : "justify-start";

  const footerAlign =
    web_name_footer_align === "center"
      ? "justify-center"
      : web_name_footer_align === "right"
        ? "justify-end"
        : "justify-start";
  return (
    <div style={widthStyle}>
      {/* Wrap the image with a link generated from the utility function */}
      {web_name && web_name_position && web_name_position == "top" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: web_name_topMargin,
            marginBottom: web_name_bottomMargin,
          }}
        >
          <p
            className="text-white font-bold text-center"
            style={{ fontSize: `${web_font_size || 16}px` }}
          >
            {name}
          </p>
        </div>
      )}
      <div className="w-full" style={combinedStyle}>
        {/* Dynamically choose the image source based on the screen size */}
        {extra_attributes?.video_web ? (
          <div style={cornerRadiusStyle}>
            <VideoPlayer
              thumbnail={image_web || ""}
              url={extra_attributes?.video_web}
              aspectRatio={extra_attributes?.web_aspect_ratio || 0.56}
              radius={component_config?.web_corner_radius || 0}
              isPlayingVideo={isPlaying}
            />
          </div>
        ) : extra_attributes?.lottie_web ? (
          <LottieView
            path={extra_attributes?.lottie_web}
            width={`${(component_config?.web_width || 0.16) * (parentWidth || 100)}px`}
            height={`${(component_config?.web_width || 0.16) * 100 * (component_config?.web_aspect_ratio || 1)}%`}
          />
        ) : (
          <img
            src={size !== "lg" ? image_mobile : image_web}
            className=" object-cover w-full"
            style={combinedStyle}
          />
        )}
      </div>
      {web_name && web_name_position && web_name_position == "bottom" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: web_name_topMargin,
            marginBottom: web_name_bottomMargin,
          }}
        >
          <div className="flex w-full flex-col items-center">
            <p
              className="text-white font-bold text-center"
              style={{
                fontSize: `${web_font_size || 16}px`,
                color: web_font_color || "#ffffff",
                fontStyle: web_font_style === "italic" ? "italic" : "normal",
                fontWeight: web_font_style === "bold" ? "700" : "400",
                textDecorationLine: web_font_style === "underline" ? "underline" : "none",
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
              backgroundColor: web_footer_font_color ?? "#FF5F15",
            }}
          ></div>
        </div>
      )}
      {web_name_footer && (
        <div className={clsx("flex w-full", footerAlign)}>
          <p
            className="font-medium"
            style={{
              marginTop: web_footer_topMargin,
              marginBottom: web_footer_bottomMargin,
              fontSize: `${web_footer_font_size || 16}px`,
              color: web_footer_font_color || "#FF7733",
              fontStyle: web_footer_font_style === "italic" ? "italic" : "normal",
              fontWeight: web_footer_font_style === "bold" ? "700" : "400",
              textDecorationLine:
                web_footer_font_style === "underline" ? "underline" : "none",
            }}
          >
            {footer}
          </p>
        </div>
      )}
    </div>
  );
};

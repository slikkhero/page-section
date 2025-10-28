import { convertToFilterValues, replaceUrl } from "@/common/listing";
import LottieView from "@/components/Cards/OrderDetail/LottieVIew";
import { ScreenSize } from "@/utils";
import { BANNER_ITEM_FRONTEND, CarouselGridConfig, ExtraConfig } from "@/utils/DataTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import VideoPlayer from "../SupportingComponents/VideoPlayer";

export interface FilterCardProps extends BANNER_ITEM_FRONTEND {
  component_config: CarouselGridConfig; // Config object for the component
  size: ScreenSize; // Screen size (lg, md, etc.)
  isCarousel: boolean; // Is the card part of a carousel
  isGridCarousel?: boolean;
  isPlaying?: boolean;
  extra_info?: ExtraConfig; // Optional accent color for the card
  parentWidth?: number; // Optional parent width for responsive design
}

export const FilterCard: React.FC<FilterCardProps> = ({
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
  extra_info,
  quick_filter_tags,
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
  const router = useRouter();
  const filtersFromQuery: any = convertToFilterValues(router.query);

  const isSelected = useMemo(() => {
    return quick_filter_tags?.every((qf) => {
      const label = qf.slice(qf.lastIndexOf("_") + 1);
      const key = qf.slice(0, qf.lastIndexOf("_"));
      return filtersFromQuery[key]?.includes(label);
    });
  }, [quick_filter_tags, filtersFromQuery]);

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
        borderWidth: 0,
        borderStyle: "none",
        borderColor: "transparent",
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
  function onPress() {
    const newFilters: Record<string, string[]> = { ...filtersFromQuery };

    (quick_filter_tags ?? []).forEach((qf) => {
      const label = qf.slice(qf.lastIndexOf("_") + 1);
      const key = qf.slice(0, qf.lastIndexOf("_"));

      // Clone the current value array safely
      const currentValues = newFilters[key] ? [...newFilters[key]] : [];
      const selected = currentValues.includes(label);

      // Accurate snapshot before mutation

      if (isSelected) {
        if (selected) {
          const updatedValues = currentValues.filter((v) => v !== label);
          if (updatedValues.length > 0) {
            newFilters[key] = updatedValues;
          } else {
            delete newFilters[key];
          }
        }
      } else {
        if (!selected) {
          newFilters[key] = [...currentValues, label];
        }
      }

      // Accurate snapshot after mutation
      replaceUrl({ router, filters: newFilters });
    });
  }

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
            style={{
              fontSize: `${web_font_size || 16}px`,
              color: web_font_color || "#ffffff",
              fontStyle: web_font_style === "italic" ? "italic" : "normal",
              fontWeight: web_font_style === "bold" ? "700" : "400",
              textDecorationLine: web_font_style === "underline" ? "underline" : "none",
            }}
          >
            {name}
          </p>
        </div>
      )}
      <div
        className="w-full relative cursor-pointer"
        onClick={(e) => {
          onPress();
        }}
      >
        {/* Dynamically choose the image source based on the screen size */}
        <div
          style={{
            ...combinedStyle,
            overflow: "visible", // not "auto", hides overflow cleanly
            position: "relative",
            borderColor: isSelected
              ? extra_info?.accent_color
              : component_config?.web_border_color || "transparent",
            borderWidth: isSelected
              ? Math.max(2, component_config?.web_border_width || 0)
              : component_config?.web_border_width || 0,
          }}
        >
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
            <div>
              <img
                src={size !== "lg" ? image_mobile : image_web}
                className="object-cover w-full h-full"
                style={cornerRadiusStyle}
              />
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    bottom: `5%`,
                    right: `5%`,
                    background: "white",
                    borderRadius: "9999px",
                    width: `20%`,
                  }}
                >
                  <FaCheckCircle size={"100%"} color={extra_info?.accent_color} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {web_name && web_name_position && web_name_position == "bottom" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: web_name_topMargin,
            marginBottom: web_name_bottomMargin,
          }}
        >
          <p
            className="text-white font-bold text-center"
            style={{
              fontSize: `${web_font_size || 16}px`,
              color: web_font_color || "#ffffff",
              fontStyle: web_font_style === "italic" ? "italic" : "normal",
              fontWeight: web_font_style === "bold" ? "700" : "400",
              textDecorationLine: web_font_style === "underline" ? "underline" : "none",
            }}
          >
            {name}
          </p>
        </div>
      )}
      {web_name_footer && (
        <div className={clsx("flex w-full", footerAlign)}>
          <p
            className="text-[#FF7733] font-medium"
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

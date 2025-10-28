import { convertToFilterValues, replaceUrl } from "@/common/listing";
import LottieView from "@/components/Cards/OrderDetail/LottieVIew";
import { ScreenSize } from "@/utils";
import { BANNER_ITEM_FRONTEND, CarouselGridConfig, ExtraConfig } from "@/utils/DataTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import VideoPlayer from "../../SupportingComponents/VideoPlayer";

export interface FilterCardProps extends BANNER_ITEM_FRONTEND {
  component_config: CarouselGridConfig; // Config object for the component
  size: ScreenSize; // Screen size (lg, md, etc.)
  isCarousel: boolean; // Is the card part of a carousel
  isGridCarousel?: boolean;
  isPlaying?: boolean;
  extra_info?: ExtraConfig;
  parentWidth?: number; // Optional parent width for responsive design
}

export const FilterCardMobile: React.FC<FilterCardProps> = ({
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
        ? `calc(${(component_config.width || 0.4) * (parentWidth || 100)}px - ${
            component_config?.gap || 4
          }px)`
        : `${(component_config.width || 0.4) * (parentWidth || 100)}px`,
    marginTop: name_topMargin,
    marginBottom: name_bottomMargin,
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

    });
  }

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
              : component_config?.border_color || "transparent",
            borderWidth: isSelected
              ? Math.max(2, component_config?.border_width || 0)
              : component_config?.border_width || 0,
          }}
        >
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
              width={`${(component_config?.width || 0.4) * (parentWidth || 100)}px`}
              height={`${(component_config?.width || 0.4) * 100 * (component_config?.aspect_ratio || 1)}%`}
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
      {isName && name_position && name_position == "bottom" && (
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
      {name_footer && (
        <div className={clsx("flex w-full", footerAlign)}>
          <p
            className="text-[#FF7733] font-medium"
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

import { CarouselGridConfig, REELSDATA, ScreenSize } from "@/utils";
import clsx from "clsx";
import playIcon from "../../../../assets/looks/playIcon.png";
import reelIcon from "../../../../assets/looks/reelIcon.png";
import stackImgIcon from "../../../../assets/looks/stackImgIcon.png";
import likeIcon from "../../../../assets/svg/wishlist.svg";

export interface ReelCardProps extends REELSDATA {
  component_config: CarouselGridConfig; // Config object for the component
  isCarousel: boolean; // Is the card part of a carousel
  size: ScreenSize;
  parentWidth?: number; // Optional parent width for responsive design
}
export const GenericReelsTile = (reel: ReelCardProps) => {
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
    web_name_bottomMargin,
    web_name_topMargin,
    web_footer_topMargin,
    web_footer_bottomMargin,
    web_footer_font_color,
    web_footer_font_style,
    web_footer_font_size,
  } = reel.component_config;
  const calcWidth = (reel.component_config?.web_width || 0.16) * 100;
  const widthStyle: React.CSSProperties = {
    width: reel.isCarousel
      ? "100%"
      : `${(reel.component_config.web_width || 0.16) * (reel.parentWidth || 100)}px`,
    boxShadow: `0px 5px ${(reel.component_config?.shadow_intensity || 0) * 2}px ${(reel.component_config?.shadow_intensity || 0) * 1.5}px ${reel.component_config?.shadow_color ? `${reel.component_config?.shadow_color?.trim()}40` : "#00000000"}`,

    // aspectRatio: 0.5,
  };
  const borderStyle: React.CSSProperties = reel.component_config?.web_border
    ? {
        borderWidth: reel.component_config.web_border_width || 0, // Default to 0 if not provided
        borderStyle: reel.component_config.web_border_style || "solid",
        borderColor: reel.component_config.web_border_color || "transparent", // Default color
      }
    : {
        borderWidth: 0, // Default to 0 if not provided
        borderStyle: "solid",
        borderColor: "transparent", // Default color
      };

  const cornerRadiusStyle: React.CSSProperties =
    reel.component_config?.web_corner_radius ||
    reel.component_config?.web_corner_radius == 0
      ? {
          borderRadius: reel.component_config?.web_corner_radius,
        }
      : { borderRadius: `${calcWidth / 20}%` };

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    padding: "0px", // Fixed padding
    boxSizing: "border-box", // Include padding within width
    overflow: "hidden", // Prevent content overflow
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

  let url = "looks/" + reel.creator.handle + "/" + reel.post_id;
  if (reel?.filter_id) {
    url += "&filter_id=" + reel?.filter_id;
  }
  return (
    <div style={widthStyle}>
      {web_name && web_name_position && web_name_position == "top" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: web_name_topMargin,
            marginBottom: web_name_bottomMargin,
          }}
        >
          <p>{reel.name}</p>
        </div>
      )}
      <a href={url} className=" relative" style={combinedStyle}>
        <img
          src={reel.thumbnail_url}
          className=" w-full object-cover "
          style={{
            aspectRatio: 0.567,
            borderRadius: reel.component_config?.web_corner_radius || 0,
          }}
        />
        <div
          className="right-3 top-3 absolute bg-black bg-opacity-20 rounded-full"
          style={{
            paddingLeft: `${calcWidth / 50}%`,
            paddingRight: `${calcWidth / 50}%`,
            paddingTop: `${calcWidth / 40}%`,
            paddingBottom: `${calcWidth / 40}%`,
          }}
        >
          {reel.type == "video" && (
            <img src={reelIcon.src} style={{ width: `${calcWidth / 10}%` }} />
          )}
          {reel.type == "image" && (
            <img src={stackImgIcon.src} style={{ width: `${calcWidth / 10}%` }} />
          )}
        </div>

        <div
          className="absolute bottom-2 left-2 flex flex-row items-center space-x-[2px] text-primaryWhite bg-black bg-opacity-20 rounded-xl"
          style={{
            paddingLeft: `${calcWidth / 25}%`,
            paddingRight: `${calcWidth / 25}%`,
            paddingTop: `${calcWidth / 60}%`,
            paddingBottom: `${calcWidth / 60}%`,
          }}
        >
          <img src={playIcon.src} style={{ width: `${calcWidth / 10}%` }} />
          <span
            className="text-white"
            style={{
              fontSize: `${calcWidth / 15}%`,
            }}
          >
            {reel.views_count.toLocaleString()}
          </span>
        </div>
        <div
          className="absolute bottom-2 right-2 flex flex-row items-center space-x-[2px] text-primaryWhite bg-black bg-opacity-20 rounded-xl"
          style={{
            paddingLeft: `${calcWidth / 25}%`,
            paddingRight: `${calcWidth / 25}%`,
            paddingTop: `${calcWidth / 60}%`,
            paddingBottom: `${calcWidth / 60}%`,
          }}
        >
          <span className="text-white" style={{ fontSize: `${calcWidth / 15}%` }}>
            {reel.likes_count.toLocaleString()}
          </span>
          <img src={likeIcon.src} style={{ width: `${calcWidth / 10}%` }} />
        </div>
      </a>
      {web_name && web_name_position && web_name_position == "bottom" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: web_name_topMargin,
            marginBottom: web_name_bottomMargin,
          }}
        >
          <p>{reel.name}</p>
        </div>
      )}
      {web_name_footer && (
        <div
          className={clsx("flex w-full", footerAlign)}
          style={{
            marginTop: web_footer_topMargin,
            marginBottom: web_footer_bottomMargin,
            color: web_footer_font_color || "#FF7733",
            fontSize: web_footer_font_size || "13px",
            fontStyle: web_footer_font_style === "italic" ? "italic" : "normal",
            fontWeight: web_footer_font_style === "bold" ? "700" : "400",
            textDecorationLine:
              web_footer_font_style === "underline" ? "underline" : "none",
          }}
        >
          <p>{reel.caption}</p>
        </div>
      )}
    </div>
  );
};

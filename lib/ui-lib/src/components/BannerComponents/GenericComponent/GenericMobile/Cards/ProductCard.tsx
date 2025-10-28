import lock from "@/assets/general/Lock.svg";
import soldOutIcon from "@/assets/general/soldOut.svg";
import ImageWithFallback from "@/components/Others/ImageWithFallback";
import { LlInfoData } from "@/redux/types";
import { CarouselGridConfig } from "@/utils";
import { fieldsToPDPPage } from "@/utils/products";
import { SingleProductProps } from "@/utils/types";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";

export interface ProductCardProps extends SingleProductProps {
  component_config: CarouselGridConfig; // Config object for the component
  isCarousel: boolean; // Is the card part of a carousel
  parentWidth?: number; // Optional parent width for responsive design
  llInfoData?: LlInfoData;
}
export const GenericProductCardMobile = (props: ProductCardProps) => {
  const {
    size,
    type,
    barcode,
    skid,
    mrp,
    sp,
    name,
    footer,
    category,
    sub_category,
    product_type,
    brand,
    product_feedback,
    is_wish_listed,
    inventory_count,
    is_locked,
    gst_benefits,
    llinfo,
    llInfoData,
    is_try_and_buy,
    image,
    heartOnClick = (product, h: any, setH: any) => {},
    component_config,
    isCarousel,
    parentWidth,
  } = props;

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
    name_bottomMargin,
    name_topMargin,
    footer_font_size,
    footer_topMargin,
    footer_bottomMargin,
    footer_font_color,
    footer_font_style,
  } = component_config;

  const discount = Math.round(
    ((parseFloat(mrp) - parseFloat(sp)) / parseFloat(mrp)) * 100
  );

  const [heartClicked, setHeartClicked] = useState(is_wish_listed);

  const handleHeartClick = () => {
    heartOnClick(props, heartClicked, setHeartClicked);
  };

  const calcWidth = (component_config?.width || 0.4) * 100;
  const widthStyle: React.CSSProperties = {
    width: isCarousel
      ? "100%"
      : `${(component_config?.width || 0.4) * (parentWidth || 100)}px`, // Use full width in carousel mode
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

  const cornerRadiusStyle: React.CSSProperties =
    component_config?.corner_radius || component_config?.corner_radius == 0
      ? {
          borderRadius: component_config?.corner_radius,
        }
      : { borderRadius: `${calcWidth / 20}%` };

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    padding: "0px", // Fixed padding
    boxSizing: "border-box", // Include padding within width
    overflow: "hidden", // Prevent content overflow
    ...borderStyle,
    aspectRatio: 0.5,
    ...(component_config.grid ? widthStyle : {}),
    boxShadow: `0px 5px ${(component_config?.shadow_intensity || 0) * 2}px ${(component_config?.shadow_intensity || 0) * 1.5}px ${component_config?.shadow_color ? `${component_config?.shadow_color?.trim()}40` : "#00000000"}`,
    // ...widthStyle,
    // ...cornerRadiusStyle,
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
    <div
      className={`flex flex-col h-fit ${inventory_count == 0 ? "opacity-80" : ""}`}
      style={combinedStyle}
    >
      {isName && name_position && name_position == "top" && (
        <div
          className={clsx("flex w-full h-12", nameAlign)}
          style={{
            marginTop: name_topMargin,
            marginBottom: name_bottomMargin,
          }}
        >
          <p>{name}</p>
        </div>
      )}
      <a
        href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}
        className={`relative bg-transparent flex  h-[75%]  ${ImageVariants({
          type,
        })}`}
        // style={widthStyle}
      >
        <ImageWithFallback
          src={image}
          loading="lazy"
          className={`  object-cover object-top  h-full w-full  border border-[#D7D7D7]`}
          style={cornerRadiusStyle}
        />
        {is_locked ? (
          <div className="absolute left-0 top-0 m-1 rounded-full bg-[#6F6F6F]/30 w-[15%] aspect-square flex justify-center items-center">
            <img
              src={lock.src}
              className="w-[70%] h-[70%] object-contain" // Ensures the image takes 70% of the container
              alt="Lock"
            />
          </div>
        ) : null}
        {/* <div
          className=" absolute top-0 z-0 left-2 flex justify-center items-center"
          style={{
            width: `${calcWidth / 1.5}%`,
          }}
        >
          {!!discount && inventory_count != 0 && (
            <div className=" flex flex-col max-w-14 w-full pt-2 justify-center items-center font-semibold z-10 text-white">
              <span
                className=""
                style={{
                  lineHeight: 1,
                  fontSize: `${calcWidth * 2}%`,
                }}
              >
                {discount}%
              </span>
              <span
                className=" uppercase"
                style={{
                  fontSize: `${calcWidth * 2}%`,
                }}
              >
                Off
              </span>
            </div>
          )}
          {!!discount && inventory_count != 0 && (
            <div className="absolute top-0 left-0 flex h-full w-full items-start">
              <img className="w-full" src={offerWave.src} />
            </div>
          )}
        </div> */}
        {inventory_count == 0 && (
          <div className=" absolute top-0 w-full flex items-center justify-center">
            <img src={soldOutIcon.src} />
          </div>
        )}
        {product_feedback?.length == 1 && product_feedback[0].rating && (
          <div
            className=" rounded-full flex flex-row justify-between divide-x-2 absolute left-3 bottom-5 pr-1 py-1 bg-white shadow-xl border drop-shadow-xl"
            style={{ fontSize: `${calcWidth * 0.25}px` }}
          >
            <div className=" px-1 font-semibold flex flex-row items-center space-x-1">
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.740222 4.45897L3.97355 4.15232L5.26022 1.17234C5.41355 0.812344 5.92022 0.812344 6.08022 1.17234L7.36689 4.15232L10.6002 4.45229C10.9869 4.48563 11.1469 4.9724 10.8536 5.2324L8.41356 7.37905L9.12689 10.5457C9.21356 10.9257 8.80022 11.2257 8.46689 11.0257L5.67356 9.37238L2.88022 11.0324C2.54689 11.2324 2.13356 10.9324 2.22022 10.5524L2.93356 7.38572L0.493553 5.23908C0.20022 4.97908 0.360223 4.49897 0.74689 4.45897H0.740222Z"
                  fill="#0A090A"
                />
              </svg>
              <span>{product_feedback[0].rating}</span>
            </div>
            <span className=" px-1">{product_feedback[0].rating_count}</span>
          </div>
        )}
      </a>
      <div
        className={`flex flex-row justify-between items-start w-full h-[25%] pt-2 ${TextVariants({ type })}`}
        style={{
          color: footer_font_color || "white",
          fontSize: footer_font_size || `${calcWidth * 0.25}px`,
          fontStyle: footer_font_style === "italic" ? "italic" : "normal",
          fontWeight: footer_font_style === "bold" ? "700" : "400",
          textDecorationLine: footer_font_style === "underline" ? "underline" : "none",
        }}
      >
        <div className=" flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <a
              href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}
              style={{
                color: footer_font_color || "",
                fontSize: footer_font_size || `${calcWidth * 0.25}px`,
                fontStyle: footer_font_style === "italic" ? "italic" : "normal",
                fontWeight: footer_font_style === "bold" ? "700" : "400",
                textDecorationLine:
                  footer_font_style === "underline" ? "underline" : "none",
              }}
            >
              <span
                className={`line-clamp-1 ${TextVariants({
                  type,
                })} font-semibold uppercase`}
              >
                {brand}
              </span>
            </a>
            {/* <img src={heartClicked ? redHeart : type == "dark" ? lightHeartIcon : heartIcon} className=" w-5" onClick={handleHeartClick} /> */}
          </div>
          <a href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}>
            <span
              className="line-clamp-1 whitespace-break-spaces capitalize  truncate"
              style={{
                // marginTop: `${calcWidth / 40}%`
                opacity: 0.9,
                marginBottom: `${calcWidth / 40}%`,
                fontSize: `${calcWidth * 0.25}px`,
              }}
            >
              {name}
            </span>
          </a>
          {llinfo || gst_benefits ? (
            <span
              className=" rounded-sm font-semibold text-xs py-[2px] px-1 w-fit mt-1 capitalize overflow-hidden max-w-full"
              style={{
                background: `linear-gradient(to right, ${llInfoData?.bg_color || "#a2354b"})`,
                color: llInfoData?.text_color || "#FFFFFF",
              }}
            >
              {llinfo || (gst_benefits ? "GST Benefits Included" : "")}
            </span>
          ) : null}
          <div className=" flex flex-row items-center justify-between  w-full">
            <div
              className="flex flex-row items-center justify-center"
              style={{
                fontSize: `${calcWidth * 0.3}px`,
                gap: `${calcWidth / 10}%`,
              }}
            >
              {discount > 0 && (
                <span
                  className=" text-opacity-40 line-through "
                  style={{
                    opacity: 0.6,
                  }}
                >
                  ₹{Math.round(parseInt(mrp))}
                </span>
              )}
              <span
                style={{
                  opacity: 0.9,
                }}
                className="font-semibold"
              >
                ₹{Math.round(parseInt(sp))}
              </span>
              {discount > 0 && (
                <div className="relative inline-block">
                  {/* SVG background */}
                  <img
                    src="/media/svg/percentageBg.svg"
                    alt=""
                    className="block h-auto"
                    style={{
                      width: `${calcWidth * 1.75}px`,
                    }}
                  />
                  {/* Overlay text */}
                  <div
                    className="absolute inset-0 flex items-center justify-start"
                    style={{ fontSize: `${calcWidth * 0.25}px` }}
                  >
                    <span className="leading-3 text-[#47802B] font-bold mr-1">
                      {discount}%
                    </span>
                    <span className="uppercase text-[#47802B] font-bold">Off</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-fit"></div>
      </div>
      {isName && name_position && name_position == "bottom" && (
        <div
          className={clsx("flex w-full", nameAlign)}
          style={{
            marginTop: name_topMargin,
            marginBottom: name_bottomMargin,
          }}
        >
          <p>{name}</p>
        </div>
      )}
      {name_footer && (
        <div
          className={clsx("flex w-full", footerAlign)}
          style={{
            marginTop: footer_topMargin,
            marginBottom: footer_bottomMargin,
          }}
        >
          <p>{footer}</p>
        </div>
      )}
    </div>
  );
};

const SizeVariants = cva("w-full", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
});

const ImageVariants = cva("", {
  variants: {
    size: {
      sm: "w-full h-[200px]",
      md: "w-full h-[250px]",
      lg: "w-full h-[300px]",
    },
    type: {
      dark: "border-none",
      light: "border",
    },
  },
});

const TextVariants = cva("", {
  variants: {
    type: {
      light: "",
      dark: "",
    },
  },
  defaultVariants: {
    type: "dark",
  },
});

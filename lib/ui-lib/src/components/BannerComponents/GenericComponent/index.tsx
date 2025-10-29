import LottieView from "@/components/Cards/OrderDetail/LottieVIew";
import { BrandData, ProductCardData, sectionHeadingURLFn } from "@/utils";
import {
  BackgroundConfig,
  BANNER_ITEM_FRONTEND,
  CarouselGridConfig,
  CATEGORIES,
  CtaConfigProps,
  POSITION_ITEM_FRONTEND,
  REELSDATA,
} from "@/utils/DataTypes";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { JSX, useEffect, useRef, useState } from "react";
import { coalesce } from "../../../lib/utils";
import CtaBtn from "../NestedComponent/ctaBtn";
import { NestedCarousel } from "../NestedComponent/NestedCarousel";
import { NestedCarouselMobile } from "../NestedComponent/NestedCarouselMobile";
import CountdownTimer from "../SupportingComponents/CountdownTimer";
import { Footer } from "../SupportingComponents/FooterComp";
import GeneralVideoPlayer from "../SupportingComponents/GeneralVideoPlayer";
import { HeaderWithSubHeader } from "../SupportingComponents/HeaderComp";
import { BrandCardProps, GenericBrandCard } from "./Cards/BrandCard";
import { CategoryCard, CategoryCardProps } from "./Cards/CategoryCard";
import { ParentCard } from "./Cards/ParentCard";
import { GenericProductCard, ProductCardProps } from "./Cards/ProductCard";
import { GenericReelsTile, ReelCardProps } from "./Cards/ReelTile";
import { FilterCard } from "./FilterCard";
import { GenericCard, GenericCardProps } from "./GenericCard";
import { GenericCarousel } from "./GenericCarousel";
import { GenericBrandCardMobile } from "./GenericMobile/Cards/BrandCard";
import { CategoryCardMobile } from "./GenericMobile/Cards/CategoryCard";
import { ParentCardMobile } from "./GenericMobile/Cards/ParentCard";
import { GenericProductCardMobile } from "./GenericMobile/Cards/ProductCard";
import { GenericReelsTileMobile } from "./GenericMobile/Cards/ReelTile";
import { FilterCardMobile } from "./GenericMobile/FilterCardMobile";
import { GenericCardMobile } from "./GenericMobile/GenericCardMobile";
import { GenericCarouselMobile } from "./GenericMobile/GenericCarouselMobile";
import { GridCarouselMobile } from "./GenericMobile/GridCarouselMobile";
import { GridComponentMobile } from "./GenericMobile/GridComponentMobile";
import { GridCarousel } from "./GridCarousel";
import GridComponent from "./GridComponent";

export const GenericComponent = ({
  component_config,
  header_config,
  sub_header_config,
  footer_config,
  size,
  data,
  data_type,
  background_image,
  heartOnClick,
  position,
  section_filters,
  is_section_clickable,
  background_config,
  extra_info,
  parentWidth,
  ...rest
}: POSITION_ITEM_FRONTEND) => {
  const {
    cta_config,
    child_component_config = {},
  }: { cta_config?: CtaConfigProps; child_component_config?: CarouselGridConfig } =
    extra_info || {};
  const sectionRef = useRef<HTMLDivElement>(null);
  const [childData, setChildData] = useState<any[]>([]);
  const llInfoData = {}
  const [selectedCategory, setSelectedCategory] = useState<{
    name?: string;
    id?: string;
  }>();
  // useEffect(() => {
  //   if (!sectionRef.current) return;

  //   const observer = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       const width = entry.contentRect.width;
  //       if (width > 0) setParentWidth(width);
  //     }
  //   });

  //   observer.observe(sectionRef.current);

  //   return () => observer.disconnect();
  // }, []);
  useEffect(() => {
    if (extra_info?.child_data_type && selectedCategory?.id) {
      if (extra_info?.child_data_type === "products") {
        handleChildCategoryData({ isProduct: true, id: selectedCategory?.id });
      } else if (extra_info?.child_data_type === "banner") {
        handleChildCategoryData({ isProduct: false, id: selectedCategory?.id });
      }
    }
  }, [selectedCategory?.id]);
  const handleChildCategoryData = async ({
    isProduct,
    id,
  }: {
    isProduct: boolean;
    id: any;
  }) => {
    try {
      if (isProduct) {
        const res = await fetch(
          `https://api.slikk.club/search/product?page_size=${extra_info?.page_size || 10}&p=1&filters=no&banner_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log('abcd x 0', data);

        setChildData(data?.results || []);
      } else {
        const res = await fetch(
          `https://api.slikk.club//banners?banner_id=${selectedCategory?.id}&view=page`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log('abcd x', data);
        setChildData(data?.data?.child_banners || []);
      }
    } catch (error) {

    }

  };

  // Function to map data to props for GenericCard
  const mapDataToGenericCardProps = (
    data: BANNER_ITEM_FRONTEND
  ): GenericCardProps & { parentWidth: number } => ({
    ...data, // Spread the data fields directly
    component_config: component_config || {}, // Pass the component configuration
    isCarousel: true, // If this should behave as a carousel
    parentWidth: parentWidth,
  });
  const mapDataToCategoryCardProps = (
    data: CATEGORIES
  ): CategoryCardProps & { parentWidth: number } => ({
    ...data, // Spread the data fields directly
    component_config: component_config || {}, // Pass the component configuration
    isCarousel: true, // If this should behave as a carousel
    size: size,
    parentWidth: parentWidth,
  });
  const mapDataToBrandCardProps = (
    data: BrandData
  ): BrandCardProps & { parentWidth: number } => ({
    data: data, // Spread the data fields directly
    component_config: component_config || {}, // Pass the component configuration
    isCarousel: true, // If this should behave as a carousel
    size: size,
    parentWidth: parentWidth,
  });
  const mapDataToReelCardProps = (
    data: REELSDATA
  ): ReelCardProps & { parentWidth: number } => ({
    ...data, // Spread the data fields directly
    component_config: component_config || {}, // Pass the component configuration
    isCarousel: true, // If this should behave as a carousel
    size: size,
    parentWidth: parentWidth,
  });
  const mapDataToProductCardProps = (
    data: ProductCardData
  ): ProductCardProps & { parentWidth: number } => ({
    ...data, // Spread the data fields directly
    component_config: component_config || {}, // Pass the component configuration
    isCarousel: true, // If this should behave as a carousel
    size: size,
    type: "dark",
    heartOnClick: heartOnClick,
    parentWidth: parentWidth,
  });
  const background_imageUrl =
    size == "lg"
      ? background_config?.background_image
      : background_config?.mobile_background_image; // example value
  const isMobile = size !== "lg";
  const hasInside = isMobile
    ? extra_info?.elements_inside
    : extra_info?.web_elements_inside;

  const positions = isMobile
    ? {
      left: hasInside ? coalesce(component_config?.section_leftPadding, 0) : 0,
      right: hasInside ? coalesce(component_config?.section_rightPadding, 0) : 0,
      bottom: hasInside ? coalesce(component_config?.section_bottomPadding, 0) : 0,
    }
    : {
      left: hasInside ? coalesce(component_config?.web_section_leftPadding, 0) : 0,
      right: hasInside ? coalesce(component_config?.web_section_rightPadding, 0) : 0,
      bottom: hasInside ? coalesce(component_config?.web_section_bottomPadding, 0) : 0,
    };
  const content_padding = isMobile
    ? {
      paddingTop: extra_info?.content_topPadding || 0,
      paddingLeft: extra_info?.content_leftPadding || 0,
      paddingRight: extra_info?.content_rightPadding || 0,
      paddingBottom: extra_info?.content_bottomPadding || 0,
    }
    : {
      paddingTop: extra_info?.web_content_topPadding || 0,
      paddingLeft: extra_info?.web_content_leftPadding || 0,
      paddingRight: extra_info?.web_content_rightPadding || 0,
      paddingBottom: extra_info?.web_content_bottomPadding || 0,
    };
  function getComp({
    isGrid,
    isWeb,
    isCarousel,
    data,
    data_type,
    component_config,
  }: {
    isGrid: boolean;
    isCarousel: boolean;
    isWeb: boolean;
    data: any;
    data_type: any;
    component_config: CarouselGridConfig;
  }) {
    if (isWeb) {
      if (isGrid) {
        if (isCarousel) {
          return (
            <GridCarousel<BANNER_ITEM_FRONTEND, GenericCardProps>
              component_config={component_config}
              size={size}
              data={data}
              data_type={data_type}
              RenderCard={GenericCard}
              renderCardProps={mapDataToGenericCardProps}
            />
          );
        } else {
          return (
            <GridComponent<BANNER_ITEM_FRONTEND, GenericCardProps>
              component_config={component_config}
              size={size}
              data={data}
              data_type={data_type}
              RenderComponent={GenericCard}
              renderComponentProps={mapDataToGenericCardProps}
            />
          );
        }
        // return <GridComponent component_config={component_config} position={position} size={size} data={data} data_type={data_type} heartOnClick={heartOnClick} {...rest} />
      } else {
        return (
          <GenericCarousel<BANNER_ITEM_FRONTEND, GenericCardProps>
            data={data} // Pass the data
            component_config={component_config} // Configuration for the carousel
            size={size} // Screen size
            RenderCard={extra_info?.is_product_filter ? FilterCard : GenericCard} // The card to render
            extra_info={extra_info || {}}
            renderCardProps={mapDataToGenericCardProps} // Function to map each data item to props
            parentWidth={parentWidth} // Pass the parent width for responsive design
          />
        );
        // return <GenericCarousel component_config={component_config} position={position} size={size} data={data} data_type={data_type} heartOnClick={heartOnClick} {...rest} />
      }
    } else {
      if (isGrid) {
        if (isCarousel) {
          return (
            <GridCarouselMobile<BANNER_ITEM_FRONTEND, GenericCardProps>
              component_config={component_config}
              size={size}
              data={data}
              RenderCard={GenericCardMobile}
              renderCardProps={mapDataToGenericCardProps}
            />
          );
        } else {
          return (
            <GridComponentMobile<BANNER_ITEM_FRONTEND, GenericCardProps>
              component_config={component_config}
              size={size}
              data={data}
              RenderComponent={GenericCardMobile}
              renderComponentProps={mapDataToGenericCardProps}
            />
          );
        }
      } else {
        return (
          <GenericCarouselMobile<BANNER_ITEM_FRONTEND, GenericCardProps>
            data={data} // Pass the data
            component_config={component_config} // Configuration for the carousel
            size={size} // Screen size
            RenderCard={
              extra_info?.is_product_filter ? FilterCardMobile : GenericCardMobile
            } // The card to render
            extra_info={extra_info || {}}
            renderCardProps={mapDataToGenericCardProps} // Function to map each data item to props
            parentWidth={parentWidth} // Pass the parent width for responsive design
          />
        );
      }
    }
  }
  function getBackgroundDirection(
    position?:
      | "center"
      | "left"
      | "right"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "top"
      | "bottom"
      | null
  ): "row" | "row-reverse" | "column" | "column-reverse" {
    switch (position) {
      case "top":
        return "column";
      case "bottom":
        return "column-reverse";
      case "left":
        return "row";
      case "right":
        return "row-reverse";
      default:
        return "column";
    }
  }
  function getLayout(render: JSX.Element) {
    if (size == "lg") {
      return getPosition({
        position: background_config?.desktop_position || "top",
        width: background_config?.web_width || 1,
        render: render,
        videoUrl: background_config?.background_video || "",
        radius: background_config?.web_corner_radius || 0,
        lottie: background_config?.background_lottie || "",
        aspectRatio: background_config?.background_image_aspect_ratio || 1,
        elements_inside: extra_info?.web_elements_inside || false,
      });
    } else {
      return getPosition({
        position: background_config?.mobile_position || "top",
        width: background_config?.mobile_width || 1,
        render: render,
        videoUrl: background_config?.mobile_background_video || "",
        radius: background_config?.corner_radius || 0,
        lottie: background_config?.mobile_background_lottie || "",
        aspectRatio: background_config?.background_image_aspect_ratio || 1,
        elements_inside: extra_info?.elements_inside || false,
      });
    }
  }
  function getPosition({
    position,
    width,
    render,
    videoUrl,
    radius,
    lottie,
    aspectRatio,
    elements_inside,
  }: {
    position:
    | "center"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "bottom"
    | null;
    width: number;
    render: JSX.Element;
    videoUrl: string;
    radius: number;
    lottie: string;
    aspectRatio: number;
    elements_inside?: boolean;
  }) {
    return (
      <div
        className={clsx(
          "flex overflow-hidden"
          // getBackgroundClasses(background_config || undefined)
        )}
        style={{
          flexDirection: getBackgroundDirection(position || "top"),
        }}
        ref={sectionRef}
      >
        <div
          style={{
            width: `${width * 100}%`,
            paddingTop:
              size == "lg"
                ? background_config?.web_background_topMargin || 0
                : background_config?.background_topMargin || 0,
            paddingBottom:
              size == "lg"
                ? background_config?.web_background_bottomMargin || 0
                : background_config?.background_bottomMargin || 0,
            paddingLeft:
              size == "lg"
                ? background_config?.web_background_leftMargin || 0
                : background_config?.background_leftMargin || 0,
            paddingRight:
              size == "lg"
                ? background_config?.web_background_rightMargin || 0
                : background_config?.background_rightMargin || 0,
            alignSelf: "center",
          }}
        >
          {background_config?.is_background_video
            ? videoUrl && (
              <GeneralVideoPlayer
                url={videoUrl}
                thumbnail={background_imageUrl || ""}
                aspectRatio={aspectRatio}
                radius={radius}
              />
            )
            : background_config?.is_background_lottie
              ? lottie && (
                <div className="flex justify-center items-start w-full">
                  <LottieView
                    path={lottie}
                    width={`${width * 100}%`}
                    height={`${width * 100 * aspectRatio}%`}
                  />
                </div>
              )
              : background_imageUrl && (
                <img
                  src={background_imageUrl || ""}
                  alt=""
                  className="object-contain self-end w-full max-w-full overflow-hidden"
                  style={{
                    borderRadius: radius,
                    width: "100%",
                  }}
                />
              )}
        </div>
        {extra_info?.timeout && new Date(extra_info.timeout).getTime() > Date.now() && (
          <CountdownTimer config={extra_info} size={size} />
        )}
        <div
          className={`justify-center items-center flex-1 overflow-hidden ${elements_inside ? "absolute bottom-0 w-full" : ""}`}
          style={{
            ...positions,
            ...content_padding,
          }}
        >
          {render}
        </div>
      </div>
    );
    // switch (position) {
    //   case "top":
    //     return (
    //       <div className="flex flex-col">
    //         <div
    //           style={{
    //             marginTop: `${background_config?.background_topMargin || 0}px`,
    //             marginBottom: `${
    //               background_config?.background_bottomMargin || 0
    //             }px`,
    //           }}
    //         >
    //           <img
    //             src={background_imageUrl || ""}
    //             width={`${width * 100}%`}
    //             alt=""
    //           />
    //         </div>
    //         <div className="justify-center items-center flex">{render}</div>
    //       </div>
    //     );
    //   case "left":
    //     return (
    //       <div className="flex w-full">
    //         <div
    //           className={clsx("flex", isGrid ? "items-center" : "items-end")}
    //           style={{ width: `${width * 100}%` }}
    //         >
    //           <img src={background_imageUrl || ""} width="100%" alt="" />
    //         </div>
    //         <div
    //           className="overflow-hidden justify-center items-center flex"
    //           style={{ width: `${100 - width * 100}%` }}
    //         >
    //           {render}
    //         </div>
    //       </div>
    //     );
    //   case "right":
    //     return (
    //       <div className="flex w-full">
    //         <div
    //           className="overflow-hidden justify-center items-center flex"
    //           style={{ width: `${100 - width * 100}%` }}
    //         >
    //           {render}
    //         </div>
    //         <div
    //           className={clsx("flex", isGrid ? "items-center" : "items-end")}
    //           style={{ width: `${width * 100}%` }}
    //         >
    //           <img src={background_imageUrl || ""} width="100%" alt="" />
    //         </div>
    //       </div>
    //     );

    //   default:
    //     return (
    //       <div className="flex flex-col">
    //         <div>
    //           <img
    //             src={background_imageUrl || ""}
    //             width={`${width * 100}%`}
    //             alt=""
    //           />
    //         </div>
    //         <div>{render}</div>
    //       </div>
    //     );
    // }
  }
  function getRenderElement({
    isGrid,
    isWeb,
    isCarousel,
    data,
    data_type,
    component_config,
  }: {
    isGrid: boolean;
    isCarousel: boolean;
    isWeb: boolean;
    data: any;
    data_type: any;
    component_config: CarouselGridConfig;
  }) {
    if (!data_type) return null;

    switch (data_type.type) {
      case "spotlight":
      case "searches":
      case "purchases":
      case "wishlist":
      case "products":
        if (isWeb) {
          return !isGrid ? (
            <GenericCarousel<ProductCardData, ProductCardProps>
              data={data}
              component_config={component_config}
              heartOnClick={heartOnClick}
              size={size}
              data_type={data_type}
              RenderCard={GenericProductCard}
              renderCardProps={mapDataToProductCardProps}
              llInfoData={llInfoData}
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponent<ProductCardData, ProductCardProps>
              RenderComponent={GenericProductCard}
              component_config={component_config}
              size={size}
              data={data}
              data_type={data_type}
              llInfoData={llInfoData}
              renderComponentProps={mapDataToProductCardProps}
            />
          );
        } else {
          return !isGrid ? (
            <GenericCarouselMobile<ProductCardData, ProductCardProps>
              data={data}
              component_config={component_config}
              size={size}
              data_type={data_type}
              RenderCard={GenericProductCardMobile}
              llInfoData={llInfoData}
              renderCardProps={mapDataToProductCardProps}
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponentMobile<ProductCardData, ProductCardProps>
              RenderComponent={GenericProductCardMobile}
              component_config={component_config}
              data_type={data_type}
              size={size}
              data={data}
              llInfoData={llInfoData}
              renderComponentProps={mapDataToProductCardProps}
            />
          );
        }

      case "banner":
        return getComp({
          isCarousel: isCarousel,
          isGrid: isGrid,
          isWeb: isWeb,
          data: data,
          data_type: data_type,
          component_config: component_config,
        });
      case "categories":
        if (isWeb) {
          return !isGrid ? (
            <GenericCarousel<CATEGORIES, CategoryCardProps>
              data={data} // Pass the data
              component_config={component_config} // Configuration for the carousel
              size={size}
              data_type={data_type}
              RenderCard={CategoryCard} // The card to render
              renderCardProps={mapDataToCategoryCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponent<CATEGORIES, CategoryCardProps>
              RenderComponent={CategoryCard}
              component_config={component_config}
              data_type={data_type}
              size={size}
              data={data}
              renderComponentProps={mapDataToCategoryCardProps}
            />
          );
        } else {
          return !isGrid ? (
            <GenericCarouselMobile<CATEGORIES, CategoryCardProps>
              data={data} // Pass the data
              data_type={data_type}
              component_config={component_config} // Configuration for the carousel
              size={size}
              RenderCard={CategoryCardMobile} // The card to render
              renderCardProps={mapDataToCategoryCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponentMobile<CATEGORIES, CategoryCardProps>
              RenderComponent={CategoryCardMobile}
              data_type={data_type}
              component_config={component_config}
              size={size}
              data={data}
              renderComponentProps={mapDataToCategoryCardProps}
            />
          );
        }
      case "brands":
        if (isWeb) {
          return !isGrid ? (
            <GenericCarousel<BrandData, BrandCardProps>
              data={data} // Pass the data
              component_config={component_config} // Configuration for the carousel
              size={size}
              data_type={data_type}
              RenderCard={GenericBrandCard} // The card to render
              renderCardProps={mapDataToBrandCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponent<BrandData, BrandCardProps>
              RenderComponent={GenericBrandCard}
              component_config={component_config}
              data_type={data_type}
              size={size}
              data={data}
              renderComponentProps={mapDataToBrandCardProps}
            />
          );
        } else {
          return !isGrid ? (
            <GenericCarouselMobile<BrandData, BrandCardProps>
              data={data} // Pass the data
              data_type={data_type}
              component_config={component_config} // Configuration for the carousel
              size={size}
              RenderCard={GenericBrandCardMobile} // The card to render
              renderCardProps={mapDataToBrandCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponentMobile<BrandData, BrandCardProps>
              RenderComponent={GenericBrandCardMobile}
              data_type={data_type}
              component_config={component_config}
              size={size}
              data={data}
              renderComponentProps={mapDataToBrandCardProps}
            />
          );
        }
      case "post":
        if (isWeb) {
          return !isGrid ? (
            <GenericCarousel<REELSDATA, ReelCardProps>
              data_type={data_type}
              data={data} // Pass the data
              component_config={component_config} // Configuration for the carousel
              size={size}
              RenderCard={GenericReelsTile} // The card to render
              renderCardProps={mapDataToReelCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponent<REELSDATA, ReelCardProps>
              data_type={data_type}
              RenderComponent={GenericReelsTile}
              component_config={component_config}
              size={size}
              data={data}
              renderComponentProps={mapDataToReelCardProps}
            />
          );
        } else {
          return !isGrid ? (
            <GenericCarouselMobile<REELSDATA, ReelCardProps>
              data_type={data_type}
              data={data} // Pass the data
              component_config={component_config} // Configuration for the carousel
              size={size}
              RenderCard={GenericReelsTileMobile} // The card to render
              renderCardProps={mapDataToReelCardProps} // Function to map each data item to props
              parentWidth={parentWidth} // Pass the parent width for responsive design
            />
          ) : (
            <GridComponentMobile<REELSDATA, ReelCardProps>
              data_type={data_type}
              RenderComponent={GenericReelsTileMobile}
              component_config={component_config}
              size={size}
              data={data}
              renderComponentProps={mapDataToReelCardProps}
            />
          );
        }

      default:
        return null;
    }
  }
  const borderStyle: React.CSSProperties = (
    size !== "lg"
      ? component_config?.section_border
      : component_config?.web_section_border
  )
    ? {
      borderWidth:
        size !== "lg"
          ? component_config?.section_border_width || 0
          : component_config?.section_border_width || 0, // Default to 0 if not provided
      borderStyle:
        size !== "lg"
          ? component_config?.section_border_style || "solid"
          : component_config?.section_border_style || "solid",
      borderColor:
        size !== "lg"
          ? component_config?.section_border_color || "transparent"
          : component_config?.section_border_color || "transparent", // Default color
    }
    : {
      borderWidth: 0, // Default to 0 if not provided
      borderStyle: "solid",
      borderColor: "transparent", // Default color
    };
  const getBackgroundColor = (
    color: string | undefined | null,
    gradientDirection: "HORIZONTAL" | "VERTICAL" | undefined
  ) => {
    return (color || "")?.trim().split(",").length > 1
      ? `linear-gradient(to ${gradientDirection === "HORIZONTAL" ? "right" : "bottom"}, ${color})`
      : color || "transparent";
  };

  const backgroundColor =
    size !== "lg"
      ? getBackgroundColor(
        background_config?.background_color,
        background_config?.gradient_direction
      )
      : getBackgroundColor(
        background_config?.web_background_color,
        background_config?.web_gradient_direction
      );

  const paddings = isMobile
    ? {
      paddingLeft: !hasInside ? coalesce(component_config?.section_leftPadding, 0) : 0,
      paddingRight: !hasInside
        ? coalesce(component_config?.section_rightPadding, 0)
        : 0,
      paddingTop: !hasInside ? coalesce(component_config?.section_topPadding, 0) : 0,
      paddingBottom: !hasInside
        ? coalesce(component_config?.section_bottomPadding, 0)
        : 0,
    }
    : {
      paddingLeft: !hasInside
        ? coalesce(component_config?.web_section_leftPadding, 0)
        : 0,
      paddingRight: !hasInside
        ? coalesce(component_config?.web_section_rightPadding, 0)
        : 0,
      paddingTop: !hasInside
        ? coalesce(component_config?.web_section_topPadding, 0)
        : 0,
      paddingBottom: !hasInside
        ? coalesce(component_config?.web_section_bottomPadding, 0)
        : 0,
    };

  const margins = isMobile
    ? {
      marginLeft: coalesce(component_config?.section_leftMargin, 4),
      marginRight: coalesce(component_config?.section_rightMargin, 4),
      marginTop: coalesce(component_config?.section_topMargin, 0),
      marginBottom: coalesce(component_config?.section_bottomMargin, 20),
      borderRadius: coalesce(component_config?.section_corner_radius, 0),
    }
    : {
      marginLeft: coalesce(component_config?.web_section_leftMargin, "5%"),
      marginRight: coalesce(component_config?.web_section_rightMargin, "5%"),
      marginTop: coalesce(component_config?.web_section_topMargin, 0),
      marginBottom: coalesce(component_config?.web_section_bottomMargin, 20),
      borderRadius: coalesce(component_config?.web_section_corner_radius, 0),
    };
  const combinedStyle: React.CSSProperties = {
    background: backgroundColor,
    ...borderStyle,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    ...paddings,
    ...margins,
    overflow: "hidden",
  };
  const handleRender = ({
    isGrid,
    isWeb,
    isCarousel,
    data,
  }: {
    isGrid: boolean;
    isCarousel: boolean;
    isWeb: boolean;
    data: any;
  }) => {
    let renderElement = getRenderElement({
      isGrid,
      isWeb,
      isCarousel,
      data,
      data_type,
      component_config: component_config || {},
    }) || <></>;
    if (extra_info?.child_data_type?.length > 0) {
      renderElement = (
        <>
          {size == "lg" ? (
            <>
              <div
                style={{
                  marginTop: child_component_config?.section_topMargin || 0,
                  marginBottom: child_component_config?.section_bottomMargin || 0,
                  marginLeft: child_component_config?.section_leftMargin || 0,
                  marginRight: child_component_config?.section_rightMargin || 0,
                }}
              >
                <NestedCarousel<BANNER_ITEM_FRONTEND, GenericCardProps>
                  data={data} // Pass the data
                  component_config={component_config} // Configuration for the carousel
                  size={size} // Screen size
                  RenderCard={ParentCard} // The card to render
                  renderCardProps={mapDataToGenericCardProps} // Function to map each data item to props
                  setSelectedCategory={setSelectedCategory}
                  extra_info={extra_info || {}} // Extra information for the carousel
                  parentWidth={parentWidth} // Pass the parent width for responsive design
                />
              </div>
              {childData?.length > 0 &&
                getRenderElement({
                  isGrid: child_component_config?.web_grid || false,
                  isWeb: true,
                  isCarousel: child_component_config?.web_carousel || false,
                  data: childData,
                  data_type: { type: extra_info?.child_data_type },
                  component_config: extra_info?.child_component_config || {},
                })}
            </>
          ) : (
            <>
              <NestedCarouselMobile<BANNER_ITEM_FRONTEND, GenericCardProps>
                data={data} // Pass the data
                component_config={component_config} // Configuration for the carousel
                size={size} // Screen size
                RenderCard={ParentCardMobile} // The card to render
                renderCardProps={mapDataToGenericCardProps} // Function to map each data item to props
                setSelectedCategory={setSelectedCategory}
                extra_info={extra_info || {}} // Extra information for the carousel
                parentWidth={parentWidth} // Pass the parent width for responsive design
              />
              {childData?.length > 0 &&
                getRenderElement({
                  isGrid: child_component_config?.grid || false,
                  isWeb: false,
                  isCarousel: child_component_config?.carousel || false,
                  data: childData,
                  data_type: { type: extra_info?.child_data_type },
                  component_config: extra_info?.child_component_config || {},
                })}
            </>
          )}
          {selectedCategory && (
            <CtaBtn
              cta_config={cta_config}
              childData={data}
              selectedCategory={selectedCategory}
              size={size}
            />
          )}
        </>
      );
    } else {
    }

    return renderElement;
  };
  return (
    <div style={combinedStyle}>
      <HeaderWithSubHeader
        headerConfig={header_config}
        subHeaderConfig={sub_header_config}
        size={size}
      />

      <div
        className={clsx("relative w-full h-full")}
        style={{
          // backgroundColor: background_config?.background_color ?? "transparent",
          justifyContent:
            size == "lg"
              ? component_config?.web_section_alignment || "space-around"
              : component_config?.section_alignment || "space-around",
        }}
      >
        {size == "lg" &&
          getLayout(
            handleRender({
              isGrid: component_config?.web_grid || false,
              isWeb: true,
              isCarousel: component_config?.web_carousel || false,
              data: data,
            }) || <></>
          )}
        {size !== "lg" &&
          getLayout(
            handleRender({
              isGrid: component_config?.grid || false,
              isWeb: false,
              isCarousel: component_config?.carousel || false,
              data: data,
            }) || <></>
          )}
        {/* <div className="relative w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: background_imageUrl ? `url(${background_imageUrl})` : 'none' }}> */}
        {/* {background_image && <a href={sectionHeadingURLFn({ position, section_filters, is_section_clickable })} className="w-full"><img src={background_image} className={ImageStyles({ size })} /></a>} */}
      </div>
      <Footer footerConfig={footer_config} size={size} />
    </div>
  );
};
function getBackgroundClasses(backgroundConfig?: BackgroundConfig) {
  if (!backgroundConfig) return " ";
  const { background_topMargin, background_bottomMargin } = backgroundConfig;

  return [
    background_topMargin ? `pt-${background_topMargin}` : "",
    background_bottomMargin ? `pb-${background_bottomMargin}` : "",
  ]
    .filter(Boolean) // Remove any empty strings
    .join(" "); // Join the classes into a single string
}
const ContainerStyles = cva("flex flex-col items-center relative w-full h-fit px-[2%]", {
  variants: {
    size: {
      sm: "mb-[10%]",
      md: "mb-[8%]",
      lg: "mb-[7.5%]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const BigBgVariants = cva("absolute flex overflow-x-scroll rounded-md w-full pl-[4%]", {
  variants: {
    size: {
      sm: "pl-2 top-[40%]",
      md: "pl-3 top-[40%]",
      lg: "pl-5 top-[40%]",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const ImageStyles = cva("object-fit w-full rounded-xl absolute", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const backDropStyles = cva(
  "absolute bottom-0 w-full bg-gradient-to-t from-black from-20% to-transparent rounded-b-xl pl-[4%]",
  {
    variants: {
      size: {
        sm: "h-[100px]",
        md: "h-[150px]",
        lg: "h-[300px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
// Helper to convert width to Tailwind class
export const convertWidthToTailwindClass = (width?: number | null): string => {
  if (width == null || width < 0 || width > 1) return "";
  const percentage = Math.round(width * 100);
  if (percentage === 0) return "w-0";
  return percentage === 100 ? "w-full" : `w-[${percentage}%]`;
};
// Helper to convert corner radius to Tailwind class
// export const convertCornerRadiusToClass = (
//   cornerRadius?: number | null
// ): string => {
//   if (!cornerRadius || cornerRadius <= 0) return "";
//   return `rounded-[${cornerRadius}px]`; // Using arbitrary values for precise corner radius
// };

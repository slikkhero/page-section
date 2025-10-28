import { SingleProductProps } from "@/utils";
import {
  BANNER_ITEM_FRONTEND,
  ExtraConfig,
  POSITION_ITEM_FRONTEND,
} from "@/utils/DataTypes";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { CustomCarousel } from "../GenericComponent/CustomCarousel";

interface GenericCarouselProps<T, P> extends POSITION_ITEM_FRONTEND {
  data: T[]; // Array of data for mapping over
  RenderCard: React.ComponentType<P>; // Custom render component
  renderCardProps: (data: T) => P; // Function to generate props dynamically for each data item
  heartOnClick?: (
    product: SingleProductProps,
    h: boolean,
    setH: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  setSelectedCategory?: React.Dispatch<
    React.SetStateAction<
      | {
          name?: string;
          id?: string;
        }
      | undefined
    >
  >;
  extra_info?: ExtraConfig;
  parentWidth?: number; // Optional parent width for responsive design
}

export const NestedCarousel = <T, P>({
  component_config,
  size,
  data,
  RenderCard,
  renderCardProps,
  heartOnClick,
  extra_info,
  setSelectedCategory = undefined,
  parentWidth,
}: GenericCarouselProps<T, P>) => {
  const [isVideoPlaying, setVideoPlaying] = useState<boolean[]>([]);
  const [inView, setInView] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [parentIndex, setParentIndex] = useState(0);

  useEffect(() => {
    const currentData = data[parentIndex] as BANNER_ITEM_FRONTEND;

    if (setSelectedCategory && currentData?.pk) {
      setSelectedCategory({ id: `${currentData?.pk}`, name: currentData?.name || "" });
    }
  }, [parentIndex, data]);

  useEffect(() => {
    if (data?.length) {
      setVideoPlaying(data.map(() => false));
    }
  }, [data]);

  const handleSetInView = (idx: number[]) => {
    setInView(idx);
  };

  useEffect(() => {
    if (inView.length > 0) {
      setActiveIndex(0);
    }
  }, [inView]);

  useEffect(() => {
    (inView || []).forEach((index) =>
      setVideoPlaying((prev) => {
        const modified = [...prev];
        modified[index] = false;
        return modified;
      })
    );
    setVideoPlaying((prev) => {
      const modified = [...prev];
      modified[inView[activeIndex]] = true;
      return modified;
    });
    const interval = setInterval(() => {
      if (inView.length === 0) return;
      setActiveIndex((prev) => (prev + 1) % inView.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [activeIndex, inView]);
  useEffect(() => {
    if (inView.length) {
      setVideoPlaying((prev) => {
        const modified = [...prev];
        modified.forEach((_, index) => {
          modified[index] = false;
        });
        modified[activeIndex] = true;
        return modified;
      });
    }
  }, [activeIndex]);

  const cornerRadiusStyle: React.CSSProperties = component_config?.web_corner_radius
    ? {
        borderRadius: `${component_config.web_corner_radius}px`,
      }
    : {};

  // Combine styles
  const combinedStyle: React.CSSProperties = {
    // padding: "0px", // Fixed padding
    // boxSizing: "border-box", // Include padding within width
    // overflow: "hidden", // Prevent content overflow
  };

  return (
    <div
      className="flex flex-1"
      style={{
        ...combinedStyle,
        // paddingRight: (component_config?.web_section_padding ?? 0) * 2,
        // paddingLeft: (component_config?.web_section_padding ?? 0) * 2,
        // marginRight: (component_config?.web_section_margin ?? 0) * 2,
        // marginLeft: (component_config?.web_section_margin ?? 0) * 2,
      }}
    >
      <CustomCarousel
        items={data}
        renderCard={(d: T, index: number, isActive?: boolean) => {
          return (
            <RenderCard
              key={index}
              {...renderCardProps(d)} // Use the mapping function to get the correct props
              component_config={component_config} // Pass the component config
              size={size} // Pass the size
              isCarousel={true} // Indicate that it's in a carousel
              heartOnClick={heartOnClick}
              isPlaying={isVideoPlaying[index]}
              isActive={isActive}
            />
          );
        }}
        handleSetInView={handleSetInView}
        options={{ loop: component_config?.web_infinit_loop || false }}
        width={component_config?.web_width || 0.4}
        gap={component_config?.web_gap ?? 8}
        autoplay={component_config?.web_carousel_autoplay || false}
        autoplayInterval={(component_config?.web_interval || 3) * 1000}
        showDots={component_config?.web_show_dots || false}
        coverFlow={component_config?.web_coverflow || false}
        justifyValue={
          component_config?.web_carousel_autoplay
            ? "flex-start"
            : component_config?.web_section_alignment || "flex-start"
        } //the carousel breaks with any other value other than "flex-start" in some cases
        infinite={component_config?.web_infinit_loop}
        size={size}
        parentIndex={parentIndex}
        setParentIndex={setParentIndex}
        extra_info={extra_info}
        parentWidth={parentWidth} // Pass the parent width for responsive design
      />
    </div>
  );
};

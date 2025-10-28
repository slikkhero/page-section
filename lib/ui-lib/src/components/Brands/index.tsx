import useScreenSize from "@/hooks/useScreenSize";
import { fieldsToListingPage } from "@/utils";
import { SingleBrandCardProps } from "@/utils/types";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
import bookmark from "../../assets/svg/bookmark.svg";
import filledBookmark from "../../assets/svg/filledBookmark.svg";

export const BrandCard = ({ data, size }: SingleBrandCardProps) => {
  const screenSize = useScreenSize();
  const [Subscribed, setSubscribed] = useState(data.is_subscribed || false);

  return (
    <a
      href={fieldsToListingPage({
        brand: data.name,
        quick_filter_tags: data.quick_filter_tags,
        size,
        pk: -1,
        tags: [],
        is_clickable: true,
        coupon_code: null,
      })}
      className={ContainerVariants({})}
    >
      <button
        className={clsx(
          "absolute ",
          screenSize === "sm" ? "top-3 right-3 w-3" : "w-4 top-4 right-4"
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSubscribed((prev) => !prev);
        }}
      >
        <img src={Subscribed ? filledBookmark.src : bookmark.src} alt="" />
      </button>
      {data.image ? (
        <img src={data.image} className={ImageVariants({ size })} />
      ) : data.name ? (
        <div className="w-full aspect-[79/60] p-[1px] bg-gradient-to-b from-[#231F20] to-[#57585A] rounded-3xl flex items-center justify-center">
          <div className="flex w-full h-full bg-primaryBlack rounded-3xl items-center justify-center text-primaryWhite text-[14px] md:text-lg font-semibold md:font-bold overflow-hidden">
            <span className="line-clamp-3 text-center px-2">{data.name}</span>
          </div>
        </div>
      ) : null}
    </a>
  );
};

const ContainerVariants = cva("rounded-lg w-full h-full p-[2px] relative", {
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

const ImageVariants = cva("object-contain p-1 rounded-xl", {
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

export * from "./BrandCarousel";
export * from "./BrandGrid";

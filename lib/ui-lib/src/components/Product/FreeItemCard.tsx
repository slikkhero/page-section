import soldOutIcon from "@/assets/general/soldOut.svg";
import { fieldsToPDPPage } from "@/utils/products";
import { SingleProductProps } from "@/utils/types";
import { cva } from "class-variance-authority";
import { useState } from "react";
import heartIcon from "../../assets/Wishlist.png";
import lightHeartIcon from "../../assets/heart.png";
import redHeart from "../../assets/redHeart.png";
import offerWave from "../../assets/svg/offerWave.svg";
import { CarouselModal } from "./CarouselModal";

export const FreeItemCard = (props: SingleProductProps) => {
  const {
    size,
    type,
    barcode,
    skid,
    mrp,
    sp,
    name,
    category,
    sub_category,
    product_type,
    brand,
    product_feedback,
    is_wish_listed,
    inventory_count,
    image_high_res,
    is_try_and_buy,
    image,
    heartOnClick = (product, h: any, setH: any) => { },
  } = props;

  const discount = Math.round(
    ((parseFloat(mrp) - parseFloat(sp)) / parseFloat(mrp)) * 100
  );

  const [heartClicked, setHeartClicked] = useState(is_wish_listed);
  const [isOpen, setIsOpen] = useState(false);
  const handleHeartClick = () => {
    // heartOnClick(props, heartClicked, setHeartClicked);
  };

  return (
    <div
      className={`flex flex-col h-fit rounded-xl bg-[#F4F4F4] w-52 ${inventory_count == 0 && "opacity-80"
        } ${SizeVariants({ size })}`}
    >
      <a
        href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}
        className={`mb-2 relative bg-primaryWhite rounded-xl ${ImageVariants({
          size,
          type,
        })}`}
      >
        <img
          src={image}
          loading="lazy"
          className={` rounded-xl object-cover object-top aspect-square ${ImageVariants({
            size,
          })}`}
        />
        {!!discount && inventory_count != 0 && (
          <div className="absolute flex flex-col top-[2px] text-primaryWhite left-[13px] max-w-14 w-fit px-1 justify-center items-center font-semibold z-10">
            <span className=" leading-3">{discount}%</span>
            <span className=" uppercase">Off</span>
          </div>
        )}
        {!!discount && inventory_count != 0 && (
          <div className=" absolute left-3 top-0 z-0">
            <img className="" src={offerWave.src} />
          </div>
        )}
        {/* {(image_high_res || image) && (
          <div
            className="absolute top-1 right-1 p-1 z-10 w-7 h-7 items-center justify-center flex bg-[#A3A3A3] rounded-full"
            onClick={(event) => {
              event.preventDefault();
              setIsOpen((prev) => !prev);
            }}
          >
            <FaEye color="white" size={16} />
          </div>
        )} */}
        {inventory_count == 0 && (
          <div className=" absolute top-0 w-full flex items-center justify-center">
            <img src={soldOutIcon.src} className="w-[120px]" />
          </div>
        )}

        {product_feedback?.length == 1 && product_feedback[0].rating && (
          <div className=" rounded-full flex flex-row justify-between divide-x-2 absolute left-3 bottom-5 pr-1 py-1 bg-primaryWhite shadow-xl border text-[13px] drop-shadow-xl">
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
      {(image_high_res || image) && (
        <CarouselModal
          isOpen={isOpen}
          onOpenChange={(state) => {
            setIsOpen(state);
          }}
          imagesUrl={image_high_res || image || ""}
          size={size}
        />
      )}
      <div
        className={`flex flex-row justify-between items-start w-full text-[13px] p-1 ${TextVariants(
          { type }
        )}`}
      >
        <div className=" flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <a href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}>
              <span
                className={`line-clamp-1 ${TextVariants({
                  type,
                })} font-bold  uppercase`}
              >
                {brand}
              </span>
            </a>
            <img
              src={
                heartClicked
                  ? redHeart.src
                  : type == "dark"
                    ? lightHeartIcon.src
                    : heartIcon.src
              }
              className=" w-5"
              onClick={handleHeartClick}
            />
          </div>
          <a href={fieldsToPDPPage(category, sub_category, name, brand, barcode, skid)}>
            <span className=" h-9 leading-4 line-clamp-2 whitespace-break-spaces capitalize font-semibold text-[#717171]">
              {name}
            </span>
          </a>

          <div className="pt-1 text-[16px] flex flex-row items-center justify-between space-x-2 w-full">
            <div className="flex flex-row items-center justify-center space-x-2 text-sm">
              {discount > 0 && (
                <span className=" text-opacity-40 line-through text-[#202020]">
                  ₹{Math.round(parseInt(mrp))}
                </span>
              )}
              {parseInt(sp) == 0 ? (
                <span className="font-bold">Free</span>
              ) : (
                <span className="">₹{Math.round(parseInt(sp))}</span>
              )}
            </div>
          </div>
        </div>

        <div className="w-fit"></div>
      </div>
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
      light: "text-primaryBlack",
      dark: "text-primaryWhite",
    },
  },
  defaultVariants: {
    type: "dark",
  },
});

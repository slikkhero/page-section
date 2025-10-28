import { MultipleProductProps } from "@/utils/types";
import { cva } from "class-variance-authority";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({
  products,
  size,
  type,
  heartOnClick,
  llInfoData,
}: MultipleProductProps) => {
  return (
    <div className={GridVariants({ size })}>
      {products?.map((product, key) => {
        return (
          <ProductCard
            heartOnClick={heartOnClick}
            {...product}
            size={size}
            type={type}
            key={product.barcode}
            llInfoData={llInfoData}
          />
        );
      })}
    </div>
  );
};

const GridVariants = cva("w-full grid gap-y-6 gap-x-[2%]", {
  variants: {
    size: {
      sm: "grid-cols-2",
      md: "grid-cols-3",
      lg: "grid-cols-4",
    },
  },
});

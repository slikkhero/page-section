import { isTrue } from "@/lib/utils";
import { useMemo } from "react";
import { BrandData } from "../types";

export function useFilteredBrands(q: string, brands: BrandData[]) {
  const trimmedQuery = q.trim().toLowerCase();

  return useMemo(() => {
    const filtered = brands.filter((brand) => {
      if (!isTrue(brand.is_active)) return false;
      if (trimmedQuery === "") return true;
      return brand.name.toLowerCase().includes(trimmedQuery);
    });

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [q, brands]);
}

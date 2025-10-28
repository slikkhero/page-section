type NullAbleString = string | null;

export function filtersToListingPage(
  division: NullAbleString = null,
  category: NullAbleString = null,
  subcategory: NullAbleString = null,
  producttype: NullAbleString = null,
  brand: NullAbleString = null,
  size: NullAbleString = null
) {
  //TODO: Keep updating this function to suit other features like quick filters etc
  const filters = {
    division,
    category,
    subcategory,
    producttype,
    brand,
    size,
  };

  return "/products" + "?" + objectToListingString(filters) || "/products";
}

export const SORT_BY_OPTIONS = [
  {
    name: "What's new",
    value: "newest_first",
  },
  {
    name: "Price-high to low",
    value: "high_low",
  },
  {
    name: "Price-low to high",
    value: "low_high",
  },
  {
    name: "Discount",
    value: "discount",
  },
];

export const skipInFilterList: (e: string) => boolean = (e) => {
  // if (e == "gender") return true;
  if (e == "max_price") return true;
  if (e == "initialMinMax") return true;
  if (e == "agerange") return true;
  return false;
};
export const skipInFilterListMobile: (e: string) => boolean = (e) => {
  if (e == "gender") return true;
  if (e == "max_price") return true;
  if (e == "initialMinMax") return true;
  if (e == "agerange") return true;
  return false;
};

export const objectToQueryString = (obj) => {
  if (!obj) return;

  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => `${decodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
};

export const objectToListingString = (obj) => {
  if (!obj) return;

  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
};

export function convertToFilterValues(obj) {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key].split(",").map((item) => item.trim());
    }
  }
  return result;
}

export function arrayObjectToQueryString(obj) {
  const params = new URLSearchParams();

  Object.keys(obj)
    .filter((key) => obj[key] && obj[key].length !== 0)
    .forEach((key) => {
      params.set(key, obj[key].join(","));
    });

  return params.toString();
}
export const getLastMatchForListing = (query, filterMapping) => {
  if (!query) return null;
  if (query.division) {
    return {
      type: "division",
      value: query.division?.at(0),
    };
  }
  if (query.category && query.subcategory && query.producttype) {
    return {
      type: "producttype",
      value: query.producttype?.at(0),
    };
  } else if (query.category) {
    return {
      type: "category",
      value: query.category?.at(0),
    };
  } else if (query.subcategory) {
    return {
      type: "subcategory",
      value: query.subcategory?.at(0),
    };
  } else if (query.brand) {
    return {
      type: "brand",
      value: query.brand?.at(0),
    };
  } else if (query.trend?.length) {
    return {
      type: "trend",
      value: query.trend?.at(0),
    };
  }

  try {
    const keys = Object.keys(query).filter((k) => filterMapping[k]);
    if (keys && keys.length) {
      return {
        type: keys[0],
        value: query[keys[0]]?.at(0),
      };
    }
  } catch (err) {
    return null;
  }
};
export const getFirstMatchForListing = (query, filterMapping) => {
  if (!query) return null;
  if (query.brand?.length) {
    return {
      type: "brand",
      value: query.brand?.at(0),
    };
  } else if (query.trend?.length) {
    return {
      type: "trend",
      value: query.trend?.at(0),
    };
  } else if (query.subcategory?.length) {
    return {
      type: "subcategory",
      value: query.subcategory?.at(0),
    };
  } else if (query.category?.length) {
    return {
      type: "category",
      value: query.category?.at(0),
    };
  } else if (query.producttype?.length) {
    return {
      type: "producttype",
      value: query.producttype?.at(0),
    };
  } else if (query.division) {
    return {
      type: "division",
      value: query.division?.at(0),
    };
  }

  try {
    const keys = Object.keys(query).filter((k) => filterMapping[k]);
    if (keys && keys.length) {
      return {
        type: keys[0],
        value: query[keys[0]]?.at(0),
      };
    }
  } catch (err) {
    return null;
  }
  return null;
};

export const replaceUrl = ({ router, filters }) => {
  const queryFromFilters = arrayObjectToQueryString(filters);
  router.push(
    {
      pathname: "/products",
      query: queryFromFilters, // Use the updated filters for the query
    },
    `/products?${queryFromFilters}`,
    { shallow: true } // Use shallow routing to avoid full page reload
  );
};

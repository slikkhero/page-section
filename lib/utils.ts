import { ProfileState } from "@/redux/types";
import { ScreenSize } from "@/utils";
import { clsx, type ClassValue } from "clsx";
import crypto, { BinaryLike } from "crypto";
import { NextApiRequest } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScreenCategory = (): ScreenSize => {
  const width = window.innerWidth;
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  return "lg";
};
export function safeParseJSON(str: string, fallback: any = {}) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
export const detectDeviceAndBrowser = () => {
  const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";

  // Detect browsers
  const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isEdge = /Edg/.test(userAgent);

  // Detect devices
  const isIphone = /iPhone/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMac = /Macintosh/.test(userAgent); // Detect Mac

  // Detect Safari on macOS
  const isSafariMac = isSafari && isMac;

  return {
    isChrome,
    isSafari,
    isFirefox,
    isEdge,
    isIphone,
    isAndroid,
    isSafariMac, // True if it's Safari on macOS
    isChromeIphone: isIphone && isChrome,
    isSafariIphone: isIphone && isSafari,
    isChromeAndroid: isAndroid && isChrome,
  };
};

export const genQueryString = (query) => {
  if (Object.keys(query).length > 0) {
    // Convert query parameters to a valid string format for URLSearchParams
    const queryString = new URLSearchParams(
      Object.entries(query).reduce((acc, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value;
        } else if (Array.isArray(value)) {
          acc[key] = value.join(","); // Join array values if necessary
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    return queryString;
  } else {
    return new URLSearchParams(query).toString();
  }
};
export const getFullDeviceInfoSSr = async ({ req }) => {
  const userAgent = req.headers["user-agent"] || "Unknown";

  return {
    type: "Server Side Call",
    userAgent,
    language: req.headers["accept-language"] || "Unknown",
    maxTouchPoints: 0,
  };
};

export const getFullDeviceInfo = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      info: "no window or navigator,probably an ssr call",
    };
  }

  return {
    platform: navigator.platform || "Unknown",
    userAgent: navigator.userAgent || "Unknown",
    vendor: navigator.vendor || "Unknown",
    language: navigator.language || "Unknown",
    deviceMemory: (navigator as any).deviceMemory || "Unknown",
    hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
    maxTouchPoints: navigator.maxTouchPoints || 0,
  };
};

// Utility
export const debounceWithEnvCheck = <T extends (...args: any[]) => void>(
  func: T,
  wait = 300
): T => {
  if (process.env.NODE_ENV !== "production") {
    return (() => {}) as T;
  }
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait = 300
): T => {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

export const isTrue = (value) => `${value}`.toLowerCase() === "true";

export const sortSizes = (sizes) => {
  const sizeOrder = {
    "3xs": 0,
    xxxs: 1,
    "2xs": 2,
    xxs: 3,
    xs: 4,
    s: 5,
    m: 6,
    l: 7,
    xl: 8,
    "2xl": 9,
    xxl: 10,
    "3xl": 11,
    xxxl: 12,
    "4xl": 13,
    xxxxl: 14,
    fs: 15,
    freesize: 16,
    // Add more sizes as needed
  };

  // Helper function to check if a size is numeric
  const isNumeric = (size) => /^\d*.{0,1}\d+$/.test(size);

  // Custom sorting function to handle complex sizes like 'xl-xxl', 'xs/s', etc.
  const customSort = (c, d) => {
    let a = `${c}`.toLowerCase();
    let b = `${d}`.toLowerCase();
    // Remove spaces around hyphen or slash for consistency
    const cleanSize = (size) => size.replace(/\s*[-/]\s*/, "-");

    // Clean up both sizes
    a = cleanSize(a);
    b = cleanSize(b);

    // Check if both are numeric sizes
    if (isNumeric(a) && isNumeric(b)) {
      return Number(a) - Number(b); // Sort numeric sizes in ascending order
    }

    // If one is numeric and the other is not, numeric sizes come first
    if (isNumeric(a) && !isNumeric(b)) return -1;
    if (!isNumeric(a) && isNumeric(b)) return 1;

    // Check if both are range-like (contain a hyphen or slash)
    const isRangeA = a.includes("-") || a.includes("/");
    const isRangeB = b.includes("-") || b.includes("/");

    // If both are ranges, compare them
    if (isRangeA && isRangeB) {
      const getRangeParts = (range) =>
        range.includes("-") ? range.split("-") : range.split("/");

      const [startA, endA] = getRangeParts(a);
      const [startB, endB] = getRangeParts(b);

      if (sizeOrder[startA] !== sizeOrder[startB]) {
        return sizeOrder[startA] - sizeOrder[startB]; // Compare by the smallest part
      }

      // If both have the same smallest size, compare by the largest part
      return sizeOrder[endA] - sizeOrder[endB];
    }

    // If one of them is a range and the other is a base size, the base size comes first
    if (isRangeA && !isRangeB) {
      const baseSize = a.includes("-") ? a.split("-")[0] : a.split("/")[0];
      if (baseSize === b) return 1; // Range comes after its base size
      return sizeOrder[baseSize] - sizeOrder[b];
    }
    if (!isRangeA && isRangeB) {
      const baseSize = b.includes("-") ? b.split("-")[0] : b.split("/")[0];
      if (baseSize === a) return -1; // Range comes after its base size
      return sizeOrder[a] - sizeOrder[baseSize];
    }

    // If neither are ranges nor numeric, simply compare based on the order in sizeOrder
    return sizeOrder[a] - sizeOrder[b];
  };

  // Sort the array
  const sorted = sizes.sort(customSort);

  return sorted;
};
export const sortSizeVariants = (sizeVariants) => {
  // Extract the sizes from the products
  const sizes = sizeVariants.map((product) => product.size);

  // Sort the sizes using the existing sortSizes function
  const sortedSizes = sortSizes(sizes);

  // Sort the products based on the sorted sizes
  const sortedProducts = sortedSizes.map((size) => {
    return sizeVariants.find((product) => product.size === size);
  });
  return sortedProducts;
};

export const getGenderValue = (gender) => {
  if (gender.toLowerCase() === "male") {
    return "MEN";
  } else if (gender.toLowerCase() === "female") {
    return "WOMEN";
  } else if (
    gender.toLowerCase() === "men" ||
    gender.toLowerCase() === "women"
  ) {
    return gender;
  }
  return "WOMEN";
};

export const createHash = ({
  value,
  hashType = "sha256",
}: {
  value?: BinaryLike;
  hashType?: string; // allow any algorithm supported by Node
}): string | undefined => {
  if (!value) return undefined;
  return crypto.createHash(hashType).update(value).digest("hex");
};

export const parseDate = (d) => {
  const date = new Date(d);
  return isNaN(date.getTime()) ? null : date;
};

export const getKey = (item: any, index: number): string => {
  return (
    item.barcode || // for products
    item.post_id || // for reels
    item.pk || // for banner
    item.id || // for brand
    item.name || // for categories
    String(index)
  ); // fallback (safe because list is stable and typed)
};

// Save with 1-hour expiry
export function setWithExpiry({
  key,
  value,
  ttlMs = 60 * 60 * 1000,
}: {
  key: string;
  value: any;
  ttlMs?: number;
}) {
  const item = {
    value,
    expiry: Date.now() + (ttlMs || 60 * 60 * 1000),
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

// Read and auto-expire
export function getWithExpiry({ key }: { key: string }) {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = safeParseJSON(itemStr, {});
    if (Date.now() > item.expiry) {
      sessionStorage.removeItem(key); // expired, clean up
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
}
export function createMarkDown(tabDescription: any[]): string {
  if (!Array.isArray(tabDescription)) return "";
  return tabDescription
    .filter(Boolean)
    .map((line) => `- ${String(line).trim()}\n`)
    .join("");
}

export const getDisplayAddress = ({ address }) => {
  const name = address?.name || "";
  const area = address?.area || "";
  const truncatedArea = area.length > 12 ? area.substring(0, 11) : area;
  return `${name}${name && area ? " : " : ""}${truncatedArea}`;
};

//example
// const sizes = [
//   "xl",
//   "2xl",
//   "xxl",
//   "xl-xxl",
//   "xl-2xl",
//   "m",
//   "l",
//   "m-l",
//   "xs/s",
//   "xxl/3xl",
// ];

// const sortedSizes = sortSizes(sizes);
// console.log(sortedSizes);

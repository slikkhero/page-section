import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const coalesce = (value, fallback) =>
  value === null || value === undefined || value === "" ? fallback : value;

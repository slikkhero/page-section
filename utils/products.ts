export function fieldsToPDPPage(
  category?: string,
  sub_category?: string,
  name?: string,
  brand?: string,
  barcode?: string,
  skid?: string
) {
  const tempName = name
    ?.replaceAll(/[^a-zA-Z0-9]+/g, "-") // replace 1+ invalid chars with one dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
  return `/${category}/${sub_category}/${brand}/${tempName}/${skid ?? barcode}`;
}

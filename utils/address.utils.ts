export const extractAddressFromMapRes = (data) => {
  const address_components = data.address_components;

  const findComponent = (...types: string[]) =>
    address_components.find((a) => a.types.some((t) => types.includes(t)));

  const flat_area =
    findComponent("street_address") ||
    findComponent("sublocality_level_3") ||
    findComponent("sublocality_level_2") ||
    findComponent("sublocality_level_1") ||
    findComponent("sublocality") ||
    findComponent("locality");
  const area = flat_area?.long_name || "";
  const flat = flat_area?.short_name || "";
  const city =
    findComponent("administrative_area_level_2", "administrative_area_level_3")
      ?.long_name || "";
  const state = findComponent("administrative_area_level_1")?.long_name || "";
  const postalCode = findComponent("postal_code")?.long_name || "";

  return { flat, area, city, state, postalCode };
};

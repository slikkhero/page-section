import { createAction } from "@reduxjs/toolkit";

export type AuthState = {
  referral_code: string;
  loading: boolean;
  phoneNumberValidated: boolean;
  message: string;
  show_profile_page: boolean;
  mobile: string;
};

export interface ProfileState extends AuthState {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  mobile: string;
  photo: string;
  date_joined: Date | null;
  gender: string;
  loading: boolean;
  loyalty?: Loyalty | null;
  next_loyalty_message: string;
  order_count: number;
  profession: string;
  age_range: string;
}
export type Loyalty = {
  loyalty_entry_date: string; // ISO date string
  loyalty_transactions: any[]; // Adjust the type based on the actual structure of transactions if available
  loyalty_reset_date: string | null; // ISO date string or null
  create_date: string; // ISO date string
  loyalty: {
    id: number;
    image: string;
    name: string;
    tier_upgrade_condition: {
      type: string; // Adjust the type based on allowed strings, e.g., "order_count"
      value: number;
      duration: string; // Adjust the type based on allowed strings, e.g., "lifetime"
    };
    description: string | null;
    discount: number;
    max_discount: number;
    max_yearly_discount: number;
    benefits: string | null;
    tier_upgrade_offer: {
      type: string; // Adjust the type based on allowed strings, e.g., "free_item"
      value: string; // A comma-separated string of item IDs
      max_discount: number;
      max_order_value: number;
      min_order_value: number;
    }[];
    level: number;
    create_date: string; // ISO date string
    update_date: string; // ISO date string
  };
};

const loginRequest = "loginRequest";
const loginSuccess = createAction<ProfileState>("loginSuccess");
const loginFailure = "loginFailure";

const otpRequest = "otpRequest";
const otpSuccess = createAction<ProfileState>("otpSuccess");
const otpFailure = createAction<ProfileState>("otpFailure");

const getProfileRequest = "getProfileRequest";
const getProfileSuccess = createAction<ProfileState>("getProfileSuccess");
const getProfileFailure = createAction<string>("getProfileFailure");

const saveProfileRequest = "saveProfileRequest";
const saveProfileSuccess = createAction<string>("saveProfileSuccess");
const saveProfileFailure = createAction<string>("saveProfileFailure");

//Address
export type AddressState = {
  id?: number;
  latitude?: number;
  longitude?: number;
  flat?: string;
  area?: string;
  directions?: string;
  city?: string;
  state?: string;
  pincode?: string;
  name?: string;
  mobile?: string;
  email?: string | null;
  customer_name?: string;
  is_default?: boolean;
  is_express_delivery?: boolean;
  express_delivery_stores?: Record<string, [string, number]>;
  delivery_time?: number;
};

export type AddressList = {
  id?: number;
  latitude?: number;
  longitude?: number;
  flat?: string;
  area?: string;
  directions?: string;
  city?: string;
  state?: string;
  pincode?: string;
  name?: string;
  mobile?: string;
  email?: string | null;
  customer_name?: string;
  is_default?: boolean;
  is_express_delivery?: boolean;
  express_delivery_stores?: Record<string, [string, number]>;
  delivery_time?: number;
};

export type AddressStateList = {
  addresses: AddressState[];
  loading: boolean;
  message: string;
  currAddress?: AddressState | null;
  isAddressModalOpen?: boolean;
  isAddressOverlayOpen?: boolean;
};
const setAdress = createAction<AddressState>("setAdress");

const logoutRequest = "logoutRequest";
const logoutSuccess = createAction<string>("logoutSuccess");
const logoutFailure = createAction<string>("logoutFailure");

const getAddressListRequest = "getAddressListRequest";
const openAddressModal = "openAddressModal";
const closeAddressModal = "closeAddressModal";
const openAddressOverlay = "openAddressOverlay";
const closeAddressOverlay = "closeAddressOverlay";
const getAddressListSuccess = createAction<AddressStateList>(
  "getAddressListSuccess"
);
const getAddressListFailure = createAction<AddressStateList>(
  "getAddressListFailure"
);

const saveAddressRequest = "saveAddressRequest";
const saveAddressSuccess = createAction<AddressStateList>("saveAddressSuccess");
const saveAddressFailure = createAction<AddressStateList>("saveAddressFailure");

const updateAddressRequest = "updateAddressRequest";
const updateAddressSuccess = createAction<AddressStateList>(
  "updateAddressSuccess"
);
const updateAddressFailure = createAction<AddressStateList>(
  "updateAddressFailure"
);

const deleteAddressRequest = "deleteAddressRequest";
const deleteAddressSuccess = createAction<AddressStateList>(
  "deleteAddressSuccess"
);
const deleteAddressFailure = createAction<AddressStateList>(
  "deleteAddressFailure"
);

export type Brand = {
  id?: number;
  name: string;
  title?: string;
  description?: string;
  image: string;
  is_top: boolean;
  is_exclusive: boolean;
  is_private: boolean;
  footer?: string;
  is_subscribed?: boolean;
  quick_filter_tags?: any;
};

export type allBrands = {
  next: boolean;
  allBrands: Brand[];
  count: number;
  loading: boolean;
  message: string;
};

const getBrandsRequest = "getBrandsRequest";
const getBrandsSuccess = createAction<allBrands>("getBrandsSuccess");
const getBrandsFailure = createAction<allBrands>("getBrandsFailure");

export type Product_Type = {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  footer?: string;
  quick_filter_tags?: string | null;
  position?: number;
  sub_category?: number | null;
};

export type Sub_Category = {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  footer?: string;
  quick_filter_tags?: string;
  position?: number;
  product_types: Product_Type[];
};

export type Category = {
  id?: number;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  footer?: string;
  quick_filter_tags?: string;
  position?: number;
  sub_categories?: Sub_Category[];
};

export type Division = {
  name: string;
  categories: Category[];
};

export type AllDivisions = {
  loading: boolean;
  divisions: Division[];
  type: any;
  message: "";
};
export type AppHeaderConfig = {
  gradient?: string[];
  logo_web?: string;
  icon_color?: string;
  lottie_web?: string;
  delivery_text?: Record<string, string>;
  logo_mobile_b?: string;
  logo_mobile_w?: string;
  lottie_mobile?: string;
  location_color?: string;
  lightening_color?: string;
  delivery_text_color?: string;
  alert_messages?: string[];
  default_messages?: string[];
  store_closed_messages?: string[];
  delivery_fee_msg?: string;
  division_colors?: Record<string, Record<string, string>>;
  logo_web_lottie?: string;
  search_bar_lottie?: string;
  logo_web_closed?: string;
  logo_mobile_closed?: string;
  logo_mobile_lottie?: string;
  tnb_description?: string[];
  tnb_charges?: number;
  logo_mobile_closed_lottie?: string;
  logo_web_closed_lottie?: string;
  ll_info_data?: LlInfoData;
  contact?: {
    email?: string;
    mobile?: number;
  };
  timer_config?: {
    web?: {
      bg_color?: string;
      timer_gap?: number;
      timer_type?: string;
      timer_color?: string;
      campaign_name?: string;
      timer_bg_color?: string;
      timer_gradient?: string;
      timer_font_size?: number;
      timer_text_font?: boolean;
      timer_dots_color?: string;
      timer_text_color?: string;
      locked_timer_text?: string;
      timer_font_weight?: string;
      timer_text_position?: string;
      unlocked_timer_text?: string;
      page_views_increment?: number;
    };
    mobile?: {
      bg_color?: string;
      timer_gap?: number;
      timer_type?: string;
      timer_color?: string;
      campaign_name?: string;
      timer_bg_color?: string;
      timer_gradient?: string;
      timer_font_size?: number;
      timer_text_font?: boolean;
      timer_dots_color?: string;
      timer_text_color?: string;
      locked_timer_text?: string;
      timer_font_weight?: string;
      timer_text_position?: string;
      unlocked_timer_text?: string;
      page_views_increment?: number;
    };
  };
  gifting_config: GiftingConfig;
  onBoardingData?: {
    age_range_mapping?: Record<string, string>;
    professions_mapping?: Record<string, string>;
  };
  cartTooFarMessage?: string;
  announcement_image?: string;
  minimum_leftover_qty?: number;
};
export type LlInfoData = {
  bg_color?: string;
  text_color?: string;
};
export type AlertNotificationConfig = {
  message?: string;
  image_web?: string;
  image_mobile?: string;
  bg_color?: string;
  color?: string;
  lottie?: string;
};
export type GiftingConfig = {
  show_gifting_option?: boolean;
  gifting_title?: string;
  gifting_subtitle?: string;
  gifting_charge?: number;
};

const getCategoryRequest = "getCategoryRequest";
const getCategorySuccess = createAction<AllDivisions>("getCategorySuccess");
const getCategoryFailure = createAction<AllDivisions>("getCategoryFailure");

export type BillItem = {
  name: string;
  value: string | undefined | null;
};
export type LogType = {
  source: "desktop" | "mobile";
  device_info?: string | null;
  log_type: "error" | "info" | "warning";
  log_message: string;
};
export {
  closeAddressModal,
  closeAddressOverlay,
  deleteAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  getAddressListFailure,
  getAddressListRequest,
  getAddressListSuccess,
  getBrandsFailure,
  getBrandsRequest,
  getBrandsSuccess,
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  openAddressModal,
  openAddressOverlay,
  otpFailure,
  otpRequest,
  otpSuccess,
  saveAddressFailure,
  saveAddressRequest,
  saveAddressSuccess,
  saveProfileFailure,
  saveProfileRequest,
  saveProfileSuccess,
  setAdress,
  updateAddressFailure,
  updateAddressRequest,
  updateAddressSuccess,
};

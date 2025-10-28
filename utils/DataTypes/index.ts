import { ScreenSize } from "../types";

export type BANNER_TYPES =
  | "Coupon"
  | "loyalty"
  | "Banner"
  | "Generic"
  | "Default"
  | "cart_default_delivery"
  | "cart_default_coupon"
  | "cart_default_price"
  | "notFound";

export type NullableString = string | null;

export type CarouselGridConfig = {
  row?: number | null;
  column?: number | null;
  gap?: number | null;
  vertical_gap?: number | null;
  carousel?: boolean | null;
  coverFlow?: boolean | null;
  web_coverflow?: boolean | null;
  grid?: boolean | null;
  width?: number | null;
  carousel_autoplay?: boolean | null;
  corner_radius?: number | null;
  carousel_dot?: boolean | null;
  border?: boolean | null;
  interval?: number | null;
  border_style?: string | null;
  border_width?: number | null;
  border_color?: string | null;
  show_dots?: boolean | null;
  infinit_loop?: boolean | null;
  section_corner_radius?: number | null;
  web_carousel_dot?: boolean | null;
  web_row?: number | null;
  web_column?: number | null;
  web_gap?: number | null;
  web_vertical_gap?: number | null;
  web_carousel?: boolean | null;
  web_grid?: boolean | null;
  web_width?: number | null;
  web_carousel_autoplay?: boolean | null;
  web_section_corner_radius?: number | null;
  web_corner_radius?: number | null;
  web_border?: boolean | null;
  web_interval?: number | null;
  web_border_style?: string | null;
  web_border_width?: number | null;
  web_border_color?: string | null;
  web_show_dots?: boolean | null;
  web_infinit_loop?: boolean | null;
  name?: boolean | null;
  name_position?: string | null;
  name_align?: string | null;
  name_topMargin?: number;
  name_bottomMargin?: number;
  footer_topMargin?: number;
  footer_bottomMargin?: number;
  aspect_ratio?: number | null;
  font_color?: string | null;
  font_style?: FontStyleType;
  footer_font_color?: string | null;
  footer_font_style?: FontStyleType;
  name_footer?: boolean | null;
  name_footer_align?: string | null;
  font_size?: number | null;
  footer_font_size?: number | null;
  section_alignment?: string | null;
  content_alignment?: string | null;
  section_border?: boolean | null;
  section_border_width?: number | null;
  section_border_style?: string | null;
  section_border_color?: string | null;
  web_section_border?: boolean | null;
  web_section_border_width?: number | null;
  web_section_border_style?: string | null;
  web_section_border_color?: string | null;
  section_margin?: number | null;
  section_padding?: number | null;
  section_topMargin?: number | null;
  section_bottomMargin?: number | null;
  section_leftMargin?: number | null;
  section_rightMargin?: number | null;
  section_topPadding?: number | null;
  section_leftPadding?: number | null;
  section_rightPadding?: number | null;
  section_bottomPadding?: number | null;
  web_font_color?: string | null;
  web_font_style?: FontStyleType;
  web_footer_font_color?: string | null;
  web_footer_font_style?: FontStyleType;
  web_aspect_ratio?: number | null;
  web_name_topMargin?: number;
  web_name_bottomMargin?: number;
  web_footer_topMargin?: number;
  web_footer_bottomMargin?: number;
  web_name?: boolean | null;
  web_name_position?: string | null;
  web_name_align?: string | null;
  web_name_footer?: boolean | null;
  web_name_footer_align?: string | null;
  web_font_size?: number | null;
  web_footer_font_size?: number | null;
  web_section_alignment?: string | null;
  web_content_alignment?: string | null;
  web_section_topMargin?: number | null;
  web_section_bottomMargin?: number | null;
  web_section_leftMargin?: number | null;
  web_section_rightMargin?: number | null;
  web_section_topPadding?: number | null;
  web_section_leftPadding?: number | null;
  web_section_rightPadding?: number | null;
  web_section_bottomPadding?: number | null;
  shadow_intensity?: number | null;
  shadow_color?: string | null;
};
export type AlignmentType = "left" | "right" | "center";
export type FontStyleType = "regular" | "bold" | "italic" | "underline";
export type BackgroundConfig = {
  scale_web?: number;
  scale?: number;
  background_lottie?: string;
  mobile_background_lottie?: string;
  is_background_lottie?: boolean;
  lottie_loop?: boolean;
  web_lottie_loop?: boolean;
  mobile_width?: number | null;
  web_width?: number | null;
  desktop_position?:
    | "center"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "bottom"
    | null;
  mobile_position?:
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | null;
  background_color?: string | null;
  web_background_color?: string | null;
  background_image?: string | null;
  background_topMargin?: number | null;
  background_bottomMargin?: number | null;
  background_leftMargin?: number | null;
  background_rightMargin?: number | null;
  web_background_leftMargin?: number | null;
  web_background_rightMargin?: number | null;
  web_background_topMargin?: number | null;
  web_background_bottomMargin?: number | null;
  mobile_background_image?: string | null;
  background_video?: string | null;
  mobile_background_video?: string | null;
  is_background_video?: true | null;
  web_corner_radius?: number | null;
  corner_radius?: number | null;
  redirection_url?: string;
  web_redirection_url?: string;
  background_image_aspect_ratio?: number | null;
  mobile_image_aspect_ratio?: number | null;
  web_gradient_direction?: "HORIZONTAL" | "VERTICAL";
  gradient_direction?: "HORIZONTAL" | "VERTICAL";
};

export type POSITION_ITEM_BACKEND = {
  section_type?: string;
  border?: boolean;
  section_border?: boolean;
  web_border?: boolean;
  web_section_border?: boolean;
  position?: number;
  component_type?: BANNER_TYPES;
  header_config?: HandlingErrorTempBeforeLaunch | null;
  sub_header_config?: HandlingErrorTempBeforeLaunch | null;
  footer_config?: HandlingErrorTempBeforeLaunch | null;
  background_image?: NullableString;
  mobile_background_image?: NullableString;
  section_heading?: NullableString;
  section_filters?: string[];
  is_section_clickable?: boolean;
  extra_info?: ExtraConfig | null;
  data?: any;
  data_type?: any; //Change this later
  component_config?: CarouselGridConfig | null;
  background_config?: BackgroundConfig | null;
  numOptions?: number | null;
  callBack?: ((data: any) => void) | null;
  genderPosition?: "centered" | "left" | "right" | null;
  defVal?: string | null;
};
export type ExtraConfig = {
  timeout?: string;
  timer_text?: string;
  timer_font_size?: number;
  timer_font_weight?: "semibold" | "bold" | "regular";
  timer_text_position?: "left" | "top" | "right" | "bottom";
  timer_dots_color?: string;
  timer_text_font?: boolean;
  timer_bg_color?: string;
  timer_gap?: number;
  timer_type?: string;
  bg_color?: string;
  timer_color?: string; // Added for "#a7a7a7"
  timer_text_color?: string; // Added for "#FFFFFF"
  cta_config?: CtaConfigProps;
  child_data_type?: any;
  page_size?: number;
  child_component_config?: CarouselGridConfig;
  is_product_filter?: boolean;
  accent_color?: string; // Optional accent color for the card
  dots_inside?: boolean;
  web_dots_inside?: boolean;
  elements_inside?: boolean;
  web_elements_inside?: boolean;
  content_topPadding?: number;
  content_leftPadding?: number;
  content_rightPadding?: number;
  content_bottomPadding?: number;
  web_content_topPadding?: number;
  web_content_leftPadding?: number;
  web_content_rightPadding?: number;
  web_content_bottomPadding?: number;
};

export type CtaConfigProps = {
  text?: string;
  style?: FontStyleType;
  position?: AlignmentType;
  alignment?: AlignmentType;
  font_size?: number;
  background_color?: string;
  font_color?: string;
  bottomMargin?: number;
  topMargin?: number;
  letter_spacing?: number;
  width: number;
  horizontalPadding: number;
  verticalPadding: number;
  cornerRadius: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dotted" | "dashed";
  web_text?: string;
  web_style?: FontStyleType;
  web_position?: AlignmentType;
  web_alignment?: AlignmentType;
  web_font_size?: number;
  web_background_color?: string;
  web_font_color?: string;
  web_bottomMargin?: number;
  web_topMargin?: number;
  web_letter_spacing?: number;
  web_width: number;
  web_horizontalPadding: number;
  web_verticalPadding: number;
  web_cornerRadius: number;
  web_borderWidth: number;
  web_borderColor: string;
  web_borderStyle: "solid" | "dotted" | "dashed";
};

export interface POSITION_ITEM_FRONTEND extends POSITION_ITEM_BACKEND {
  size: ScreenSize;
  heartOnClick?: (product: any, h: any, setH: any) => void;
  default_components?: Record<string, React.ReactNode>;
}

//For now this is for Bell Carousel
export type BANNER_ITEM_BACKEND = {
  pk: number;
  name?: NullableString;
  brand?: NullableString;
  division?: NullableString;
  category?: NullableString;
  image_web?: string;
  image_mobile?: string;
  product_type?: NullableString;
  sub_category?: NullableString;
  offers?: boolean;
  offer_id?: NullableString;
  tags?: string[];
  quick_filter_tags?: string[];
  footer?: NullableString;
  coupon_code?: NullableString;
  // "child_banners": [],
  is_clickable: boolean;
  max_price?: number;
  min_price?: number;
  // uptooff: string;
  redirection_url?: NullableString;
  extra_attributes?: EXTRA_ATTRIBUTES;
};

export type EXTRA_ATTRIBUTES = {
  lottie_web?: string;
  lottie_mobile?: string;
  video_web?: string;
  video_mobile?: string;
  web_aspect_ratio?: number;
  mobile_aspect_ratio?: number;
  web_redirection_url?: string;
  mobile_redirection_url?: string;
  show_subscription_popup?: boolean;
};
export interface BANNER_ITEM_FRONTEND extends BANNER_ITEM_BACKEND {
  size: ScreenSize;
}

export type HandlingErrorTempBeforeLaunch = {
  icon?: string;
  text?: string;
  web_text?: string;
  image?: string;
  web_image?: string;
  style?: string;
  font_size?: number | null;
  web_font_size?: string | number | null;
  position?: string;
  font_color?: string;
  background_color?: string;
  bottomMargin?: number;
  topMargin?: number;
  web_bottomMargin?: number;
  web_topMargin?: number;
  redirection_url?: string;
  web_redirection_url?: string;
  width?: number;
  web_width?: number;
};
export type CATEGORIES = {
  name?: string;
  image?: string;
  title?: string;
  quick_filter_tags?: string[];
  filter_id?: string;
};
export type REELSDATA = {
  id: 12;
  caption: string;
  creator: {
    name: string;
    dp: string;
    handle: string;
  };
  type: "image" | "video" | null;
  likes_count: number;
  clicks_count: number;
  unique_clicks_count: number;
  views_count: number;
  thumbnail_url: string;
  url: string;
  create_date: string;
  post_id: string;
  name?: NullableString;
  footer?: NullableString;
  filter_id?: string;
};

export type CREATORBASEINFO = {
  handle: string;
  display_name: string;
  bio: string;
  area_of_interest: string[];
  dp: string;
};

"use client"
import { CouponBanner } from "@/lib/ui-lib/src/components/BannerComponents";
import { GenericComponent } from "@/lib/ui-lib/src/components/BannerComponents/GenericComponent";
import { POSITION_ITEM_FRONTEND } from "@/utils";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

function ComponentGetter({
  component_type = "notFound",
  children,
  default_components = {},
  ...rest
}: POSITION_ITEM_FRONTEND & PropsWithChildren) {
  const router = useRouter();
  const [showCoupon, setShowCoupon] = useState(false);
  const handleSkipClick = () => {
    sessionStorage.setItem(`coupon ${router.asPath}`, "true");
    setShowCoupon(false);
  };

  useEffect(() => {
    const isShowCoupon = sessionStorage.getItem(`coupon ${router.asPath}`);

    if (isShowCoupon) {
      setShowCoupon(false);
    } else {
      setShowCoupon(true);
    }
  }, [router.asPath]);

  if (component_type == "Generic")
    return <GenericComponent {...rest} component_type={component_type} />;
  if (component_type == "Coupon") {
    if (showCoupon) {
      return (
        <CouponBanner
          {...rest}
          component_type={component_type}
          callBack={(data) => {
            handleSkipClick();
          }}
        />
      );
    }
    return null;
  }
  if (component_type === "Default") {
    return children;
  } else {
    return default_components?.[component_type] ?? <></>;
  }
  return <></>;
}
export default ComponentGetter;

import { POSITION_ITEM_BACKEND, ScreenSize } from "@/utils";
import dynamic from "next/dynamic";
import React, { useRef } from "react";

const Component = dynamic(() => import("./ComponentGetter"), {
  ssr: false,
  loading: () => <></>,
});

function AllComponents({
  data,
  size,
  callBack,
  children,
  default_components = {},
}: {
  initialPageNumber?: number;
  pageName: string;
  subPageName?: string;
  brand_name?: string;
  division?: string;
  queryString?: string;
  data: POSITION_ITEM_BACKEND[];
  size: ScreenSize;
  hasNext?: boolean;
  callBack?: (val: any) => void;
  children?: React.ReactNode;
  default_components?: Record<string, React.ReactNode>;
}) {

  const bottomRef = useRef<HTMLDivElement | null>(null);


  if (data?.length == 0)
    return (
      <>
        {children}
        <div ref={bottomRef} className="h-1 flex w-full"></div>
      </>
    );
  return (
    <div className="flex flex-col w-full">
      {data?.map((bannerData, key: number) => {
        const dataCount = Number(bannerData?.data_type?.data_count);
        if (Array.isArray(bannerData?.data) && dataCount > 0) {
          bannerData.data = bannerData?.data.slice(0, dataCount);
        }
        return (
          <Component
            {...bannerData}
            callBack={callBack}
            size={size}
            key={key}
            default_components={default_components}
          >
            {children}
          </Component>
        );
      })}
      <div ref={bottomRef} className="h-1 flex w-full"></div>
    </div>
  );
}

export default AllComponents;

"use client"
import AllComponents from "@/components/BannerComps/AllComponent";
import useScreenSize from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();
  const screenSize = useScreenSize();
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // TODO Verify origin 
      // if (event.origin !== "https://your-sender-domain.com") return;
      console.log("Received message:", event.data);
      setData(event.data);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  useEffect(() => { loadData() }, [])
  const loadData = async () => {
    try {
      const res = await fetch("/mockData.json");
      const data = await res.json();
      setData(data.data?.data);
    } catch (error) {
    }

  }
  return (
    <div className="text-primaryBlack w-full pb-20 bg-primaryWhite h-full min-h-screen">
      <div className={"w-full"}>
        <AllComponents
          data={data}
          size={screenSize}
          pageName="home"
        />
      </div>
    </div>
  );
}

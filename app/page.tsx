"use client"
import AllComponents from "@/components/BannerComps/AllComponent"
import { ViewToggleButton } from "@/components/Others/view-toggle-button"
import { ResponsiveControls } from "@/components/Others/responsive-controls"
import { useEffect, useState } from "react"

export default function Home() {
  const [data, setData] = useState<any>()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [customWidth, setCustomWidth] = useState<number | null>(null)
  const [bgColor, setBgColor] = useState("#ffffff")

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // TODO Verify origin
      // if (event.origin !== "https://your-sender-domain.com") return;
      console.log("Received message:", event.data)
      setData(event.data)
    }

    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  const handleToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setData((prev) => {
        const isMobile = prev?.size == "sm"
        return {
          ...prev,
          size: isMobile ? "lg" : "sm",
          width: isMobile ? "1280px" : "390px",
        }
      })
      setIsTransitioning(false)
    }, 300)
  }

  const effectiveWidth = customWidth ? `${customWidth}px` : data?.width
  const effectiveWidthNum = customWidth || Number(data?.width?.slice(0, -2))

  return (
    <div className="text-primaryBlack w-full pb-20 bg-primaryWhite h-full min-h-screen">
      <div className="px-6 mx-auto">
        {/* Header with toggle button */}


        <ResponsiveControls
          isWebView={data?.size == "lg"}
          customWidth={customWidth}
          onWidthChange={setCustomWidth}
          bgColor={bgColor}
          onBgColorChange={setBgColor}
          effectiveWidthNum={effectiveWidthNum}
          handleToggle={handleToggle}
        />

        {/* Preview container with transition effects */}
        <div
          style={{
            width: effectiveWidth,
            background: `linear-gradient(to right, ${bgColor})`,
          }}
          className={`transition-all duration-300 rounded-lg shadow-lg bg-card overflow-hidden relative ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
        >
          {isTransitioning && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm z-50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground font-medium">
                  Switching to {data?.size == "lg" ? "mobile" : "web"} view...
                </p>
              </div>
            </div>
          )}

          <AllComponents data={data?.data} size={data?.size} pageName="home" parentWidth={effectiveWidthNum} />
        </div>
      </div>
    </div>
  )
}

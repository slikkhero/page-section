"use client"
import { useState } from "react"
import { ChevronDown, Palette, Maximize2, Monitor, Smartphone } from "lucide-react"

interface ResponsiveControlsProps {
  customWidth: number | null
  onWidthChange: (width: number | null) => void
  bgColor: string
  onBgColorChange: (color: string) => void
  effectiveWidthNum: number
  isWebView: boolean
  handleToggle: () => void
}

const BG_PRESETS = [
  { name: "White", value: "#ffffff" },
  { name: "Snow", value: "#f9fafb" },       // soft off-white
  { name: "Ash", value: "#e5e7eb" },        // clean light gray
  { name: "Smoke", value: "#d1d5db" },      // balanced neutral gray
  { name: "Graphite", value: "#374151" },   // rich dark gray
  { name: "Charcoal", value: "#111827" },    // deep contrast for text or bg
  { name: "LGTV", value: "#E40303, #FF8C00, #FFED00, #008026, #004DFF, #750787" },
]

export function ResponsiveControls({
  customWidth,
  onWidthChange,
  bgColor,
  onBgColorChange,
  effectiveWidthNum,
  isWebView,
  handleToggle,
}: ResponsiveControlsProps) {
  const [showControls, setShowControls] = useState(false)

  return (
    <div className="sticky top-0 z-40 mb-6">
      <div className="bg-background/80 backdrop-blur-md shadow-md rounded-lg overflow-hidden">
        {/* Header with title and toggle button */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Maximize2 size={16} className="text-foreground/70" />
            <span className="text-sm font-semibold text-foreground">Preview Controls</span>
          </div>
          <button
            onClick={handleToggle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            aria-label={`Switch to ${isWebView ? "mobile" : "web"} view`}
            title={`Currently viewing ${isWebView ? "web" : "mobile"} - Click to switch`}
          >
            <Monitor
              size={16}
              className={`transition-opacity duration-200 ${isWebView ? "opacity-100" : "opacity-40"}`}
            />
            <span className="text-xs font-medium text-foreground/60">|</span>
            <Smartphone
              size={16}
              className={`transition-opacity duration-200 ${!isWebView ? "opacity-100" : "opacity-40"}`}
            />
          </button>
        </div>

        {/* Collapsible controls section */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-background/60 transition-colors"
        >
          <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
            {showControls ? "Hide" : "Show"} Options
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 text-foreground/60 ${showControls ? "rotate-180" : ""}`}
          />
        </button>

        {showControls && (
          <div className="px-4 py-3 space-y-4">
            {/* Width slider - compact layout */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
                  Width: {effectiveWidthNum}px
                </label>
                <button
                  onClick={() => onWidthChange(null)}
                  className="text-xs px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 text-foreground/70 hover:text-foreground transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
              <input
                type="range"
                min="390"
                max="1920"
                value={effectiveWidthNum}
                onChange={(e) => onWidthChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-foreground range-minimal"
              />
              <div className="flex justify-between text-xs text-foreground/50">
                <span>390px</span>
                <span>1920px</span>
              </div>
            </div>

            {/* Background color picker - compact layout */}
            <div className="space-y-2 flex justify-between">

              <div className="flex items-center gap-4">
                <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                  <Palette size={14} />
                  Background
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => onBgColorChange(e.target.value)}
                  className="w-10 h-8 rounded cursor-pointer bg-background border border-foreground/20 hover:border-foreground/40 transition-colors"
                />
                <span className="text-xs text-foreground/60 font-mono">{bgColor}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BG_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => onBgColorChange(preset.value)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${bgColor === preset.value
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                      }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { Monitor, Smartphone } from "lucide-react"

interface ViewToggleButtonProps {
  isWebView: boolean
  onToggle: () => void
}

export function ViewToggleButton({ isWebView, onToggle }: ViewToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      aria-label={`Switch to ${isWebView ? "mobile" : "web"} view`}
      title={`Currently viewing ${isWebView ? "web" : "mobile"} - Click to switch`}
    >
      <div className="flex items-center gap-1">
        <Monitor size={18} className={`transition-opacity duration-200 ${isWebView ? "opacity-100" : "opacity-40"}`} />
        <span className="text-xs font-semibold text-muted-foreground">|</span>
        <Smartphone
          size={18}
          className={`transition-opacity duration-200 ${!isWebView ? "opacity-100" : "opacity-40"}`}
        />
      </div>
    </button>
  )
}

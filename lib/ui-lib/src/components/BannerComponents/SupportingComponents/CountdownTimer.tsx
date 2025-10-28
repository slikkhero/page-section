"use client";

import { ExtraConfig, ScreenSize } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function CountdownTimer({
  size,
  timer_scale = 1, // NEW prop for scaling digits
  listing,
  config,
  makeDark = true,
}: {
  config: ExtraConfig;
  size: ScreenSize;
  timer_scale?: number;
  listing?: boolean;
  makeDark?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(config.timeout || "").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.timeout]);

  const padNumber = (num: number) => num.toString().padStart(2, "0");

  const timerTextStyle = {
    fontSize:
      size === "lg"
        ? `${(config.timer_font_size || 10) * 1.5}px`
        : `${config.timer_font_size}px`,
    fontWeight: config?.timer_font_weight || "semibold",
    color: config.timer_text_color || "#FFFFFF",
  };

  const getFlexDirection = (position: string) => {
    switch (position) {
      case "left":
        return "flex-row";
      case "right":
        return "flex-row-reverse";
      case "top":
        return "flex-col";
      case "bottom":
      default:
        return "flex-col-reverse";
    }
  };

  const getTextAlign = (position: string) => {
    switch (position) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      case "top":
      case "bottom":
      default:
        return "text-center";
    }
  };
  const timerBgColor = config.timer_bg_color || "#0F2BFF";
  // Function to darken a hex color by 50%
  const darkenColor = (hexColor, percentage) => {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = Math.max(0, (rgb >> 16) * (1 - percentage));
    const g = Math.max(0, ((rgb >> 8) & 0x00ff) * (1 - percentage));
    const b = Math.max(0, (rgb & 0x0000ff) * (1 - percentage));
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  };
  const darkerColor = makeDark ? darkenColor(timerBgColor, 0.5) : timerBgColor;

  // Create a gradient where the first color occupies 0% to 50% and the darker color 50% to 100%
  const gradientBackground = `linear-gradient(to bottom, ${timerBgColor} 0%, ${timerBgColor} 50%, ${darkerColor} 50%, ${darkerColor} 100%)`;

  return (
    <div
      className={`w-full ${
        size === "lg" ? "w-11/12" : "max-w-lg"
      } ${listing ? "p-2 sm:p-0 md:rounded-sm" : "mx-auto px-4 py-2 md:rounded-lg"}`}
      style={{ backgroundColor: config.bg_color || "transparent" }}
    >
      <div
        className={`flex ${listing ? `py-1 px-2 justify-center items-center ${config?.timer_text_position == "right" ? "sm:justify-end" : "sm:justify-start"} sm:items-baseline` : "justify-center items-center"}  ${getFlexDirection(
          config.timer_text_position || "left"
        )}`}
        style={{ gap: config.timer_gap }}
      >
        <p
          className={`${getTextAlign(config.timer_text_position || "left")}`}
          style={timerTextStyle}
        >
          {config.timer_text}
        </p>
        <div className="flex" style={{ gap: 4 * timer_scale }}>
          {["days", "hours", "minutes", "seconds"]
            .filter((unit) => !(unit === "days" && timeLeft.days === 0))
            .map((unit, index, arr) => (
              <>
                <div
                  key={unit}
                  className={clsx(
                    `text-center ${listing ? "mb-0" : "mb-4"} sm:mb-0`,
                    size == "sm" && `w-[${64 * timer_scale}px]`
                  )}
                >
                  <div className="flex gap-1 justify-center">
                    {padNumber(timeLeft[unit as keyof typeof timeLeft])
                      .split("")
                      .map((digit, i) => (
                        <div
                          key={i}
                          className="font-bold flex items-center justify-center"
                          style={{
                            fontSize: (size === "lg" ? 48 : 24) * timer_scale,
                            width: (size === "lg" ? 56 : 32) * timer_scale,
                            height: (size === "lg" ? 80 : 48) * timer_scale,
                            background: gradientBackground,
                            color: config.timer_color || "#a7a7a7",
                            borderRadius: 4 * timer_scale,
                          }}
                        >
                          {digit}
                        </div>
                      ))}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      color: config.timer_text_color || "#FFFFFF",
                      fontSize:
                        size === "lg"
                          ? (config.timer_font_size || 32) / 1.5
                          : (config.timer_font_size || 32) / (listing ? 1.5 : 2),
                    }}
                  >
                    {unit.toUpperCase()}
                  </div>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex items-start justify-center">
                    <span
                      style={{
                        fontSize: (size === "lg" ? 48 : 24) * timer_scale,
                        fontWeight: "bold",
                        color: config.timer_dots_color || "#a7a7a7",
                        padding: `0 ${2 * timer_scale}px`,
                      }}
                    >
                      :
                    </span>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

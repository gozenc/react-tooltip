import { createElement, useState, useRef, useEffect, useCallback } from "react";
import TOOLTIP_STYLES from "./style.css?inline";

export type TooltipProps = {
  content: string;
  position?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  className?: string;
  offset?: number;
  delay?: number;
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg";
};

const STYLE_ID = "gtt-styles";

// Inject styles only once globally
function injectTooltipStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ID;
  styleElement.textContent = TOOLTIP_STYLES;
  document.head.appendChild(styleElement);
}

// Inject styles immediately when module loads
injectTooltipStyles();

export function Tooltip(props: React.PropsWithChildren<TooltipProps>) {
  const {
    children,
    content,
    position: tooltipPosition = "top",
    className = "",
    offset = 8,
    delay = 200,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized position calculation
  const calculatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const newPosition = calculateTooltipPosition(
      wrapperRect,
      tooltipRect,
      tooltipPosition,
      offset
    );

    setCoords(newPosition);
  }, [tooltipPosition, offset]);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  // Memoized event handlers
  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const tooltipClasses = `gttc ${isVisible ? "gttv" : ""}`;
  const arrowClasses = `gtta gtta${
    tooltipPosition.includes("-")
      ? tooltipPosition.split("-").reduce((acc, curr) => acc + curr[0], "")
      : tooltipPosition[0]
  }`;

  return createElement(
    "span",
    {
      ref: wrapperRef,
      className: `gttw ${className}`,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    children,
    createElement(
      "div",
      {
        ref: tooltipRef,
        className: tooltipClasses,
        style: { top: `${coords.top}px`, left: `${coords.left}px` },
      },
      content,
      createElement("div", { className: arrowClasses })
    )
  );
}

// Extract position calculation logic outside component
function calculateTooltipPosition(
  wrapperRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipProps["position"],
  offset: number
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  switch (position) {
    case "top":
      top = -(tooltipRect.height + offset);
      left = (wrapperRect.width - tooltipRect.width) / 2;
      break;
    case "bottom":
      top = wrapperRect.height + offset;
      left = (wrapperRect.width - tooltipRect.width) / 2;
      break;
    case "left":
      top = (wrapperRect.height - tooltipRect.height) / 2;
      left = -(tooltipRect.width + offset);
      break;
    case "right":
      top = (wrapperRect.height - tooltipRect.height) / 2;
      left = wrapperRect.width + offset;
      break;
    case "top-left":
      top = -(tooltipRect.height + offset / 2);
      left = -(tooltipRect.width + offset / 2);
      break;
    case "top-right":
      top = -(tooltipRect.height + offset / 2);
      left = wrapperRect.width + offset / 2;
      break;
    case "bottom-left":
      top = wrapperRect.height + offset / 2;
      left = -(tooltipRect.width + offset / 2);
      break;
    case "bottom-right":
      top = wrapperRect.height + offset / 2;
      left = wrapperRect.width + offset / 2;
      break;
  }

  return { top, left };
}

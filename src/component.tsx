import { useState, useRef, useEffect, useCallback } from "react";

export type TooltipProps = {
  content: string;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  offset?: number;
  delay?: number;
};

/**
 * Minified CSS class names for reduced bundle size:
 * .gttw  = tooltip-wrapper
 * .gttc  = tooltip-content
 * .gttv  = tooltip-visible
 * .gtta  = tooltip-arrow
 * .gttat = tooltip-arrow-top
 * .gttab = tooltip-arrow-bottom
 * .gttal = tooltip-arrow-left
 * .gttar = tooltip-arrow-right
 */
const TOOLTIP_STYLES = `.gttw{position:relative;display:inline-block}.gttc{position:absolute;background-color:#333;color:#fff;padding:8px 12px;border-radius:4px;font-size:14px;white-space:nowrap;z-index:1000;pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.gttc.gttv{opacity:1}.gtta{position:absolute;width:0;height:0;border-style:solid}.gttat{bottom:-6px;left:50%;transform:translateX(-50%);border-width:6px 6px 0 6px;border-color:#333 transparent transparent transparent}.gttab{top:-6px;left:50%;transform:translateX(-50%);border-width:0 6px 6px 6px;border-color:transparent transparent #333 transparent}.gttal{right:-6px;top:50%;transform:translateY(-50%);border-width:6px 0 6px 6px;border-color:transparent transparent transparent #333}.gttar{left:-6px;top:50%;transform:translateY(-50%);border-width:6px 6px 6px 0;border-color:transparent #333 transparent transparent}`;

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
  const arrowClasses = `gtta gtta${tooltipPosition[0]}`;

  return (
    <span
      ref={wrapperRef}
      className={`gttw ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={tooltipRef}
        className={tooltipClasses}
        style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
      >
        {content}
        <div className={arrowClasses} />
      </div>
    </span>
  );
}

// Extract position calculation logic outside component
function calculateTooltipPosition(
  wrapperRect: DOMRect,
  tooltipRect: DOMRect,
  position: "top" | "right" | "bottom" | "left",
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
  }

  return { top, left };
}

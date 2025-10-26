export type TooltipProps = {
    content: string;
    position?: "top" | "right" | "bottom" | "left";
    className?: string;
    offset?: number;
    delay?: number;
};
export declare function Tooltip(props: React.PropsWithChildren<TooltipProps>): import('react').DetailedReactHTMLElement<{
    ref: import('react').RefObject<HTMLSpanElement | null>;
    className: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}, HTMLSpanElement>;
//# sourceMappingURL=component.d.ts.map
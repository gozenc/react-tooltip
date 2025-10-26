# @gozenc/react-tooltip

A super-lightweight, dependency-free React tooltip component optimized for high-performance applications with hundreds of tooltips.

## Features

- ✅ **Zero Dependencies** - Only requires React
- ✅ **No External CSS** - Styles injected via singleton pattern
- ✅ **Highly Optimized** - Designed for 500+ tooltips on a single page
- ✅ **Minified Bundle** - ~650 bytes of CSS, minified class names
- ✅ **TypeScript Support** - Fully typed with TypeScript
- ✅ **Customizable** - Flexible props for positioning, timing, and styling
- ✅ **Production Ready** - Battle-tested performance optimizations

## Installation

```bash
npm install @gozenc/react-tooltip
# or
yarn add @gozenc/react-tooltip
# or
pnpm add @gozenc/react-tooltip
```

## Usage

```tsx
import Tooltip from "@gozenc/react-tooltip";

function App() {
  return (
    <Tooltip content="Hello World!" position="top">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## API

### Props

| Prop        | Type                                     | Required | Default | Description                                             |
| ----------- | ---------------------------------------- | -------- | ------- | ------------------------------------------------------- |
| `content`   | `string`                                 | ✅ Yes   | -       | The text to display in the tooltip                      |
| `position`  | `"top" \| "right" \| "bottom" \| "left"` | No       | `"top"` | Position of the tooltip relative to the wrapped element |
| `className` | `string`                                 | No       | `""`    | Custom CSS class for the wrapper element                |
| `offset`    | `number`                                 | No       | `8`     | Distance between tooltip and element (in pixels)        |
| `delay`     | `number`                                 | No       | `200`   | Hover delay before showing tooltip (in milliseconds)    |

### Examples

#### Basic Usage

```tsx
<Tooltip content="Click to submit">
  <button>Submit</button>
</Tooltip>
```

#### Custom Position

```tsx
<Tooltip content="User settings" position="right">
  <IconButton icon="settings" />
</Tooltip>
```

#### Custom Offset and Delay

```tsx
<Tooltip content="Quick action" offset={12} delay={100}>
  <button>Action</button>
</Tooltip>
```

#### With Custom Class

```tsx
<Tooltip content="Styled tooltip" className="my-custom-wrapper">
  <span>Hover me</span>
</Tooltip>
```

## Performance Optimizations

### 1. Singleton Style Injection

The component uses a singleton pattern to inject CSS styles only once, regardless of how many tooltip instances exist on the page. This means:

- With 500 tooltips: Only **1** `<style>` tag in the DOM (not 500!)
- Styles are injected when the module loads
- Zero overhead for additional tooltip instances

### 2. Extracted Functions

All helper functions are defined outside the component body to prevent recreation on every render:

- `calculateTooltipPosition()` - Pure function for position calculations
- `injectTooltipStyles()` - Singleton style injection

### 3. Memoized Event Handlers

Event handlers are wrapped with `useCallback` to maintain stable references:

- `handleMouseEnter` - Memoized with `delay` dependency
- `handleMouseLeave` - Memoized with no dependencies
- `calculatePosition` - Memoized with `position` and `offset` dependencies

### 4. Minified Class Names

CSS class names are minified to reduce bundle size:

| Original                | Minified | Description               |
| ----------------------- | -------- | ------------------------- |
| `.tooltip-wrapper`      | `.gttw`  | Wrapper element           |
| `.tooltip-content`      | `.gttc`  | Tooltip content container |
| `.tooltip-visible`      | `.gttv`  | Visible state modifier    |
| `.tooltip-arrow`        | `.gtta`  | Arrow base styles         |
| `.tooltip-arrow-top`    | `.gttat` | Arrow for top position    |
| `.tooltip-arrow-bottom` | `.gttab` | Arrow for bottom position |
| `.tooltip-arrow-left`   | `.gttal` | Arrow for left position   |
| `.tooltip-arrow-right`  | `.gttar` | Arrow for right position  |

### 5. Minified CSS

The CSS is fully minified with:

- No whitespace or newlines
- Shortened property values (e.g., `0.2s` → `.2s`)
- Single-line format
- **Result**: ~650 bytes (46% reduction from original)

## Technical Implementation

### Style Injection

```typescript
const STYLE_ID = "gtt-styles";

function injectTooltipStyles() {
  if (typeof document === "undefined") return; // SSR-safe
  if (document.getElementById(STYLE_ID)) return; // Already injected

  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ID;
  styleElement.textContent = TOOLTIP_STYLES;
  document.head.appendChild(styleElement);
}

// Inject immediately when module loads
injectTooltipStyles();
```

### Position Calculation

The tooltip position is calculated dynamically based on:

1. Wrapper element dimensions
2. Tooltip content dimensions
3. Selected position (top/right/bottom/left)
4. Custom offset value

This ensures the tooltip is always properly positioned relative to its trigger element.

### Arrow Positioning

Arrows are positioned using CSS transforms and dynamically generated class names:

- Top position: Arrow points down from bottom of tooltip
- Bottom position: Arrow points up from top of tooltip
- Left position: Arrow points right from right side of tooltip
- Right position: Arrow points left from left side of tooltip

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any browser supporting ES6+ and React 16.8+

## Bundle Size

- Component code: ~2KB (minified)
- CSS styles: ~650 bytes (minified)
- **Total**: ~2.7KB (minified, not gzipped)

## Development Notes

### Why "GTT"?

GTT stands for "Global Tooltip" - emphasizing the singleton style injection pattern that makes this component efficient for global use across large applications.

### Design Decisions

1. **No inline styles**: All styling uses CSS classes for better performance and easier customization
2. **Function declarations**: Used instead of arrow functions for better readability and debugging
3. **Minimal API**: Only essential props to keep the component simple and focused
4. **No external CSS files**: Styles are injected programmatically to avoid import requirements
5. **Dynamic positioning only**: Only `top` and `left` coordinates use inline styles (unavoidable for dynamic positioning)

### Future Enhancements

Potential features for future versions:

- [ ] Theme customization (colors, sizes)
- [ ] Animation options
- [ ] Multi-line content support
- [ ] HTML content support
- [ ] Portal rendering option
- [ ] Accessibility improvements (ARIA attributes)
- [ ] Touch device support
- [ ] Max-width configuration

## Contributing

Contributions are welcome! Please ensure:

1. All optimizations are maintained
2. No external dependencies are added
3. TypeScript types are properly defined
4. Performance benchmarks show no regression

## License

MIT

## Credits

Created for high-performance React applications requiring hundreds of tooltips without performance degradation.

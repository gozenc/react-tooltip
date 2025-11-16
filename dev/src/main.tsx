import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Tooltip } from "../../src";

export function App() {
  return (
    <div className="container">
      <h1>@gozenc/react-tooltip</h1>
      <p>A super-lightweight, dependency-free React tooltip component</p>

      <div className="demo-section">
        <h2>Default Tooltip</h2>
        <div className="tooltip-row">
          <Tooltip content="This is a tooltip!">
            <button>Hover me</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Different Positions</h2>
        <div className="tooltip-row">
          <Tooltip content="Top Left tooltip" position="top-left">
            <button>Top left</button>
          </Tooltip>
          <Tooltip content="Top very very long tooltip" position="top">
            <button>Top</button>
          </Tooltip>
          <Tooltip content="Top Right tooltip" position="top-right">
            <button>Top Right</button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <button>Right</button>
          </Tooltip>
          <Tooltip content="Bottom Right tooltip" position="bottom-right">
            <button>Bottom Right</button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <button>Bottom</button>
          </Tooltip>
          <Tooltip content="Bottom Left tooltip" position="bottom-left">
            <button>Bottom Left</button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <button>Left</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Custom Offset & Delay</h2>
        <div className="tooltip-row">
          <Tooltip content="Offset 4px" offset={4}>
            <button>Small offset</button>
          </Tooltip>
          <Tooltip content="Offset 16px" offset={16}>
            <button>Large offset</button>
          </Tooltip>
          <Tooltip content="No delay" delay={0}>
            <button>Instant</button>
          </Tooltip>
          <Tooltip content="500ms delay" delay={500}>
            <button>Slow</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Variants</h2>
        <div className="tooltip-row">
          <Tooltip content="Dark variant (default)" variant="dark">
            <button>Dark</button>
          </Tooltip>
          <Tooltip content="Light variant" variant="light">
            <button>Light</button>
          </Tooltip>
          <Tooltip content="Light top-left" variant="light" position="top-left">
            <button>Light top-left</button>
          </Tooltip>
          <Tooltip
            content="Light bottom-right"
            variant="light"
            position="bottom-right"
          >
            <button>Light bottom-right</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Sizes</h2>
        <div className="tooltip-row">
          <Tooltip content="Extra small" size="xs">
            <button>XS</button>
          </Tooltip>
          <Tooltip content="Small" size="sm">
            <button>SM</button>
          </Tooltip>
          <Tooltip content="Medium (default)" size="md">
            <button>MD</button>
          </Tooltip>
          <Tooltip content="Large" size="lg">
            <button>LG</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Size + Variant Combinations</h2>
        <div className="tooltip-row">
          <Tooltip content="XS Light" size="xs" variant="light">
            <button>XS Light</button>
          </Tooltip>
          <Tooltip content="LG Dark" size="lg" variant="dark">
            <button>LG Dark</button>
          </Tooltip>
          <Tooltip
            content="SM Light bottom-right"
            size="sm"
            variant="light"
            position="bottom-right"
          >
            <button>SM Light corner</button>
          </Tooltip>
        </div>
      </div>

      <div className="demo-section">
        <h2>Multiple Tooltips</h2>
        <div className="tooltip-grid">
          {Array.from({ length: 20 }, (_, i) => (
            <Tooltip key={i} content={`Tooltip #${i + 1}`}>
              <button>Item {i + 1}</button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

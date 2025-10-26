import { useState as w, useRef as d, useCallback as u, useEffect as M, createElement as f } from "react";
const y = "gtt-styles";
function Y(r) {
  const { children: v, content: k, position: i = "top", className: C = "", offset: h = 8, delay: g = 200 } = r, [p, x] = w(!1), [b, E] = w({ top: 0, left: 0 }), l = d(null), c = d(null), o = d(null), m = u(() => {
    if (!l.current || !c.current) return;
    const T = (function(t, e, z, s) {
      let n = 0, a = 0;
      switch (z) {
        case "top":
          n = -(e.height + s), a = (t.width - e.width) / 2;
          break;
        case "bottom":
          n = t.height + s, a = (t.width - e.width) / 2;
          break;
        case "left":
          n = (t.height - e.height) / 2, a = -(e.width + s);
          break;
        case "right":
          n = (t.height - e.height) / 2, a = t.width + s;
      }
      return { top: n, left: a };
    })(l.current.getBoundingClientRect(), c.current.getBoundingClientRect(), i, h);
    E(T);
  }, [i, h]);
  M(() => {
    p && m();
  }, [p, m]);
  const N = u(() => {
    o.current = setTimeout(() => {
      x(!0);
    }, g);
  }, [g]), $ = u(() => {
    o.current !== null && (clearTimeout(o.current), o.current = null), x(!1);
  }, []), B = "gttc " + (p ? "gttv" : ""), R = `gtta gtta${i[0]}`;
  return f("span", { ref: l, className: `gttw ${C}`, onMouseEnter: N, onMouseLeave: $ }, v, f("div", { ref: c, className: B, style: { top: `${b.top}px`, left: `${b.left}px` } }, k, f("div", { className: R })));
}
(function() {
  if (typeof document > "u" || document.getElementById(y)) return;
  const r = document.createElement("style");
  r.id = y, r.textContent = ".gttw{position:relative;display:inline-block}.gttc{position:absolute;background-color:#333;color:#fff;padding:8px 12px;border-radius:4px;font-size:14px;white-space:nowrap;z-index:1000;pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.gttc.gttv{opacity:1}.gtta{position:absolute;width:0;height:0;border-style:solid}.gttat{bottom:-6px;left:50%;transform:translateX(-50%);border-width:6px 6px 0 6px;border-color:#333 transparent transparent transparent}.gttab{top:-6px;left:50%;transform:translateX(-50%);border-width:0 6px 6px 6px;border-color:transparent transparent #333 transparent}.gttal{right:-6px;top:50%;transform:translateY(-50%);border-width:6px 0 6px 6px;border-color:transparent transparent transparent #333}.gttar{left:-6px;top:50%;transform:translateY(-50%);border-width:6px 6px 6px 0;border-color:transparent #333 transparent transparent}", document.head.appendChild(r);
})();
export {
  Y as Tooltip,
  Y as default
};

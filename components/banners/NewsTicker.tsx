// components/banners/NewsTicker.tsx
"use client";

import { useEffect, useState } from "react";

const NEWS = [
  "СРОЧНО: Синергия достигла нового уровня",
  "Курс инноваций вырос на 300%",
  "Экосистема оптимизировала всё, что могла",
  "Наши решения продолжают решать",
  "Учёные выяснили, что процессы нужно масштабировать",
];

export function NewsTicker() {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const text = NEWS.join("  ★  ");

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        background: "#000",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: 14,
        padding: "4px 0",
        borderTop: "1px solid #333",
        borderBottom: "1px solid #333",
        whiteSpace: "nowrap",
      }}
    >
      {isReduced ? (
        <div style={{ paddingLeft: 16 }}>{text}</div>
      ) : (
        <div
          style={{
            display: "inline-block",
            animation: "marquee 25s linear infinite",
            paddingLeft: "100%",
          }}
        >
          {text}
          {/* Дублируем текст, чтобы не было пустоты при зацикливании */}
          <span style={{ paddingLeft: "100vw" }}>{text}</span>
        </div>
      )}
    </div>
  );
}
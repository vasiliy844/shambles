// components/banners/Banner.tsx
"use client";

import type { BannerData } from "./bannerData";

const SIZES = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  skyscraper: { width: 160, height: 600 },
} as const;

export function Banner({ data }: { data: BannerData }) {
  const { width, height } = SIZES[data.size];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: width,
        margin: "16px auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Крошечный крестик закрытия, который издевается над пользователем */}
      <button
        type="button"
        onClick={(e) => {
          const el = e.currentTarget.parentElement;
          if (el) el.style.display = "none";
        }}
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 16,
          height: 16,
          fontSize: 10,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
        aria-label="Закрыть рекламу"
      >
        ×
      </button>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block", border: "2px dashed #ccc", background: data.bgColor }}
        role="img"
        aria-label={`Реклама: ${data.title}`}
      >
        <rect width={width} height={height} fill={data.bgColor} />
        
        <text
          x={width / 2}
          y={height / 2 - 10}
          textAnchor="middle"
          fill={data.textColor}
          fontSize={data.size === "rectangle" ? 20 : 24}
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          {data.title}
        </text>

        <text
          x={width / 2}
          y={height / 2 + 20}
          textAnchor="middle"
          fill={data.textColor}
          fontSize={14}
          fontFamily="Arial, sans-serif"
        >
          {data.subtitle}
        </text>

        <text
          x={width / 2}
          y={height / 2 + 50}
          textAnchor="middle"
          fill="#000"
          fontSize={12}
          fontFamily="Arial, sans-serif"
          textDecoration="underline"
          style={{ cursor: "pointer" }}
        >
          {data.cta}
        </text>
      </svg>
    </div>
  );
}
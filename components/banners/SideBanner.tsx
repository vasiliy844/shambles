// components/banners/SideBanner.tsx
"use client";

import { useEffect, useState } from "react";
import { Banner } from "./Banner";
import type { BannerData } from "./bannerData";

export function SideBanner({ id }: { id: string }) {
  const [data, setData] = useState<BannerData | null>(null);

  useEffect(() => {
    fetch("/api/banners")
      .then((res) => res.json())
      .then((res: { banners: BannerData[] }) => {
        const found = res.banners.find((b) => b.id === id);
        if (found) setData(found);
      })
      .catch(() => {});
  }, [id]);

  if (!data) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: 100,
        display: "none", // Скрыто по умолчанию
        zIndex: 50,
      }}
      className="side-banner"
    >
      <Banner data={data} />
    </div>
  );
}
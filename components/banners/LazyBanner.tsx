// components/banners/LazyBanner.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Banner } from "./Banner";
import type { BannerData } from "./bannerData";

export function LazyBanner({ id }: { id: string }) {
  const [data, setData] = useState<BannerData | null>(null);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Грузим данные, когда баннер попал в зону видимости
        fetch("/api/banners")
          .then((res) => res.json())
          .then((res: { banners: BannerData[] }) => {
            const found = res.banners.find((b) => b.id === id);
            if (found) setData(found);
            else setError(true);
          })
          .catch(() => setError(true));
      },
      { rootMargin: "200px" } // Начинаем грузить за 200px до появления
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  if (error) return null; // Если реклама не загрузилась — просто скрываем

  return (
    <div ref={ref} style={{ minHeight: 90, margin: "16px 0", display: "flex", justifyContent: "center" }}>
      {data ? (
        <Banner data={data} />
      ) : (
        <div style={{ color: "#999", fontSize: 14, alignSelf: "center" }}>
          Загрузка рекламы...
        </div>
      )}
    </div>
  );
}
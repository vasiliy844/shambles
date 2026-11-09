// components/banners/bannerData.ts
export type BannerSize = "leaderboard" | "rectangle" | "skyscraper";

export interface BannerData {
  id: string;
  size: BannerSize;
  title: string;
  subtitle: string;
  cta: string;
  bgColor: string;
  textColor: string;
}

export const BANNERS: readonly BannerData[] = [
  {
    id: "b1",
    size: "leaderboard",
    title: "КУПИТЕ НАШЕ РЕШЕНИЕ",
    subtitle: "Оно изменит всё. Наверное.",
    cta: "Узнать больше",
    bgColor: "#ffeb3b",
    textColor: "#d32f2f",
  },
  {
    id: "b2",
    size: "rectangle",
    title: "СИНЕРГИЯ 2.0",
    subtitle: "Мы переосмыслили то, что не понимали.",
    cta: "Заказать демо",
    bgColor: "#e0f7fa",
    textColor: "#006064",
  },
  {
    id: "b3",
    size: "leaderboard",
    title: "ПОДПИШИТЕСЬ НА РАССЫЛКУ",
    subtitle: "Мы будем присылать вам что-то.",
    cta: "Подписаться",
    bgColor: "#f3e5f5",
    textColor: "#4a148c",
  },
  {
    id: "b4",
    size: "skyscraper",
    title: "СПЕЦПРЕДЛОЖЕНИЕ",
    subtitle: "Только сегодня.",
    cta: "Жми",
    bgColor: "#ff9800",
    textColor: "#000",
  },
];
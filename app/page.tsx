// app/page.tsx
import { Nonsense } from "@/lib/nonsense/react";
import { EscapeModal } from "@/components/annoyance/EscapeModal";
import { CookieBanner } from "@/components/annoyance/CookieBanner";
import { LazyBanner } from "@/components/banners/LazyBanner";
import { SideBanner } from "@/components/banners/SideBanner";
import { NewsTicker } from "@/components/banners/NewsTicker";
import { CountdownTimer } from "@/components/annoyance/CountdownTimer";

export default function HomePage() {
  return (
    <main>
      <NewsTicker />
      <h1>Главная</h1>
      
      <LazyBanner id="b1" />
      <Nonsense count={5} />
      <LazyBanner id="b2" />
      <Nonsense count={5} />
      <LazyBanner id="b3" />
      
      <SideBanner id="b4" />
      <EscapeModal />
      <CookieBanner />
      <CountdownTimer />
    </main>
  );
}
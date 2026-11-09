// app/page.tsx
import { Nonsense } from "@/lib/nonsense/react";
import { EscapeModal } from "@/components/annoyance/EscapeModal";
import { CookieBanner } from "@/components/annoyance/CookieBanner";

export default function HomePage() {
  return (
    <main>
      <h1>Главная</h1>
      <Nonsense count={5} />
      <EscapeModal />
      <CookieBanner />
    </main>
  );
}
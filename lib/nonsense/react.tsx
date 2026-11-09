"use client";

import { usePathname } from "next/navigation";
import { hashString } from "./rng";
import { generateParagraph } from "./generator";

interface NonsenseProps {
  /** Сколько предложений. По умолчанию 3. */
  count?: number;
  /** Явный seed. Если не задан — берётся из pathname. */
  seed?: number;
}

export function Nonsense({ count = 3, seed }: NonsenseProps) {
  const pathname = usePathname();
  const finalSeed = seed ?? hashString(pathname);
  const sentences = generateParagraph(count, { seed: finalSeed });

  return (
    <div>
      {sentences.map((s) => (
        <p key={s.templateId + s.seed}>{s.text}</p>
      ))}
    </div>
  );
}
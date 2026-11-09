// app/api/nonsense/route.ts
import { NextResponse } from "next/server";
import { generateParagraph } from "@/lib/nonsense/generator";

export const runtime = "edge";

export function GET(request: Request) {
  const url = new URL(request.url);
  const countParam = url.searchParams.get("count");
  const count = countParam ? Math.min(Number(countParam), 20) : 3;
  const seedParam = url.searchParams.get("seed");
  const seed = seedParam ? Number(seedParam) : undefined;

  const sentences = generateParagraph(count, { seed });

  return NextResponse.json({ sentences });
}
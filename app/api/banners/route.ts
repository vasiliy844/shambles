// app/api/banners/route.ts
import { NextResponse } from "next/server";
import { BANNERS } from "@/components/banners/bannerData";

export const runtime = "edge";

export async function GET() {
  // Имитация задержки сети, чтобы показать, что мы умеем делать лоадеры.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({ banners: BANNERS });
}
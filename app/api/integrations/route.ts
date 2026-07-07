import { NextResponse } from "next/server";
import { integrations } from "@/lib/api-data";

export function GET() {
  return NextResponse.json({
    data: integrations,
    meta: {
      mode: "demo",
      count: integrations.length,
    },
  });
}

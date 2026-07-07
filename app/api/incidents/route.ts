import { NextResponse } from "next/server";
import { incidents } from "@/lib/api-data";

export function GET() {
  return NextResponse.json({
    data: incidents,
    meta: {
      mode: "demo",
      count: incidents.length,
    },
  });
}

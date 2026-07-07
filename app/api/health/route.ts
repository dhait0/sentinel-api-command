import { NextResponse } from "next/server";
import { buildHealthResponse } from "@/lib/api-data";

export function GET() {
  return NextResponse.json(buildHealthResponse());
}

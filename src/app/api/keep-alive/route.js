// app/api/keep-alive/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from("complaints")
      .select("id")
      .limit(1);

    if (error) {
      console.log("Keep-alive ping dengan error:", error.message);
    }

    return NextResponse.json({
      status: "success",
      message: "Database ping executed",
      timestamp: new Date().toISOString(),
      data: data ? "connected" : "no data",
    });
  } catch (error) {
    return NextResponse.json({
      status: "ok",
      message: "Endpoint executed",
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
}

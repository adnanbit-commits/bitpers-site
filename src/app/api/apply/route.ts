import { NextRequest, NextResponse } from "next/server";
import { applySchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const data = applySchema.parse(await req.json()); // validate first

    const APPLY_ENDPOINT = process.env.APPLY_ENDPOINT;
    if (!APPLY_ENDPOINT) {
      return NextResponse.json(
        { ok: false, error: "missing APPLY_ENDPOINT" },
        { status: 500 }
      );
    }

    // Send as text/plain to Apps Script
    const r = await fetch(APPLY_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    const text = await r.text();
    if (!r.ok) {
      console.error("[APPLY proxy fail]", r.status, text.slice(0, 500));
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    // Script returns JSON like {"ok":true}
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      // If Apps Script ever returns HTML, surface a generic OK
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    console.error("[APPLY invalid]", e);
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
}

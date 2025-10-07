import { NextRequest, NextResponse } from "next/server";
import { betaSchema } from "@/lib/validators";

const APPLY_BETA_ENDPOINT = process.env.APPLY_BETA_ENDPOINT!;

const personaMap = {
  creator: "Creator / Photographer / Studio",
  student: "Student / Club / College team",
  brand: "Brand / Community manager",
  individual: "Individual / Curious",
} as const;

const firstUseMap = {
  events: "Events (weddings, fests, meetups)",
  communities: "Interest communities (cars, food, travel)",
  friendsFamily: "Friends & family memories",
  collab: "Content/campaign collaboration",
} as const;

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "apply-beta" });
}

export async function POST(req: NextRequest) {
  try {
    const data = betaSchema.parse(await req.json());

    if (!APPLY_BETA_ENDPOINT) {
      return NextResponse.json(
        { ok: false, error: "missing APPLY_BETA_ENDPOINT" },
        { status: 500 }
      );
    }

    // Map short keys to the exact dropdown labels in your Form
    const payload = {
      persona: personaMap[data.persona],
      firstUse: firstUseMap[data.firstUse],
      howUse: data.howUse,
      email: data.email ?? "",
      ts: data.ts ?? Date.now(),
    };
    console.log("[BETA PAYLOAD]", payload);


    const r = await fetch(APPLY_BETA_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      console.error("[BETA SUBMIT FAIL]", r.status, text.slice(0, 400));
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[BETA invalid]", e);
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  
}

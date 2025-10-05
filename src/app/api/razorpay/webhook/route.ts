import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

  if (signature !== expected) return NextResponse.json({ ok: false }, { status: 401 });
  const event = JSON.parse(body);
  // TODO: verify order -> mark donation -> email receipt
  console.log("[RZP WEBHOOK]", event.event);
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET() {
  // Health check: curl http://localhost:3000/api/razorpay/order
  return NextResponse.json({ ok: true, endpoint: "razorpay/order" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    // Support both JSON and form submissions
    const rawAmount =
      body?.amount ??
      (typeof body === "object" && "amount" in body ? (body as any).amount : undefined);

    const amount = Number(rawAmount);
    if (!amount || amount < 1) {
      return NextResponse.json({ error: "bad amount" }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID!;
    const key_secret = process.env.RAZORPAY_KEY_SECRET!;
    if (!key_id || !key_secret) {
      return NextResponse.json({ error: "server env missing" }, { status: 500 });
    }

    const rzp = new Razorpay({ key_id, key_secret });

    const order = await rzp.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `don_${Date.now()}`,
    });

    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    console.error("[RZP ORDER ERROR]", e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

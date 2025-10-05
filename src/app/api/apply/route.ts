import { NextRequest, NextResponse } from "next/server";
import { applySchema } from "@/lib/validators";


export async function POST(req: NextRequest) {
const raw = await req.text();
try {
const data = applySchema.parse(JSON.parse(raw));
// TODO: send email / store in DB. For now, log.
console.log("[APPLY]", data);
return NextResponse.json({ ok: true });
}  catch (_e) {
  return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
}
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { betaSchema, type BetaInput } from "@/lib/validators";

type Persona = BetaInput["persona"];
type FirstUse = BetaInput["firstUse"];

export default function ApplyBeta() {
  const [persona, setPersona] = useState<Persona | "">("");
  const [firstUse, setFirstUse] = useState<FirstUse | "">("");
  const [howUse, setHowUse] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  const disabled = useMemo(
    () => !persona || !firstUse || howUse.trim().length < 10 || sending,
    [persona, firstUse, howUse, sending]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setErr(null);
    setOk(null);

    // Validate on client (nice errors) before hitting API
    const candidate: BetaInput = {
      persona: persona as Persona,
      firstUse: firstUse as FirstUse,
      howUse: howUse.trim(),
      email: email.trim(), // schema allows "" or a valid email
      ts: Date.now(),
    };

    const parsed = betaSchema.safeParse(candidate);
    if (!parsed.success) {
      setSending(false);
      setErr(parsed.error.issues[0]?.message ?? "Please check your answers.");
      setOk(false);
      return;
    }

    try {
      const res = await fetch("/api/apply-beta", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    persona,
    firstUse,
    howUse: howUse.trim(),
    email: email.trim() || undefined,
    ts: Date.now(),
  }),
});
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOk(true);
      setPersona("");
      setFirstUse("");
      setHowUse("");
      setEmail("");
    } catch (_e) {
      setOk(false);
      setErr("Something went wrong. Please try again or email adnankhan@bitpers.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Apply for Beta Access</h1>
      <p className="mt-3 text-zinc-400">
        We’re prioritizing early testers based on real use cases. This takes ~30 seconds.
      </p>

      <form onSubmit={onSubmit} className="mt-6 rounded-2xl ring-1 ring-zinc-800 p-5 grid gap-5">
        {/* MCQ #1 */}
        <div>
          <label className="text-sm font-medium">Who are you?</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { key: "creator", label: "Creator / Photographer / Studio" },
              { key: "student", label: "Student / Club / College team" },
              { key: "brand", label: "Brand / Community manager" },
              { key: "individual", label: "Individual / Curious" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setPersona(opt.key as Persona)}
                className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                  persona === opt.key
                    ? "bg-zinc-100 text-zinc-900 ring-zinc-200"
                    : "ring-zinc-700 hover:bg-zinc-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* MCQ #2 */}
        <div>
          <label className="text-sm font-medium">Where would you try Bitpers first?</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { key: "events", label: "Events (weddings, fests, meetups)" },
              { key: "communities", label: "Interest communities (cars, food, travel)" },
              { key: "friendsFamily", label: "Friends & family memories" },
              { key: "collab", label: "Content/campaign collaboration" },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFirstUse(opt.key as FirstUse)}
                className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                  firstUse === opt.key
                    ? "bg-zinc-100 text-zinc-900 ring-zinc-200"
                    : "ring-zinc-700 hover:bg-zinc-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Free-text */}
        <div>
          <label className="text-sm font-medium">
            How would you use Bitpers?{" "}
            <span className="text-zinc-500 font-normal">(1–3 sentences)</span>
          </label>
          <textarea
            value={howUse}
            onChange={(e) => setHowUse(e.target.value)}
            className="mt-2 w-full rounded-xl bg-transparent px-3 py-2 ring-1 ring-zinc-800 focus:outline-none focus:ring-zinc-600"
            rows={4}
            placeholder="e.g. We run a college fest and want a shared mural + quick voting to pick the top photos..."
          />
          <p className="mt-1 text-xs text-zinc-500">Minimum 10 characters.</p>
        </div>

        {/* Optional email */}
        <div>
          <label className="text-sm font-medium">Email (optional, for updates)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl bg-transparent px-3 py-2 ring-1 ring-zinc-800 focus:outline-none focus:ring-zinc-600"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex gap-2">
          <button
            disabled={disabled}
            className={`rounded-xl px-4 py-2 ${
              disabled ? "bg-zinc-800 text-zinc-500" : "bg-zinc-100 text-zinc-900"
            }`}
          >
            {sending ? "Submitting..." : "Request access"}
          </button>
          <Link
            href="mailto:adnankhan@bitpers.com"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-zinc-700"
          >
            Email founder
          </Link>
        </div>

        {ok === true && (
          <p className="text-sm text-emerald-400">Thanks! We’ll review and get back to you.</p>
        )}
        {ok === false && <p className="text-sm text-amber-400">{err}</p>}
      </form>

      {/* mini tiles kept as-is */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {/* ... your tiles unchanged ... */}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const UPI_ID = "khnadn89@okaxis"; // <-- replace with your actual UPI ID
const DISPLAY_NAME = "Bitpers / Adnan"; // <-- what payers will see

export default function Donate() {
  // optional helper to prefill a mailto confirmation
  const [amount, setAmount] = useState<number | "">("");
  const [txId, setTxId] = useState("");
  const mailtoHref = useMemo(() => {
    const a = typeof amount === "number" ? amount : "";
    const subject = encodeURIComponent(`Support confirmation — ₹${a || "amount"}`);
    const body = encodeURIComponent(
      `Hi,\n\nI just contributed via UPI.\n\nAmount: ₹${a || "<enter>"}\nUPI Txn ID: ${txId || "<enter>"}\nFrom (name): <your name>\nEmail: <your email>\nNotes (optional): <notes>\n\nThanks!`
    );
    return `mailto:billing@bitpers.com?subject=${subject}&body=${body}`;
  }, [amount, txId]);

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Support Bitpers</h1>
      <p className="mt-3 text-zinc-400">
        If you believe in this vision, you can help it exist. Your support funds infra, design,
        and development while we build in public. For now we’re bootstrapping — you can contribute
        directly via UPI.
      </p>

      {/* QR + UPI details */}
      <div className="mt-6 grid md:grid-cols-[340px,1fr] gap-6 items-start">
        <div className="rounded-2xl ring-1 ring-zinc-800 p-4">
          <div className="aspect-square relative overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src="/images/upi-qr.png"
              alt="UPI QR code for Bitpers support"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm text-zinc-400">Scan & pay via any UPI app</div>
            <div className="mt-1 font-medium">{DISPLAY_NAME}</div>
            <div className="text-sm text-zinc-400">{UPI_ID}</div>
          </div>
        </div>

        {/* Amount presets + confirm helper */}
        <div className="rounded-2xl ring-1 ring-zinc-800 p-5">
          <h3 className="font-semibold">Choose an amount</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {[250, 500, 1000, 5000].map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                  amount === a
                    ? "bg-zinc-100 text-zinc-900 ring-zinc-200"
                    : "ring-zinc-700 hover:bg-zinc-800"
                }`}
              >
                ₹{a.toLocaleString("en-IN")}
              </button>
            ))}
            <button
              onClick={() => setAmount("")}
              className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                amount === "" ? "bg-zinc-100 text-zinc-900 ring-zinc-200" : "ring-zinc-700 hover:bg-zinc-800"
              }`}
            >
              Custom
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            <label className="text-sm text-zinc-400">
              Custom amount (₹)
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                value={amount === "" ? "" : amount}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  setAmount(v ? Number(v) : "");
                }}
                className="mt-1 w-full rounded-xl bg-zinc-150 px-3 py-2 ring-1 ring-zinc-800 focus:outline-none focus:ring-zinc-600"
                placeholder="e.g. 1500"
              />
            </label>

            <p className="text-sm text-zinc-400">
              1) Open your UPI app → Send to <span className="font-medium">{UPI_ID}</span> ({DISPLAY_NAME}){" "}
              {typeof amount === "number" ? <>→ Amount <span className="font-medium">₹{amount.toLocaleString("en-IN")}</span></> : null}
            </p>

            <label className="text-sm text-zinc-400">
              UPI transaction ID (optional, helps us verify)
              <input
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                className="mt-1 w-full rounded-xl bg-zinc-150 px-3 py-2 ring-1 ring-zinc-800 focus:outline-none focus:ring-zinc-600"
                placeholder="e.g. 3263c4f6e9@icici or UPI Ref no."
              />
            </label>

            <div className="flex gap-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2 text-zinc-900"
              >
                Email confirmation
              </a>
              <Link
                href="mailto:adnankhan@bitpers.com"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-zinc-700"
              >
                Contact support
              </Link>
            </div>

            <p className="text-xs text-zinc-500">
              We’ll manually verify transactions. If you want your name listed (later) on a supporters page,
              mention it in the email.
            </p>
          </div>
        </div>
      </div>

      {/* Transparency */}
      <div className="mt-8 rounded-2xl p-5 ring-1 ring-zinc-800">
        <h3 className="font-semibold">Transparency & Terms</h3>
        <ul className="mt-2 space-y-2 text-sm text-zinc-400">
          <li>• This is <strong>voluntary support</strong> for an early project. It does <em>not</em> grant equity, tokens, revenue share, or product entitlements.</li>
          <li>• Until an entity is formed, funds are received personally by the founder and treated as income; we will publish high-level monthly notes on spend and progress.</li>
          <li>• For payment issues or refunds, email <Link className="underline" href="mailto:billing@bitpers.com">billing@bitpers.com</Link>.</li>
          <li>• By proceeding you acknowledge that timelines and features may change as we learn with the community.</li>
        </ul>
      </div>
    </section>
  );
}

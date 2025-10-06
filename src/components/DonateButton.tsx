"use client";

import { useEffect, useState } from "react";

type Props = {
  amount: number;          // INR
  label?: string;
};

export function DonateButton({ amount, label = "Support" }: Props) {
  const [ready, setReady] = useState(false);
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

  useEffect(() => {
    // If already present, just mark ready
    if ((window as any).Razorpay) {
      setReady(true);
      return;
    }
    // Inject checkout script once
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => setReady(Boolean((window as any).Razorpay));
    s.onerror = () => setReady(false);
    document.body.appendChild(s);
  }, []);

  const start = async () => {
    try {
      // 1) create order on our server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data?.orderId) throw new Error(data?.error || "order failed");

      // 2) open Razorpay
      const RazorpayCtor = (window as any).Razorpay as
        | (new (opts: any) => { open: () => void })
        | undefined;

      if (!RazorpayCtor) {
        alert("Payment library didn’t load. Please retry.");
        return;
      }

      const rzp = new RazorpayCtor({
        key,
        amount: amount * 100,
        currency: "INR",
        name: "Bitpers",
        description: "Voluntary support",
        order_id: data.orderId,
        notes: { project: "bitpers" },
        theme: { color: "#e4e4e7" },
        modal: { ondismiss: () => {} },
        // d.ts expects a no-arg handler; we’ll rely on the webhook for source of truth
        handler: () => {
          alert("Thanks for supporting Bitpers!");
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Could not start payment. Please try again.");
    }
  };

  return (
    <button
      onClick={start}
      disabled={!ready}
      className="rounded-xl bg-zinc-100 px-4 py-2 text-zinc-900 disabled:opacity-50"
      aria-disabled={!ready}
    >
      {label}
    </button>
  );
}

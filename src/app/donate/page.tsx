"use client";
import { Badge } from "@/components/Badge";

const tiers = [
  { name: "Bronze", price: "199", desc: "Public thank-you + Bronze badge" },
  { name: "Silver", price: "999", desc: "Early-supporter label + Silver badge" },
  { name: "Gold", price: "4999", desc: "Founder-Supporter label + Gold badge" },
];

// typed loader for the checkout script
function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(s);
  });
}

export default function Donate() {
  const startCheckout = async (amount: number) => {
    // 1) create an order on server
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const { orderId } = await res.json();
    if (!orderId) {
      alert("Order error");
      return;
    }

    // 2) ensure Razorpay is available
    await loadRazorpay();

    // sanity: env var must be present
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      alert("Missing Razorpay key");
      return;
    }

    // 3) open checkout (typed)
    const rzp = new window.Razorpay!({
      key,
      amount: amount * 100,
      currency: "INR",
      name: "Bitpers",
      description: "Badge-only donation (India-only)",
      order_id: orderId,
      theme: { color: "#ffffff" },
      notes: { badge: String(amount) },
      handler: function () {
        alert("Thank you! Payment captured.");
      },
      modal: { ondismiss: function () {} },
    });
    rzp.open();
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Support Bitpers (India-only)</h1>
      <p className="mt-3 text-zinc-400">
        Contributions are voluntary donations from Indian residents to support early development.
        No goods, services, equity, tokens, or returns are provided. Badges are symbolic recognition only.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl p-6 ring-1 ring-zinc-800">
            <Badge name={t.name} price={t.price} desc={t.desc} />
            <button
              onClick={() => startCheckout(parseInt(t.price))}
              className="mt-4 w-full rounded-2xl px-5 py-3 bg-zinc-100 text-zinc-900 font-medium"
            >
              Donate ₹{t.price}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-zinc-500 space-y-2">
        <p>We can accept donations only from Indian bank cards/accounts at this time. Foreign cards and remittances are not accepted.</p>
        <p>Donations are to an individual project and not eligible for 80G. Badges have no monetary value and do not entitle donors to perks.</p>
      </div>
    </section>
  );
}

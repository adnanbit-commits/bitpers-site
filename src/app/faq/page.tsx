import Link from "next/link";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h1>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl p-5 ring-1 ring-zinc-800">
          <h3 className="font-semibold">What is Bitpers in one line?</h3>
          <p className="mt-1 text-zinc-400">
            A visual-first social ecosystem: Murals, Memory Boards, and Collab tools
            that turn photos into living stories and real communities.
          </p>
        </div>

        <div className="rounded-2xl p-5 ring-1 ring-zinc-800">
          <h3 className="font-semibold">Is there a product today?</h3>
          <p className="mt-1 text-zinc-400">
            Prototype phase. Android app is in progress; backend and collaboration
            layers are actively being built. Join pilots via{" "}
            <Link className="underline" href="/build-with-us">
              Build With Us
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl p-5 ring-1 ring-zinc-800">
          <h3 className="font-semibold">How is support handled?</h3>
          <p className="mt-1 text-zinc-400">
            Support is voluntary and helps fund development. It does not grant equity
            or tokens. Until incorporation, funds are received personally by the founder
            and reported as income. Payment issues?{" "}
            <Link className="underline" href="mailto:billing@bitpers.com">
              billing@bitpers.com
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl p-5 ring-1 ring-zinc-800">
          <h3 className="font-semibold">Privacy stance?</h3>
          <p className="mt-1 text-zinc-400">
            Privacy-first and consent-based. Face Hunt and other features will be opt-in,
            with clear visibility controls and local/on-device options where possible.
          </p>
        </div>

        <div className="rounded-2xl p-5 ring-1 ring-zinc-800">
          <h3 className="font-semibold">Roadmap at a glance?</h3>
          <p className="mt-1 text-zinc-400">
            v1 targets: profiles + discovery, Murals/Boards, Collab basics, and Events.
            We’ll publish progress notes in the open.
          </p>
        </div>
      </div>
    </section>
  );
}

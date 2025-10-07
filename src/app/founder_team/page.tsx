import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";

export default function Team() {
  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Profile-style header */}
      <section className="flex flex-col items-center text-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full ring-1 ring-zinc-800">
          <Image
            src="/images/founder.jpg"
            alt="Adnan Khan"
            fill
            sizes="128px"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Adnan Khan
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-900">
            Founder of{" "}
            <span className="font-medium text-zinc-900">Bitpers</span>.
          </p>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-zinc-900">
          I grew up immersed in India’s vibrant visual cultures—from weddings
          to regional advertising—where images carry rich meaning and identity.
          After spending 9 years capturing and distributing those stories, followed by a 1.5-year DePin GPU stint focused on visual compute and on-device intelligence, I'm building Bitpers: a privacy-led, community-first visual network where photos and videos become living stories we can curate together.
        </p>
      </section>

      {/* Values section */}
      <section className="text-sm text-zinc-900 space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">
          Principles and Culture
        </h2>
        <ul className="list-disc pl-5 space-y-2 marker:text-zinc-500">
          <li>
            <span className="font-medium">Values:</span> Creativity, consent,
            collaboration, craft.
          </li>
          <li>
            <span className="font-medium">Culture:</span> Builder-led, user-obsessed,
            long-term. Minimal surfaces, solid primitives, co-shaped with the
            community.
          </li>
          <li>
            <span className="font-medium">Standard:</span> Media stays
            front-and-center. Privacy over growth, always.
          </li>
        </ul>
      </section>

      {/* CTAs */}
      <section className="flex flex-col items-center text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="https://discord.gg/U9tQBpZt"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl px-4 py-2 ring-1 ring-zinc-800 hover:bg-zinc-900/40 text-sm"
            aria-label="Join the Bitpers Discord"
          >
            <span>
              Join Discord —{" "}
              <span className="text-zinc-900">see real progress</span>
            </span>
            <ArrowRight className="size-3.5 opacity-70 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adnan-khan-551a0358"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-zinc-100 text-zinc-900 text-sm font-medium"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="size-3.5" />
            LinkedIn (Not my vibe)
          </Link>
        </div>
        <p className="max-w-xs text-xs text-zinc-900">
          I don’t like LinkedIn — it feels artificial. For a real sense of the work
          and culture, jump into Discord.
        </p>
      </section>

      {/* Compact success section */}
      <section className="text-sm text-zinc-900 space-y-4" id="success">
        <h2 className="text-base font-semibold text-zinc-900">
          What success looks like
        </h2>
        <ul className="list-disc pl-5 space-y-1 marker:text-zinc-500">
          <li>Families revisit and curate memories—beyond storage.</li>
          <li>Colleges, clubs, creators run event murals & collab sessions that feel fun and productive.</li>
          <li>Public topic hubs become living visual communities—less noise, more narrative.</li>
        </ul>
      </section>

      {/* Recruitment notice */}
      <div className="rounded-xl border border-zinc-800 p-3">
    
        <p className="mt-3 font-bold text-zinc-900 text-base md:text-lg">
          We're actively seeking passionate co-founders (developers preferred) with a relentless drive to build the future with us.
        </p>
        <p className="text-base text-zinc-900">
          Freelance and indie talent got us to this point, but our next phase demands a more dedicated core team.
        </p>
      </div>
    </main>
  );
}

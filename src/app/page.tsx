
import { MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
return (
<MotionConfig>
<section className="text-center py-16">
<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
The Visual Layer for Human Connection
</h1>
<p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
Murals, Memory Boards, and Collab tools to turn photos into living stories—
privacy-first and built for communities.
</p>
<div className="mt-8 flex gap-3 justify-center">
<Link href="/build-with-us" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-zinc-100 text-zinc-900 font-medium">
Build With Us <ArrowRight className="size-4" />
</Link>
<Link href="/donate" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 ring-1 ring-zinc-700">
Donate (India-only)
</Link>
</div>
</section>


<section className="grid md:grid-cols-3 gap-6 mt-10">
{[
{title: "Murals", desc: "Dynamic, customizable visual spaces (private/public)."},
{title: "Memory Boards", desc: "Pairwise/small-group timelines that evolve."},
{title: "Collab", desc: "The decision layer: polls, sort, batch ops."},
].map((c) => (
<div key={c.title} className="rounded-2xl p-6 ring-1 ring-zinc-800">
<h3 className="text-xl font-semibold">{c.title}</h3>
<p className="mt-2 text-zinc-400">{c.desc}</p>
</div>
))}
</section>
</MotionConfig>
);
}
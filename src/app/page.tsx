"use client";

import { MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FeatureSection } from "@/components/FeatureSection";

import muralsImg from "@public/images/murals.png";
import memoryImg from "@public/images/memoryboard.png";
import collabImg from "@public/images/collab.png";
import eventsImg from "@public/images/events.png";
import facehuntImg from "@public/images/facehunt.png";

export default function Home() {
  return (
    <MotionConfig>
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          The Visual Layer for Human Connection
        </h1>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          A visual-first social ecosystem where every image can tell a story,
          spark collaboration, and form meaningful communities.
        </p>

        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/build-with-us"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-zinc-100 text-zinc-900 font-medium"
          >
            Build With Us <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 ring-1 ring-zinc-700"
          >
            Support
          </Link>
        </div>

        <p className="mt-3 text-xs text-zinc-500">
          Prototype phase • Android app in progress • Building in public
        </p>
      </section>

      {/* Modules — container hugs scaled image; no cropping */}
      <FeatureSection
        eyebrow="Core module"
        title="Murals — dynamic spaces for shared storytelling"
        body={
          <p>
            Create living, customizable visual spaces for events, themes, or global topics.
            Private (weddings, clubs, classrooms) or public (travel, cars, food).
          </p>
        }
      docPath="/murals"
  img={muralsImg}
  imgAlt="Bitpers mural showing dynamic visual board"
  imgWidthPx={600}
  priority
      />

      <FeatureSection
        eyebrow="Core module"
        title="Memory Boards — your evolving visual diary"
        body={
          <p>
            Pairwise or small-group timelines that automatically sync shared media.
            Capture trips, friendships, or projects as living stories — not static albums.
          </p>
        }
        docPath="/memory-boards"
  img={memoryImg}
  imgAlt="Memory board timeline"
  reverse
  imgWidthPx={600}
      />

      <FeatureSection
        eyebrow="Core module"
        title="Collab — the decision layer"
        body={
          <p>
            Polls, interactive tags, sorting and batch ops. From families picking photos
            to creators testing concepts to teams refining campaigns.
          </p>
        }
        docPath="/collab"
  img={collabImg}
  imgAlt="Collaboration tools preview"
  imgWidthPx={600}
      />

      <FeatureSection
        eyebrow="Feature module"
        title="Events — bridge physical and digital"
        body={
          <p>
            Invite-based, ticket-verified or barcode access for attendees. Structured
            uploads and curated community timelines that outlive the event.
          </p>
        }
         docPath="/events"
  img={eventsImg}
  imgAlt="Event mural / uploads"
  reverse
  imgWidthPx={600}
      />

      <FeatureSection
        eyebrow="Feature module"
        title="Face Hunt — consent-first discovery"
        body={
          <p>
            Optional, consent-based face recognition to auto-share among trusted users.
            Enables private “photos of me” and mural discovery like “find me in the crowd.”
          </p>
        }
     docPath="/face-hunt"
  img={facehuntImg}
  imgAlt="Consent-first face discovery"
  imgWidthPx={600}
      />
    </MotionConfig>
  );
}

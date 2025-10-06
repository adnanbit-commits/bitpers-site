"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FeatureSectionProps = {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  docPath: string;
  img: StaticImageData;
  imgAlt: string;
  reverse?: boolean;
  /** Explicit desktop width (px) for the image block. Container height follows intrinsic ratio. */
  imgWidthPx?: number;     // if omitted, defaults to ~66% of intrinsic width, capped at 560
  priority?: boolean;
};

export function FeatureSection({
  eyebrow,
  title,
  body,
  docPath,
  img,
  imgAlt,
  reverse = false,
  imgWidthPx,
  priority = false,
}: FeatureSectionProps) {
  // Default: ~66% of intrinsic width, up to 560px
  const fallback = Math.round(Math.min(img.width * 0.66, 560));
  const widthPx = imgWidthPx ?? fallback;

  const isExternal = /^https?:\/\//i.test(docPath);

  return (
    <section
      className={[
        "py-10 flex items-center gap-10",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
        "flex-col",
      ].join(" ")}
    >
      {/* Text column */}
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wide text-zinc-400">{eyebrow}</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold">{title}</h2>
        <div className="mt-3 text-zinc-400">{body}</div>

        <div className="mt-6">
          <Link
            href={docPath}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-zinc-700"
          >
            Explore details <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Image column: explicit width on md+, full width on mobile; height follows ratio */}
      <div className="shrink-0 inline-block w-full md:w-auto" style={{ width: widthPx }}>
        <Image
          src={img}
          alt={imgAlt}
          width={img.width}
          height={img.height}
          // Browser gets a good hint for source selection, but CSS width controls layout.
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 60vw, 92vw"
          style={{ width: "100%", height: "auto", display: "block" }}
          priority={priority}
        />
      </div>
    </section>
  );
}

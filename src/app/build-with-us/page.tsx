// src/app/build-with-us/page.tsx
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applySchema, type ApplyInput } from "@/lib/validators";

export default function BuildWithUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyInput>({
    resolver: zodResolver(applySchema),
    // Ensure optional text fields are always strings (not undefined)
    defaultValues: {
      name: "",
      email: "",
      github: "",
      linkedin: "",
      portfolio1: "",
      portfolio2: "",
      timezone: "",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<ApplyInput> = async (data) => {
    // If any optional fields are empty strings, keep them as "" (schema allows it)
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    alert(res.ok ? "Thanks! We’ll be in touch." : "Something went wrong");
  };

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Build With Us — Founding Engineer</h1>
      <p className="mt-3 text-zinc-400">
        Own the backend that powers a new visual internet. Become a Co-Founder.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
        <input placeholder="Name" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("name")} />
        {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

        <input placeholder="Email" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("email")} />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

        <input placeholder="GitHub URL" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("github")} />
        {errors.github && <p className="text-red-400 text-sm">{errors.github.message}</p>}

        <input placeholder="LinkedIn URL" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("linkedin")} />
        {errors.linkedin && <p className="text-red-400 text-sm">{errors.linkedin.message}</p>}

        <input placeholder="Portfolio link #1" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("portfolio1")} />
        {errors.portfolio1 && <p className="text-red-400 text-sm">{errors.portfolio1.message}</p>}

        <input placeholder="Portfolio link #2" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("portfolio2")} />
        {errors.portfolio2 && <p className="text-red-400 text-sm">{errors.portfolio2.message}</p>}

        <input placeholder="City / Timezone" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("timezone")} />

        <textarea
          placeholder="Describe a system you scaled or secured (>= 30 chars)"
          rows={6}
          className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800"
          {...register("note")}
        />
        {errors.note && <p className="text-red-400 text-sm">{errors.note.message}</p>}

        {Object.values(errors).length > 0 && (
          <p className="text-red-400 text-sm">Please fix the highlighted fields.</p>
        )}

        <button disabled={isSubmitting} className="rounded-2xl px-5 py-3 bg-zinc-300 text-zinc-900 font-medium">
          {isSubmitting ? "Submitting…" : "Apply Now"}
        </button>
      </form>
    </section>
  );
}

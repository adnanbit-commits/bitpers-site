"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applySchema, type ApplyInput } from "@/lib/validators";


export default function BuildWithUs() {
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplyInput>({
resolver: zodResolver(applySchema),
});


const onSubmit = async (data: ApplyInput) => {
const res = await fetch("/api/apply", { method: "POST", body: JSON.stringify(data) });
alert(res.ok ? "Thanks! We’ll be in touch." : "Something went wrong");
};


return (
<section className="max-w-2xl mx-auto">
<h1 className="text-3xl font-bold">Build With Us — Founding Engineer</h1>
<p className="mt-3 text-zinc-400">Own the backend that powers a new visual internet. Become a Co-Founder.</p>


<form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
<input placeholder="Name" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("name")} />
<input placeholder="Email" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("email")} />
<input placeholder="GitHub URL" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("github")} />
<input placeholder="LinkedIn URL" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("linkedin")} />
<input placeholder="Portfolio link #1" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("portfolio1")} />
<input placeholder="Portfolio link #2" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("portfolio2")} />
<input placeholder="City / Timezone" className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("timezone")} />
<textarea placeholder="Describe a system you scaled or secured (>= 30 chars)" rows={6} className="rounded-xl bg-zinc-150 p-3 ring-1 ring-zinc-800" {...register("note")} />
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
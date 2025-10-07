// src/lib/validators.ts
import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  // Optional URLs — allow empty string OR valid URL
  github: z.string().url().or(z.literal("")).optional(),
  linkedin: z.string().url().or(z.literal("")).optional(),
  portfolio1: z.string().url().or(z.literal("")).optional(),
  portfolio2: z.string().url().or(z.literal("")).optional(),
  timezone: z.string().optional(),

  // Required long answer (>= 30 chars)
  note: z.string().min(30, "Please add a bit more detail"),

  // Optional enums (if you use them later)
  source: z.enum(["twitter","reddit","discord","friend","other"]).optional(),
  usecase: z.string().optional(),
});

export type ApplyInput = z.infer<typeof applySchema>;
export const betaSchema = z.object({
  persona: z.enum(["creator", "student", "brand", "individual"]),
  firstUse: z.enum(["events", "communities", "friendsFamily", "collab"]),
  howUse: z.string().min(10, "Please add 10+ characters"),
  // optional email: allow "" or a valid email
  email: z.string().email().or(z.literal("")).optional(),
  ts: z.number().optional(),
});

export type BetaInput = z.infer<typeof betaSchema>;
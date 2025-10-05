// src/lib/validators.ts
import { z } from "zod";

export const applySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  portfolio1: z.string().url().optional(),
  portfolio2: z.string().url().optional(),
  timezone: z.string().min(2),
  note: z.string().min(30),
});

export type ApplyInput = z.infer<typeof applySchema>;

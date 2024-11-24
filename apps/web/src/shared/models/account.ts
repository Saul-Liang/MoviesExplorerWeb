import { z } from "zod";

export type AccountDetails = z.infer<typeof accountDetailsSchema>;

export const accountDetailsSchema = z.object({
  avatar: z.object({
    gravatar: z.object({
      hash: z.string(),
    }),
    tmdb: z.object({
      avatar_path: z.string().nullable(),
    }),
  }),
  id: z.number(),
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  include_adult: z.boolean(),
  username: z.string(),
});

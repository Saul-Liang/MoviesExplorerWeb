import { z } from "zod";

export type Movie = z.infer<typeof movieSchema>;

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

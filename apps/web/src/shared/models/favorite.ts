import { z } from "zod";

export type FavoriteRequest = z.infer<typeof favoriteRequestSchema>;

export const favoriteRequestSchema = z.object({
  media_type: z.string(),
  media_id: z.number(),
  favorite: z.boolean(),
});

export type FavoriteResponse = z.infer<typeof favoriteResponseSchema>;

export const favoriteResponseSchema = z.object({
  status_code: z.number(),
  status_message: z.string(),
});

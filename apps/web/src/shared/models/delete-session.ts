import { z } from "zod";

export type DeleteSessionResponse = z.infer<typeof deleteSessionResponseSchema>;

export const deleteSessionResponseSchema = z.object({
  success: z.boolean(),
});

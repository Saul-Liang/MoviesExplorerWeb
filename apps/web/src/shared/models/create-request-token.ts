import { z } from "zod";

export type CreateRequestTokenResponse = z.infer<
  typeof createRequestTokenResponseSchema
>;

export const createRequestTokenResponseSchema = z.object({
  success: z.boolean(),
  expires_at: z.string(),
  request_token: z.string(),
});

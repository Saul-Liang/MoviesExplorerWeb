import { z } from "zod";

export type RequestToken = z.infer<typeof requestTokenSchema>;

export const requestTokenSchema = z.object({
  success: z.boolean(),
  expires_at: z.string(),
  request_token: z.string(),
});

import { z } from "zod";

export type CreateSessionRequest = z.infer<typeof createSessionRequestSchema>;

export const createSessionRequestSchema = z.object({
  request_token: z.string(),
});

export type CreateSessionResponse = z.infer<typeof createSessionResponseSchema>;

export const createSessionResponseSchema = z.object({
  success: z.boolean(),
  session_id: z.string(),
});

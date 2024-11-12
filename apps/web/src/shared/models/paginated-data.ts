import { z } from "zod";

export function PaginatedDataSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(itemSchema),
  });
}

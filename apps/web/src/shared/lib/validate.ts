import { type z } from "zod";
import { logError } from "./logger";

interface ValidationConfig<S extends z.ZodType<T>, T> {
  data: unknown;
  schema: S;
}

export const infer = <T extends z.ZodTypeAny>({ schema }: { schema: T }) =>
  schema;

export const validate = <S extends z.ZodType<T>, T>({
  data,
  schema,
}: ValidationConfig<S, T>): z.infer<S> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  } else {
    logError("Invalid schema", {
      value: data,
      error: result.error.message,
      issues: result.error.issues,
    });
    throw result.error;
  }
};

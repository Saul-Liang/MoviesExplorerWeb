import { type z } from "zod";
import { get, nextClient, tmdbClient } from "./httpClients";
import { type RequestConfig } from "@/shared/models/request-config";

// Internal

export const getInternalWithSchema =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([url, config]: [url: string, config?: RequestConfig | undefined]) =>
    get({ client: nextClient, url, responseSchema, config });

// External

export const getTmdb = <S extends z.ZodType<T>, T>({
  url,
  responseSchema,
  config,
}: {
  url: string;
  responseSchema: S;
  config?: RequestConfig | undefined;
}) => get({ client: tmdbClient, url, responseSchema, config });

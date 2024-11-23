import { type z } from "zod";
import { get, nextClient, post, tmdbClient } from "./httpClients";
import { type RequestConfig } from "@/shared/models/request-config";

// Internal

export const getInternalWithSchema =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([url, config]: [url: string, config?: RequestConfig | undefined]) =>
    get({ client: nextClient, url, responseSchema, config });

export const postInternalWithSchema =
  <S extends z.ZodType<T>, T, D>(responseSchema: S) =>
  ([url, data, config]: [
    url: string,
    data: D,
    config?: RequestConfig | undefined,
  ]) =>
    post({ client: nextClient, url, data, responseSchema, config });

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

export const postTmdb = <S extends z.ZodType<T>, T, D>({
  url,
  data,
  responseSchema,
  config,
}: {
  url: string;
  data: D;
  responseSchema: S;
  config?: RequestConfig | undefined;
}) => post({ client: tmdbClient, url, data, responseSchema, config });

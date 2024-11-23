import { type z } from "zod";
import {
  httpGet,
  nextClient,
  httpPost,
  tmdbClient,
  httpDelete,
} from "./httpClients";
import { type RequestConfig } from "@/shared/models/request-config";

// Internal

export const getInternalWithSchema =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([url, config]: [url: string, config?: RequestConfig | undefined]) =>
    httpGet({ client: nextClient, url, responseSchema, config });

export const postInternalWithSchema =
  <S extends z.ZodType<T>, T, D>(responseSchema: S) =>
  ([url, data, config]: [
    url: string,
    data: D,
    config?: RequestConfig | undefined,
  ]) =>
    httpPost({ client: nextClient, url, data, responseSchema, config });

export const deleteInternalWithSchema =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([url, config]: [url: string, config?: RequestConfig | undefined]) =>
    httpDelete({ client: nextClient, url, responseSchema, config });

// External

export const getTmdb = <S extends z.ZodType<T>, T>({
  url,
  responseSchema,
  config,
}: {
  url: string;
  responseSchema: S;
  config?: RequestConfig | undefined;
}) => httpGet({ client: tmdbClient, url, responseSchema, config });

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
}) => httpPost({ client: tmdbClient, url, data, responseSchema, config });

export const deleteTmdb = <S extends z.ZodType<T>, T>({
  url,
  responseSchema,
  config,
}: {
  url: string;
  responseSchema: S;
  config?: RequestConfig | undefined;
}) => httpDelete({ client: tmdbClient, url, responseSchema, config });

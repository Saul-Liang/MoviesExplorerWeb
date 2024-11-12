import { z } from "zod";
import { validate } from "./validate";
import { logError } from "./logger";
import { Result } from "@/shared/models/result";

type Headers = Record<string, string>;
type Params = Record<string, string>;

interface RequestConfig {
  params?: Params;
  headers?: Headers;
}

export const get =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([urlString, config]: [
    urlString: string,
    config?: RequestConfig | undefined,
  ]) =>
    _get([urlString, responseSchema, config]);

const _get = async <S extends z.ZodType<T>, T>([
  urlString,
  responseSchema,
  config,
]: [
  urlString: string,
  responseSchema: S,
  config?: RequestConfig | undefined,
]): Promise<Result<z.infer<S>>> => {
  try {
    const url = new URL(urlString);
    const queryParams = new URLSearchParams(config?.params).toString();
    url.search = queryParams;

    const response = await fetch(url, {
      method: "GET",
      ...config?.headers,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData: unknown = await response.json();
    return validate({
      data: responseData,
      schema: responseSchema,
    });
  } catch (error) {
    if (error instanceof Error) {
      logError(`Request error`, {
        error: error.message,
      });
      return { success: false, error };
    } else {
      return { success: false, error: new Error("Unknown error") };
    }
  }
};

export const post = async <S extends z.ZodType<T>, T>({
  urlString,
  data,
  config,
  responseSchema,
}: {
  urlString: string;
  data: unknown;
  config?: RequestConfig;
  responseSchema: S;
}): Promise<Result<z.infer<S>>> => {
  try {
    const response = await fetch(urlString, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });
    const responseData: unknown = await response.json();

    return validate({
      data: responseData,
      schema: responseSchema,
    });
  } catch (error) {
    if (error instanceof Error) {
      logError(`Request error`, {
        error: error.message,
      });
      return { success: false, error };
    } else {
      return { success: false, error: new Error("Unknown error") };
    }
  }
};

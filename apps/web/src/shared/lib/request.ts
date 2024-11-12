import { z } from "zod";
import { validate } from "./validate";
import { logError } from "./logger";
import { Result } from "@/shared/models/result";
import { RequestError } from "../models/error/request-error";
import { isDefined } from "remeda";

type Headers = Record<string, string>;

interface RequestConfig {
  searchParams?: URLSearchParams;
  headers?: Headers;
}

export const getWithSchema =
  <S extends z.ZodType<T>, T>(responseSchema: S) =>
  ([urlString, config]: [
    urlString: string,
    config?: RequestConfig | undefined,
  ]) =>
    get([urlString, responseSchema, config]);

export const get = async <S extends z.ZodType<T>, T>([
  urlString,
  responseSchema,
  config,
]: [
  urlString: string,
  responseSchema: S,
  config?: RequestConfig | undefined,
]): Promise<Result<z.infer<S>>> => {
  try {
    debugger;
    const url = getUrl({ urlString, config });
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...config?.headers,
      },
    });

    if (!response.ok) {
      throw new RequestError({ status: response.status });
    }

    const responseData: unknown = await response.json();
    return validate({
      data: responseData,
      schema: responseSchema,
    });
  } catch (error) {
    return handleError(error);
  }
};

export const post = async <S extends z.ZodType<T>, T>([
  urlString,
  data,
  responseSchema,
  config,
]: [
  urlString: string,
  data: unknown,
  responseSchema: S,
  config?: RequestConfig | undefined,
]): Promise<Result<z.infer<S>>> => {
  try {
    const url = getUrl({ urlString, config });
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });

    if (!response.ok) {
      throw new RequestError({ status: response.status });
    }

    const responseData: unknown = await response.json();
    return validate({
      data: responseData,
      schema: responseSchema,
    });
  } catch (error) {
    return handleError(error);
  }
};

function getUrl({
  urlString,
  config,
}: {
  urlString: string;
  config?: RequestConfig | undefined;
}): URL {
  const url = new URL(urlString);
  const queryParams = config?.searchParams?.toString();
  if (isDefined(queryParams)) {
    url.search = queryParams;
  }
  return url;
}

function handleError<S extends z.ZodType<T>, T>(
  error: unknown,
): Result<z.infer<S>> {
  if (error instanceof Error) {
    logError(`Request error`, {
      error: error.message,
    });
    
    if (error instanceof RequestError) {
      return { success: false, error };
    } else {
      return {
        success: false,
        error: new RequestError({
          message: error.message,
          originalError: error,
        }),
      };
    }
  } else {
    return { success: false, error: new RequestError() };
  }
}

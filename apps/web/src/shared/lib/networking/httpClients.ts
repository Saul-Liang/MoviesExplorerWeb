import { type ApiErrorResponse } from "@/shared/models/error/api-error-response";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import { logError } from "../logger";
import { RequestError } from "@/shared/models/error/request-error";
import { type RequestConfig } from "@/shared/models/request-config";
import { isDefined } from "remeda";
import { type z } from "zod";
import { validate } from "../validate";

// Common

const AXIOS_COMMON_CONFIG = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
};

// Internal Clients

export const nextClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  ...AXIOS_COMMON_CONFIG,
});

nextClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => handleError(error),
);

// External Clients

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
  ...AXIOS_COMMON_CONFIG,
});

tmdbClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => handleError(error),
);

// Shared

export const httpGet = async <S extends z.ZodType<T>, T>({
  client,
  url,
  responseSchema,
  config,
}: {
  client: AxiosInstance;
  url: string;
  responseSchema: S;
  config?: RequestConfig | undefined;
}): Promise<z.infer<S>> => {
  const response = await client.get(
    url,
    mapRequestConfigToAxiosRequestConfig(config),
  );

  return validate({
    data: response.data,
    schema: responseSchema,
  });
};

export const httpPost = async <S extends z.ZodType<T>, T, D>({
  client,
  url,
  data,
  responseSchema,
  config,
}: {
  client: AxiosInstance;
  url: string;
  data: D;
  responseSchema: S;
  config?: RequestConfig | undefined;
}): Promise<z.infer<S>> => {
  const response = await client.post(
    url,
    data,
    mapRequestConfigToAxiosRequestConfig(config),
  );

  return validate({
    data: response.data,
    schema: responseSchema,
  });
};

export const httpDelete = async <S extends z.ZodType<T>, T>({
  client,
  url,
  responseSchema,
  config,
}: {
  client: AxiosInstance;
  url: string;
  responseSchema: S;
  config?: RequestConfig | undefined;
}): Promise<z.infer<S>> => {
  const response = await client.delete(
    url,
    mapRequestConfigToAxiosRequestConfig(config),
  );

  return validate({
    data: response.data,
    schema: responseSchema,
  });
};

function handleError(error: AxiosError<ApiErrorResponse>) {
  const requestError = mapErrorToRequestError(error);

  logError(`Request error`, {
    error: requestError.message,
    status: requestError.status,
  });

  return Promise.reject(requestError);
}

function mapErrorToRequestError<T extends Error = Error>(error: T) {
  if (axios.isAxiosError(error)) {
    return new RequestError({
      message: error.message,
      status: error.response?.status,
      originalError: error,
    });
  }
  return new RequestError({
    ...error,
    originalError: error,
  });
}

function mapRequestConfigToAxiosRequestConfig(
  config?: RequestConfig,
): AxiosRequestConfig {
  return {
    ...(isDefined(config?.headers) && { headers: config?.headers }),
    params: config?.params,
    data: config?.data,
  };
}

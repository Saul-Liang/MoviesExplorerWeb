import { ApiErrorResponse } from "@/shared/models/error/api-error-reponse";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { logError } from "../logger";
import { RequestError } from "@/shared/models/error/request-error";
import { RequestConfig } from "@/shared/models/request-config";
import { isDefined } from "remeda";
import { z } from "zod";
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
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    return handleError(error);
  },
);

// External Clients

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
  ...AXIOS_COMMON_CONFIG,
});

tmdbClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    return handleError(error);
  },
);

// Shared

export const get = async <S extends z.ZodType<T>, T>({
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
  config?: RequestConfig | undefined,
): AxiosRequestConfig {
  return {
    ...(isDefined(config?.headers) && { headers: config?.headers }),
    params: config?.params,
  };
}
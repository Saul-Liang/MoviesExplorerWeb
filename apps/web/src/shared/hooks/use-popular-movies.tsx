import useSWR from "swr";
import {
  PaginatedMovies,
  PaginatedMoviesSchema,
} from "../models/paginated-movies";
import { getInternalWithSchema } from "../lib/networking/request";

export function usePopularMovies({ page }: { page: number }) {
  const swr = useSWR<PaginatedMovies, Error>(
    [
      "/api/popular-movies",
      {
        params: {
          page: `${page}`,
        },
      },
    ],
    {
      fetcher: getInternalWithSchema(PaginatedMoviesSchema),
    },
  );

  return swr;
}
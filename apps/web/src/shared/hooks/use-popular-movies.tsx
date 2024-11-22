import useSWR from "swr";
import {
  type PaginatedMovies,
  paginatedMoviesSchema,
} from "../models/paginated-movies";
import { getInternalWithSchema } from "../lib/networking/request";
import { ROUTES } from "../constants/routes";

export function usePopularMovies({ page }: { page: number }) {
  const swr = useSWR<PaginatedMovies, Error>(
    [ROUTES.API.INTERNAL.POPULAR_MOVIES, { params: { page: `${page}` } }],
    {
      fetcher: getInternalWithSchema(paginatedMoviesSchema),
    },
  );

  return swr;
}

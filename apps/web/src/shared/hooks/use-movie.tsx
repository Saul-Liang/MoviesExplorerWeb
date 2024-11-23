import useSWR from "swr";
import { getInternalWithSchema } from "../lib/networking/request";
import { type MovieDetails, movieDetailsSchema } from "../models/movie-details";
import { ROUTES } from "../constants/routes";

export function useMovie({ id }: { id: number }) {
  return useSWR<MovieDetails, Error>(
    [ROUTES.API.INTERNAL.POPULAR_MOVIES, { params: { id } }],
    {
      fetcher: getInternalWithSchema(movieDetailsSchema),
    },
  );
}

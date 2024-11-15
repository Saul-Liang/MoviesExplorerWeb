import useSWR from "swr";
import { getInternalWithSchema } from "../lib/networking/request";
import { type MovieDetails, movieDetailsSchema } from "../models/movie-details";

export function useMovie({ id }: { id: number }) {
  const swr = useSWR<MovieDetails, Error>(
    ["/api/popular-movies", { params: { id } }],
    {
      fetcher: getInternalWithSchema(movieDetailsSchema),
    },
  );

  return swr;
}

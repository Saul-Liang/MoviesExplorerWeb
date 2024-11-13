"use client";

import { Heading } from "@ui/components/ui/heading";
import { Text } from "@ui/components/ui/text";
import Image from "next/image";
import { usePopularMovies } from "@/shared/hooks/use-popular-movies";
import { useEffect, useState } from "react";
import { Movie } from "@/shared/models/movie";
import { isDefined } from "remeda";
import { cn } from "@ui/lib/utils";
import { format, parse, parseISO } from "date-fns";

export function PopularMovies() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data, isLoading, error } = usePopularMovies({ page });

  useEffect(() => {
    if (isDefined(data)) {
      console.log("__DEBUG: setting movies");
      setMovies((currentMovies) => [...currentMovies, ...data.results]);
    }
  }, [data]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 py-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={cn(
            "flex max-h-48 min-h-48 overflow-hidden rounded-xl shadow-lg hover:shadow-xl",
          )}
        >
          <div className={cn("relative w-24 min-w-24 bg-slate-400")}>
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${movie.poster_path}`}
              alt={`Movie poster for ${movie.title}`}
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col p-4">
            <Heading
              variant="h4"
              className={cn("line-clamp-1 text-xl text-slate-800")}
            >
              {movie.title}
            </Heading>
            <Text className={cn("line-clamp-1 text-sm text-slate-600")}>
              {parseAndFormat(movie.release_date)}
            </Text>
            <Text
              className={cn(
                "mt-4 max-h-16 overflow-hidden text-ellipsis text-wrap text-sm text-slate-600",
              )}
            >
              {movie.overview}
            </Text>
            <Text
              className={cn(
                "mt-4 line-clamp-5 text-right text-sm font-semibold text-slate-600",
                getVoteColor(movie.vote_average),
              )}
            >
              {getVoteAsPercentage(movie.vote_average)}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

function parseAndFormat(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd MMM yyyy");
}

function getVoteAsPercentage(vote_average: number): string {
  return Math.round(vote_average * 10).toString() + "%";
}

function getVoteColor(vote_average: number): string {
  if (vote_average > 7) {
    return "text-green-600";
  } else if (vote_average > 4) {
    return "text-orange-600";
  } else {
    return "text-red-600";
  }
}

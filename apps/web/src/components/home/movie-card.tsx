"use client";

import { Heading } from "@ui/components/ui/heading";
import { Text } from "@ui/components/ui/text";
import Image from "next/image";
import { Movie } from "@/shared/models/movie";
import { cn } from "@ui/lib/utils";
import { getVoteAsPercentage, getVoteColor } from "./utils/movie-helpers";
import { parseAndFormatDate } from "@/shared/utils/date-helpers";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div
      className={cn(
        "flex max-h-48 min-h-48 flex-row overflow-hidden rounded-xl shadow-lg hover:shadow-xl",
      )}
    >
      <div className={cn("relative min-w-24 basis-1/4 bg-slate-300")}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}${movie.poster_path}`}
          alt={`Movie poster for ${movie.title}`}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="flex basis-3/4 flex-col p-4">
        <Heading
          variant="h4"
          className={cn("line-clamp-1 text-xl text-slate-800")}
        >
          {movie.title}
        </Heading>
        <Text className={cn("line-clamp-1 text-sm text-slate-600")}>
          {parseAndFormatDate(movie.release_date)}
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
            "mt-4 line-clamp-4 text-right text-sm font-semibold text-slate-600",
            getVoteColor(movie.vote_average),
          )}
        >
          {getVoteAsPercentage(movie.vote_average)}
        </Text>
      </div>
    </div>
  );
}

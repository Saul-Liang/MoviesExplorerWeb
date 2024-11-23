"use client";

import { Heading } from "@ui/components/ui/heading";
import { Text } from "@ui/components/ui/text";
import Image from "next/image";
import { type Movie } from "@/shared/models/movie";
import { cn } from "@ui/lib/utils";
import { getVoteAsPercentage, getVoteColor } from "./utils/movie-helpers";
import { parseAndFormatDate } from "@/shared/utils/date-helpers";
import Link from "next/link";
import { HeartIcon } from "@ui/components/ui/icons";
import { Button } from "@ui/components/ui/button";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/${movie.id}`}
      className={cn(
        "flex max-h-52 min-h-52 flex-row overflow-hidden rounded-xl shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md",
      )}
    >
      <div className={cn("relative min-w-24 max-w-36 basis-1/3 bg-slate-300")}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_POSTER_URL}/${movie.poster_path}`}
          alt={`Movie poster for ${movie.title}`}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 basis-2/3 flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Heading
              variant="h4"
              className={cn("line-clamp-1 text-xl text-slate-800")}
            >
              {movie.title}
            </Heading>
            <Text className={cn("line-clamp-1 text-sm text-slate-600")}>
              {parseAndFormatDate(movie.release_date)}
            </Text>
          </div>
          <Text
            className={cn(
              "line-clamp-4 overflow-hidden text-ellipsis text-wrap text-xs text-slate-600",
            )}
          >
            {movie.overview}
          </Text>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button variant="outline" size="sm">
            <HeartIcon className="h-4 w-4" />
          </Button>
          <Text
            className={cn(
              "line-clamp-4 text-right text-sm font-semibold text-slate-600",
              getVoteColor(movie.vote_average),
            )}
          >
            {getVoteAsPercentage(movie.vote_average)}
          </Text>
        </div>
      </div>
    </Link>
  );
}

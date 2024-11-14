"use client";

import { usePopularMovies } from "@/shared/hooks/use-popular-movies";
import type React from "react";
import { useEffect, useState } from "react";
import { type Movie } from "@/shared/models/movie";
import { isDefined, isEmpty } from "remeda";
import { MovieCard } from "./movie-card";
import { LoadingSpinner } from "@/shared/components/loading-spinner";

interface PopularMoviesState {
  page: number;
  totalPages: number;
  latestPage: number;
  isLoading: boolean;
  movies: Movie[];
}

export function PopularMovies() {
  const [
    { page, totalPages, latestPage, isLoading, movies },
    setPopularMoviesState,
  ] = useState<PopularMoviesState>({
    page: 1,
    totalPages: 0,
    latestPage: 0,
    isLoading: false,
    movies: [],
  });
  const { data, error } = usePopularMovies({ page });

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    if (bottom && !isLoading) {
      setPopularMoviesState((currentState) => ({
        ...currentState,
        page: currentState.page + 1,
        isLoading: true,
      }));
    }
  }

  useEffect(() => {
    if (isDefined(data) && data.page > latestPage) {
      setPopularMoviesState((currentState) => {
        const deduplicatedMovies = data.results.filter(
          (newMovie) =>
            !currentState.movies.some((movie) => movie.id === newMovie.id),
        );
        const updatedMovies = [...currentState.movies, ...deduplicatedMovies];
        return {
          page: currentState.page,
          totalPages: data.total_results,
          latestPage: data.page,
          isLoading: false,
          movies: updatedMovies,
        };
      });
    }
  }, [data, latestPage]);

  if (isLoading && isEmpty(movies)) {
    return (
      <div className="flex h-full w-full justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isDefined(error) && isEmpty(movies)) {
    return (
      <div className="flex h-full w-full justify-center py-4">
        Error loading popular movies
      </div>
    );
  }

  return (
    <div
      className="grid h-full max-h-full w-full grid-flow-row grid-cols-1 gap-4 overflow-y-scroll p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      onScroll={handleScroll}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {!isEmpty(movies) && page !== totalPages && (
        <div className="col-span-full flex h-16 w-full justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

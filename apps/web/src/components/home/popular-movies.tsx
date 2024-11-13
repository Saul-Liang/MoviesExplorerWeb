"use client";

import { usePopularMovies } from "@/shared/hooks/use-popular-movies";
import React, { useEffect, useState } from "react";
import { Movie } from "@/shared/models/movie";
import { isDefined, isEmpty } from "remeda";
import { MovieCard } from "./movie-card";
import { LoadingSpinner } from "@/shared/components/loading-spinner";

interface PopularMoviesState {
  page: number;
  totalPages: number;
  latestPage: number;
  movies: Movie[];
}

export function PopularMovies() {
  const [{ page, totalPages, latestPage, movies }, setPopularMoviesState] =
    useState<PopularMoviesState>({
      page: 1,
      totalPages: 0,
      latestPage: 0,
      movies: [],
    });
  const { data, isLoading, error } = usePopularMovies({ page });

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;
    if (bottom && !isLoading) {
      setPopularMoviesState((currentState) => ({
        ...currentState,
        page: currentState.page + 1,
      }));
    }
  }

  useEffect(() => {
    if (isDefined(data) && data.page > latestPage) {
      setPopularMoviesState((currentState) => {
        const sanitisedMovies = data.results.filter(
          (newMovie) =>
            !currentState.movies.some((movie) => movie.id === newMovie.id),
        );
        const updatedMovies = [...currentState.movies, ...sanitisedMovies];
        return {
          page: currentState.page,
          totalPages: data.total_results,
          latestPage: data.page,
          movies: updatedMovies,
        };
      });
    }
  }, [data]);

  if (isLoading && isEmpty(movies)) {
    return (
      <div className="flex w-full justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isDefined(error) && isEmpty(movies)) {
    return (
      <div className="flex w-full justify-center py-4">
        Error loading popular movies
      </div>
    );
  }

  return (
    <div
      className="grid max-h-full w-full grid-flow-row grid-cols-1 gap-4 overflow-y-scroll p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      onScroll={handleScroll}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {!isEmpty(movies) && page !== totalPages && (
        <div className="col-span-full flex w-full justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

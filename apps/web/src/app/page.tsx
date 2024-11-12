"use client";
import { usePopularMovies } from "@/shared/hooks/use-popular-movies";
import { Heading } from "@darkbluetechnologies/ui/heading";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePopularMovies({ page });

  console.log(data);

  return (
    <div className="container">
      <Heading variant="h1">Popular movies</Heading>
    </div>
  );
}

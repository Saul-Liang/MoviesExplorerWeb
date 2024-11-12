import { get } from "@/shared/lib/request";
import { RequestError } from "@/shared/models/error/request-error";
import {
  PaginatedMovies,
  PaginatedMoviesSchema,
} from "@/shared/models/paginated-movies";
import { NextRequest, NextResponse } from "next/server";

const MOCK: PaginatedMovies = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      genre_ids: [878, 28, 12],
      id: 912649,
      original_language: "en",
      original_title: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 5233.482,
      poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      release_date: "2024-10-22",
      title: "Venom: The Last Dance",
      vote_average: 6.5,
      vote_count: 618,
    },
  ],
};

export async function GET(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams;
  return NextResponse.json(MOCK);

  // const result = await get([
  //   "https://api.themoviedb.org/3/discover/movie",
  //   PaginatedMoviesSchema,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  //     },
  //     searchParams,
  //   },
  // ]);

  // if (result.success) {
  //   console.log("__DEBUG:", result.data);
  //   return Response.json(result.data);
  // } else {
  //   const error =
  //     result.error instanceof RequestError ? result.error : new RequestError();
  //   return new Response(error.message, {
  //     status: error.status,
  //   });
  // }
}

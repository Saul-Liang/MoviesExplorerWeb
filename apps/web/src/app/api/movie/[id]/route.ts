import { ROUTES } from "@/shared/constants/routes";
import { getTmdb } from "@/shared/lib/networking/request";
import { RequestError } from "@/shared/models/error/request-error";
import { movieDetailsSchema } from "@/shared/models/movie-details";
import { type NextRequest, NextResponse } from "next/server";
import { isNonNull } from "remeda";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const movie_id = searchParams.get("id");

  try {
    if (isNonNull(movie_id)) {
      const response = await getTmdb({
        url: ROUTES.API.EXTERNAL.TMDB.MOVIE(movie_id),
        responseSchema: movieDetailsSchema,
        config: {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
        },
      });

      return NextResponse.json(response);
    } else {
      throw new RequestError({ message: "Movie ID is required", status: 400 });
    }
  } catch (error) {
    if (error instanceof RequestError) {
      return new NextResponse(error.message, {
        status: error.status,
      });
    } else {
      return new NextResponse("Oops! Something's gone wrong!", { status: 500 });
    }
  }
}

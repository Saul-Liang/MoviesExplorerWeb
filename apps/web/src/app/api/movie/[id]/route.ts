import { getTmdb } from "@/shared/lib/networking/request";
import { RequestError } from "@/shared/models/error/request-error";
import { movieDetailsSchema } from "@/shared/models/movie-details";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const movie_id = searchParams.get("id");

  try {
    const response = await getTmdb({
      url: `/3/movie/${movie_id}`,
      responseSchema: movieDetailsSchema,
      config: {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      },
    });

    return NextResponse.json(response);
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

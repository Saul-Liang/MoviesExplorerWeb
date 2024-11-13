import { getTmdb } from "@/shared/lib/networking/request";
import { RequestError } from "@/shared/models/error/request-error";
import { PaginatedMoviesSchema } from "@/shared/models/paginated-movies";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  try {
    const response = await getTmdb({
      url: "/3/discover/movie",
      responseSchema: PaginatedMoviesSchema,
      config: {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        params: {
          page,
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

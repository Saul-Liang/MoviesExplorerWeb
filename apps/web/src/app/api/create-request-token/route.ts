import { ROUTES } from "@/shared/constants/routes";
import { getTmdb } from "@/shared/lib/networking/request";
import { RequestError } from "@/shared/models/error/request-error";
import { createRequestTokenResponseSchema } from "@/shared/models/create-request-token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getTmdb({
      url: ROUTES.API.EXTERNAL.TMDB.CREATE_REQUEST_TOKEN,
      responseSchema: createRequestTokenResponseSchema,
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

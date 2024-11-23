import { ROUTES } from "@/shared/constants/routes";
import { postTmdb } from "@/shared/lib/networking/request";
import { validate } from "@/shared/lib/validate";
import { createSessionRequestSchema } from "@/shared/models/create-session";
import { RequestError } from "@/shared/models/error/request-error";
import { createSessionResponseSchema } from "@/shared/models/create-session";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  try {
    const data = validate({
      data: body,
      schema: createSessionRequestSchema,
    });

    const response = await postTmdb({
      url: ROUTES.API.EXTERNAL.TMDB.CREATE_SESSION,
      data,
      responseSchema: createSessionResponseSchema,
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

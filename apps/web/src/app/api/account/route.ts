import { ROUTES } from "@/shared/constants/routes";
import { getTmdb } from "@/shared/lib/networking/request";
import { accountDetailsSchema } from "@/shared/models/account";
import { RequestError } from "@/shared/models/error/request-error";
import { type NextRequest, NextResponse } from "next/server";
import { isNonNull } from "remeda";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (isNonNull(session_id)) {
      const response = await getTmdb({
        url: ROUTES.API.EXTERNAL.TMDB.ACCOUNT,
        responseSchema: accountDetailsSchema,
        config: {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          },
          params: { session_id },
        },
      });

      return NextResponse.json(response);
    } else {
      throw new RequestError({
        message: "Session ID is required",
        status: 400,
      });
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

import { ROUTES } from "@/shared/constants/routes";
import { deleteTmdb } from "@/shared/lib/networking/request";
import { RequestError } from "@/shared/models/error/request-error";
import { deleteSessionResponseSchema } from "@/shared/models/delete-session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id: session_id } = params;

  try {
    const response = await deleteTmdb({
      url: ROUTES.API.EXTERNAL.TMDB.DELETE_SESSION,
      responseSchema: deleteSessionResponseSchema,
      config: {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        data: {
          session_id,
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

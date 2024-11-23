"use client";

import { Button } from "@ui/components/ui/button";
import { getInternalWithSchema } from "../lib/networking/request";
import { createRequestTokenResponseSchema } from "../models/create-request-token";
import { ROUTES } from "../constants/routes";
import { useState } from "react";
import { Loader2 } from "@ui/components/ui/icons";
import { useAuthContext } from "../context/auth-context";

export function Session() {
  const { authenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      if (authenticated) {
        // TODO: Implement sign out
        console.log("Sign out clicked");
      } else {
        const response = await getInternalWithSchema(
          createRequestTokenResponseSchema,
        )([ROUTES.API.INTERNAL.CREATE_REQUEST_TOKEN]);
        window.location.replace(
          `${process.env.NEXT_PUBLIC_TMDB_URL}/${ROUTES.PAGE.EXTERNAL.TMDB.AUTHENTICATE({ request_token: response.request_token, redirect_to: process.env.NEXT_PUBLIC_APP_URL })}`,
        );
      }
    } catch {
      // TODO: Handle error
    }
    setIsLoading(false);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : authenticated ? (
        "Sign out"
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

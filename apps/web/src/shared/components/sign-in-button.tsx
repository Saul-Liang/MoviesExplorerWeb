"use client";

import { Button } from "@ui/components/ui/button";
import { Loader2 } from "@ui/components/ui/icons";
import { useState } from "react";
import { useAuthContext } from "../context/auth-context";

export function SignInButton() {
  const { authState, createSession, deleteSession } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      if (authState.status === "authenticated") {
        await deleteSession();
        setIsLoading(false);
      } else {
        await createSession();
      }
    } catch {
      // TODO: Handle error
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      {authState.status === "loading" || isLoading ? (
        <Loader2 className="animate-spin" />
      ) : authState.status === "authenticated" ? (
        "Sign out"
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

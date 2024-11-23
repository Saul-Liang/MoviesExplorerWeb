"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { isDefined, isNonNull } from "remeda";
import { postInternalWithSchema } from "../lib/networking/request";
import { createSessionResponseSchema } from "../models/create-session";
import { ROUTES } from "../constants/routes";

type AuthContextType = {
  session_id: string | undefined;
  authenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestToken = searchParams.get("request_token");
  const approved = searchParams.get("approved");

  const [authState, setAuthState] = useState<AuthContextType>({
    session_id: undefined,
    authenticated: false,
  });

  useEffect(() => {
    async function createSession(requestToken: string) {
      const response = await postInternalWithSchema(
        createSessionResponseSchema,
      )([
        ROUTES.API.INTERNAL.CREATE_SESSION,
        {
          request_token: requestToken,
        },
      ]);

      if (response.success) {
        const { session_id } = response;
        localStorage.setItem("session_id", session_id);
        setAuthState({ session_id, authenticated: true });
      }

      router.replace(pathname);
    }

    if (isNonNull(requestToken) && isNonNull(approved) && approved === "true") {
      void createSession(requestToken);
    }
  }, [approved, pathname, requestToken, router]);

  useEffect(() => {
    if (!isDefined(authState?.session_id)) {
      const session_id = localStorage.getItem("session_id");
      if (isNonNull(session_id)) {
        setAuthState({ session_id, authenticated: true });
      }
    }
  }, [authState]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

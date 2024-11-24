"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { isNonNull } from "remeda";
import {
  deleteInternalWithSchema,
  getInternalWithSchema,
  postInternalWithSchema,
} from "../lib/networking/request";
import { createSessionResponseSchema } from "../models/create-session";
import { ROUTES } from "../constants/routes";
import { createRequestTokenResponseSchema } from "../models/create-request-token";
import { deleteSessionResponseSchema } from "../models/delete-session";
import { accountDetailsSchema } from "../models/account";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

type AuthStateType = {
  session_id: string | null;
  account_id: string | null;
  status: AuthStatus;
};

type AuthContextType = {
  authState: AuthStateType;
  createSession: () => Promise<void>;
  deleteSession: () => Promise<void>;
};

const UNAUTHENTICATED_STATE: AuthStateType = {
  session_id: null,
  account_id: null,
  status: "unauthenticated",
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
  const isAuthInProgress =
    isNonNull(requestToken) && isNonNull(approved) && approved === "true";

  const [authState, setAuthState] = useState<AuthStateType>({
    session_id: null,
    account_id: null,
    status: "loading",
  });

  function clearAuthenticationState() {
    localStorage.removeItem("session_id");
    localStorage.removeItem("account_id");
    setAuthState(UNAUTHENTICATED_STATE);
  }

  async function handleCreateSession() {
    const response = await getInternalWithSchema(
      createRequestTokenResponseSchema,
    )([ROUTES.API.INTERNAL.CREATE_REQUEST_TOKEN]);

    if (response.success) {
      router.push(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/${ROUTES.PAGE.EXTERNAL.TMDB.AUTHENTICATE({ request_token: response.request_token, redirect_to: process.env.NEXT_PUBLIC_APP_URL })}`,
      );
    } else {
      throw new Error("Failed to create request token");
    }
  }

  async function handleDeleteSession() {
    if (isNonNull(authState?.session_id)) {
      const response = await deleteInternalWithSchema(
        deleteSessionResponseSchema,
      )([ROUTES.API.INTERNAL.DELETE_SESSION(authState.session_id)]);

      if (response.success) {
        clearAuthenticationState();
      }
    }
  }

  useEffect(() => {
    async function createSession(requestToken: string) {
      try {
        const sessionResponse = await postInternalWithSchema(
          createSessionResponseSchema,
        )([
          ROUTES.API.INTERNAL.CREATE_SESSION,
          { request_token: requestToken },
        ]);
        const { session_id } = sessionResponse;

        const accountResponse = await getInternalWithSchema(
          accountDetailsSchema,
        )([ROUTES.API.INTERNAL.ACCOUNT(session_id)]);
        const account_id = accountResponse.id.toString();

        if (sessionResponse.success) {
          localStorage.setItem("session_id", session_id);
          localStorage.setItem("account_id", account_id);
          setAuthState({ session_id, account_id, status: "authenticated" });
        } else {
          clearAuthenticationState();
        }
      } catch {
        clearAuthenticationState();
      }
      router.replace(pathname);
    }

    if (isAuthInProgress) {
      setAuthState((currentState) => ({
        ...currentState,
        status: "loading",
      }));
      void createSession(requestToken);
    }
  }, [approved, pathname, requestToken, router]);

  useEffect(() => {
    if (authState.status === "loading" && !isAuthInProgress) {
      const session_id = localStorage.getItem("session_id");
      const account_id = localStorage.getItem("account_id");
      if (isNonNull(session_id) && isNonNull(account_id)) {
        setAuthState({ session_id, account_id, status: "authenticated" });
      } else {
        clearAuthenticationState();
      }
    }
  }, [authState.status]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        createSession: handleCreateSession,
        deleteSession: handleDeleteSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

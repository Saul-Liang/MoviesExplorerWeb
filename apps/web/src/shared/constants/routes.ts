export const ROUTES = {
  PAGE: {
    INTERNAL: {
      HOME: "",
      FAVOURITE_MOVIES: "favourite-movies",
    },
    EXTERNAL: {
      TMDB: {
        AUTHENTICATE: ({
          request_token,
          redirect_to,
        }: {
          request_token: string;
          redirect_to: string;
        }) => `authenticate/${request_token}?redirect_to=${redirect_to}`,
      },
    },
  },
  API: {
    INTERNAL: {
      ACCOUNT: (session_id: string) => `api/account?session_id=${session_id}`,
      POPULAR_MOVIES: "api/popular-movies",
      CREATE_REQUEST_TOKEN: "api/create-request-token",
      CREATE_SESSION: "api/create-session",
      DELETE_SESSION: (session_id: string) =>
        `api/delete-session/${session_id}`,
      FAVORITE: "api/favorite",
    },
    EXTERNAL: {
      TMDB: {
        ACCOUNT: "3/account",
        POPULAR_MOVIES: "3/movie/popular",
        MOVIE: (id: string) => `3/movie/${id}`,
        CREATE_REQUEST_TOKEN: "3/authentication/token/new",
        CREATE_SESSION: "3/authentication/session/new",
        DELETE_SESSION: "3/authentication/session",
        FAVORITE: (account_id: string) => `3/account/${account_id}/favorite`,
      },
    },
  },
};

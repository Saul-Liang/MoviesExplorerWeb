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
      POPULAR_MOVIES: "api/popular-movies",
      CREATE_REQUEST_TOKEN: "api/create-request-token",
      CREATE_SESSION: "api/create-session",
    },
    EXTERNAL: {
      TMDB: {
        POPULAR_MOVIES: "3/movie/popular",
        MOVIE: (id: string) => `3/movie/${id}`,
        CREATE_REQUEST_TOKEN: "3/authentication/token/new",
        CREATE_SESSION: "3/authentication/session/new",
      },
    },
  },
};

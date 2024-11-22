export const ROUTES = {
  PAGE: {
    HOME: "/",
    FAVOURITE_MOVIES: "/favourite-movies",
  },
  API: {
    INTERNAL: {
      POPULAR_MOVIES: "/api/popular-movies",
    },
    EXTERNAL: {
      TMDB: {
        POPULAR_MOVIES: "/3/movie/popular",
        CREATE_REQUEST_TOKEN: "/3/authentication/token/new",
      },
    },
  },
};

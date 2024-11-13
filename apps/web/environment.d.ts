declare namespace NodeJS {
  interface ProcessEnv {
    // Private
    TMDB_ACCESS_TOKEN: string;

    // Public
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_TMDB_URL: string;
    NEXT_PUBLIC_TMDB_POSTER_URL: string;
  }
}

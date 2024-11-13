import { PaginatedMovies } from "@/shared/models/paginated-movies";

export const PAGINATED_MOVIES_MOCK: PaginatedMovies = {
  page: 1,
  total_pages: 1,
  total_results: 3,
  results: [
    {
      adult: false,
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      genre_ids: [878, 28, 12],
      id: 912649,
      original_language: "en",
      original_title: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 5233.482,
      poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      release_date: "2024-10-22",
      title: "Venom: The Last Dance",
      vote_average: 6.5,
      vote_count: 618,
    },
    {
      adult: false,
      backdrop_path: "/2fxnTXr8NwyTFkunkimJkGkhqfy.jpg",
      genre_ids: [18, 28, 27],
      id: 1118031,
      original_language: "es",
      original_title: "Apocalipsis Z: el principio del fin",
      overview:
        "When a kind of rabies that transforms people into aggressive creatures spreads across the planet, Manel isolates himself at home with his cat, relying on his wits to survive; but soon they must go out in search of food, by land and by sea, dodging many dangers.",
      popularity: 2835.786,
      poster_path: "/wIGJnIFQlESkC2rLpfA8EDHqk4g.jpg",
      release_date: "2024-10-04",
      title: "Apocalypse Z: The Beginning of the End",
      vote_average: 6.8,
      vote_count: 387,
    },
    {
      adult: false,
      backdrop_path: "/18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg",
      genre_ids: [27, 53, 9648],
      id: 1034541,
      original_language: "en",
      original_title: "Terrifier 3",
      overview:
        "Five years after surviving Art the Clown's Halloween massacre, Sienna and Jonathan are still struggling to rebuild their shattered lives. As the holiday season approaches, they try to embrace the Christmas spirit and leave the horrors of the past behind. But just when they think they're safe, Art returns, determined to turn their holiday cheer into a new nightmare. The festive season quickly unravels as Art unleashes his twisted brand of terror, proving that no holiday is safe.",
      popularity: 3304.003,
      poster_path: "/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg",
      release_date: "2024-10-09",
      title: "Terrifier 3",
      vote_average: 6.9,
      vote_count: 886,
    },
  ],
};

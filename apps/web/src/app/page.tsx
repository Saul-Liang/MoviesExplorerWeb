import { PopularMovies } from "@/components/home/popular-movies";
import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { ROUTES } from "@/shared/constants/routes";
import { getInternalWithSchema } from "@/shared/lib/networking/request";
import { type Breadcrumb } from "@/shared/models/breadcrumb";
import { paginatedMoviesSchema } from "@/shared/models/paginated-movies";

const HOME_BREADCRUMBS: Breadcrumb[] = [
  { id: "popular-movies", title: "Popular movies", url: null },
];

export default async function HomePage() {
  const popularMoviesState = await getInternalWithSchema(paginatedMoviesSchema)(
    [ROUTES.API.INTERNAL.POPULAR_MOVIES, { params: { page: "1" } }],
  );
  return (
    <PageLayout leftItem={<Breadcrumbs breadcrumbs={HOME_BREADCRUMBS} />}>
      <PopularMovies
        popularMoviesState={{
          page: popularMoviesState.page,
          totalPages: popularMoviesState.total_results,
          latestPage: popularMoviesState.page,
          isLoading: false,
          movies: popularMoviesState.results,
        }}
      />
    </PageLayout>
  );
}

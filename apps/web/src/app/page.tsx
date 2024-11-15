import { PopularMovies } from "@/components/home/popular-movies";
import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { type Breadcrumb } from "@/shared/models/breadcrumb";

const HOME_BREADCRUMBS: Breadcrumb[] = [
  { id: "popular-movies", title: "Popular movies", url: null },
];

export default function HomePage() {
  return (
    <PageLayout leftItem={<Breadcrumbs breadcrumbs={HOME_BREADCRUMBS} />}>
      <PopularMovies />
    </PageLayout>
  );
}

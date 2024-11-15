import { Movie } from "@/components/home/movie";
import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { type Breadcrumb } from "@/shared/models/breadcrumb";

const MOVIE_BREADCRUMBS: Breadcrumb[] = [
  { id: "popular-movies", title: "Popular movies", url: "/" },
  { id: "movie", title: "Movie", url: null },
];

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <PageLayout leftItem={<Breadcrumbs breadcrumbs={MOVIE_BREADCRUMBS} />}>
      <Movie id={id} />
    </PageLayout>
  );
}

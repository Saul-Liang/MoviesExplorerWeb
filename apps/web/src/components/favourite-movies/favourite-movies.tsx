import { type Breadcrumb } from "@/shared/models/breadcrumb";
import { PageLayout } from "../layout/page-layout";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";

const FAVOURITE_MOVIES_BREADCRUMBS: Breadcrumb[] = [
  { id: "favourite-movies", title: "Favourite movies", url: null },
];

export function FavouriteMovies() {
  return (
    <PageLayout
      leftItem={<Breadcrumbs breadcrumbs={FAVOURITE_MOVIES_BREADCRUMBS} />}
    >
      Favourite movies placeholder
    </PageLayout>
  );
}

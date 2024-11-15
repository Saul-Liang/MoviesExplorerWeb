import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumbs } from "@/shared/components/breadcrumbs";
import { type Breadcrumb } from "@/shared/models/breadcrumb";

const FAVOURITE_MOVIES_BREADCRUMBS: Breadcrumb[] = [
  { id: "favourite-movies", title: "Favourite movies", url: null },
];

export default function FavouriteMoviesPage() {
  return (
    <PageLayout
      leftItem={<Breadcrumbs breadcrumbs={FAVOURITE_MOVIES_BREADCRUMBS} />}
    >
      Favourite movies placeholder
    </PageLayout>
  );
}

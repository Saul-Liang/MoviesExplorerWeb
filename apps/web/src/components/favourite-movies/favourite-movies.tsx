import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@ui/components/ui/breadcrumb";
import { PageLayout } from "../layout/page-layout";

export function FavouriteMovies() {
  return (
    <PageLayout leftItem={<FavouriteMoviesBreadcrumbs />}>
      Favourite movies placeholder
    </PageLayout>
  );
}

function FavouriteMoviesBreadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Favourite movies</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

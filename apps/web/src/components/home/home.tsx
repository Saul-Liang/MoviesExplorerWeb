import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@ui/components/ui/breadcrumb";
import { PageLayout } from "../layout/page-layout";
import { PopularMovies } from "./popular-movies";

export function Home() {
  return (
    <PageLayout leftItem={<HomeBreadcrumbs />}>
      <PopularMovies />
    </PageLayout>
  );
}

function HomeBreadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Popular movies</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

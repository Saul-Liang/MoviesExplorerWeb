import Link from "next/link";
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/components/ui/breadcrumb";

import { type Breadcrumb } from "../models/breadcrumb";
import { isNonNull } from "remeda";
import { Fragment } from "react";

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb) => (
          <Fragment key={breadcrumb.id}>
            <BreadcrumbItem>
              {isNonNull(breadcrumb.url) ? (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.url}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {isNonNull(breadcrumb.url) && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
}

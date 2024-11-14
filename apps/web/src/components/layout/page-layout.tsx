import React from "react";
import { type ReactNode } from "react";
import { Topbar } from "./topbar";
import { cn } from "@ui/lib/utils";

type PageLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  leftItem?: ReactNode | undefined;
  rightItem?: ReactNode | undefined;
  contentContainerProps?: React.HTMLAttributes<HTMLDivElement> | undefined;
};

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    { leftItem, rightItem, className, children, contentContainerProps },
    ref,
  ) => (
    <div
      className={cn(
        "flex h-screen max-h-screen w-full flex-col overflow-hidden",
        className,
      )}
      ref={ref}
    >
      <Topbar leftItem={leftItem} rightItem={rightItem} />
      <div
        className={cn(
          "flex h-full max-h-full w-full overflow-hidden",
          contentContainerProps?.className,
        )}
      >
        {children}
      </div>
    </div>
  ),
);
PageLayout.displayName = "Page layout";

export { PageLayout };

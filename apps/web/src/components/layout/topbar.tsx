import { Separator } from "@ui/components/ui/separator";
import { SidebarTrigger } from "@ui/components/ui/sidebar";
import { cn } from "@ui/lib/utils";
import React from "react";

export type TopbarProps = React.HTMLAttributes<HTMLElement> & {
  leftItem: React.ReactNode;
  rightItem: React.ReactNode;
};

function Topbar({
  leftItem,
  rightItem,
  children,
  className,
  ...props
}: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className={cn("flex h-12 items-center", className)} {...props}>
        {leftItem}
        {rightItem}
      </div>
    </header>
  );
}

export { Topbar };

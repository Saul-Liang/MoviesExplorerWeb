import { cn } from "@/lib/utils";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, ...props }, ref) => {
    const Comp = variant ?? "h1";
    return (
      <Comp
        className={cn(headingVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

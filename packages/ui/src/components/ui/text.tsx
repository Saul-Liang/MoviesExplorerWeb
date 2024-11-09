import { cn } from "@/lib/utils";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm [&:not(:first-child)]:mt-3",
      md: "text-md [&:not(:first-child)]:mt-6",
      lg: "text-lg [&:not(:first-child)]:mt-9",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <p
        className={cn(textVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

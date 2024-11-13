import * as React from "react";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, ...props }, ref) => {
    return <p className={className} ref={ref} {...props} />;
  },
);
Text.displayName = "Text";

export { Text };

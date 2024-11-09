import React from "react";
import { PropsWithChildren } from "react";

export const Button = ({ children }: PropsWithChildren) => (
  <button>{children}</button>
);

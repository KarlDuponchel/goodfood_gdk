"use client";

import { AuthProvider } from "@/components/auth/auth_provider";
import { ReactQueryProvider } from "@/components/providers/react_query";
import { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
};
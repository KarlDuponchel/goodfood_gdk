"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
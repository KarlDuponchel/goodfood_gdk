"use client";

import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { status, authenticate } = useAuth();

  useEffect(() => authenticate(), [authenticate]);

  if (status === AuthStatus.Unknown) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
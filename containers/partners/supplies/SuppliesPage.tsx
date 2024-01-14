"use client";

import { Loading } from "@/containers/Loading/loading";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { SuppliesTable } from "@/containers/partners/supplies/SuppliesTable";
import { useAuth } from "@/hooks/useAuth";

export const SuppliesPage = () => {
  const { user } = useAuth();

  if (!user) return <Loading />;
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8">
        <SuppliesTable idRestaurant={user._restaurant} />
      </div>
    </div>
  );
};

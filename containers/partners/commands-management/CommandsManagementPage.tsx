"use client";

import { CommandsManagementContent } from "@/containers/partners/commands-management/CommandsManagementContent";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const CommandsManagementPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return router.push("/connect");

  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8">
        <CommandsManagementContent idRestaurant={user._restaurant} />
      </div>
    </div>
  );
};

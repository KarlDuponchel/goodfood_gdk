"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/containers/Loading/loading";
import { CommandsTable } from "@/containers/partners/commands-management/CommandsTable";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { useFetchAllRestaurants } from "@/hooks/restaurants/use_fetch_all_restaurants";
import { useAuth } from "@/hooks/useAuth";

export const CommandsManagementPage = () => {
  const { user } = useAuth();

  const [valueRestaurant, setValueRestaurant] = useState("");
  const allRestaurants = useFetchAllRestaurants();

  if (!user) return <Loading />;
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8 max-lg:col-span-full">
        {user._restaurant ? (
          <CommandsTable id_restaurant={user._restaurant} />
        ) : Number(valueRestaurant) !== 0 ? (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-12">
              <Select onValueChange={(e) => setValueRestaurant(e)}>
                <SelectTrigger className="w-3/4">
                  <SelectValue placeholder="Sélectionner un restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {allRestaurants.data &&
                    allRestaurants.data.data.map((restaurant) => {
                      return (
                        <SelectItem value={String(restaurant.ID)}>
                          {restaurant.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <CommandsTable id_restaurant={Number(valueRestaurant)} />
            </div>
          </>
        ) : (
          <div className="flex justify-center pt-12">
            <Select onValueChange={(e) => setValueRestaurant(e)}>
              <SelectTrigger className="w-3/4">
                <SelectValue placeholder="Sélectionner un restaurant" />
              </SelectTrigger>
              <SelectContent>
                {allRestaurants.data &&
                  allRestaurants.data.data.map((restaurant) => {
                    return (
                      <SelectItem value={String(restaurant.ID)}>
                        {restaurant.name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

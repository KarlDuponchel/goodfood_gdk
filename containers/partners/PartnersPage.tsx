"use client";

import { use, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PartnersRestaurantMenu } from "@/containers/partners/PartnersRestaurantMenu";
import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { useFetchAllRestaurants } from "@/hooks/restaurants/use_fetch_all_restaurants";
import { useAuth } from "@/hooks/useAuth";

export const PartnersPage = () => {
  const { user } = useAuth();

  const [valueRestaurant, setValueRestaurant] = useState("");
  const allRestaurants = useFetchAllRestaurants();

  if (!user) return <div>loading...</div>;
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8 max-lg:col-start-1">
        {user._restaurant ? (
          <PartnersRestaurantMenu id_restaurant={user._restaurant} />
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
              <PartnersRestaurantMenu id_restaurant={Number(valueRestaurant)} />
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

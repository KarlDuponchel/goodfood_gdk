import { FunctionComponent } from "react";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";

type CommandsManagementContentProps = {
  idRestaurant: number;
};

export const CommandsManagementContent: FunctionComponent<
  CommandsManagementContentProps
> = ({ idRestaurant }) => {
  const restaurant = useFetchRestaurantById(idRestaurant);

  if (!restaurant) return <div>Loading...</div>;
  return <div>{restaurant.data?.name}</div>;
};

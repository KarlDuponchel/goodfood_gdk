import { PartnersRestaurantForm } from "@/containers/partners/PartnersRestaurantForm";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";

type PartnersRestaurantMenuProps = {
  id_restaurant?: number;
};

export const PartnersRestaurantMenu = ({
  id_restaurant,
}: PartnersRestaurantMenuProps) => {
  const restaurant = useFetchRestaurantById(id_restaurant ?? -1);

  if (!restaurant.data) return <div>loading...</div>;
  return (
    <div className="flex w-3/4 justify-center pt-24">
      <PartnersRestaurantForm restaurant={restaurant.data} />
    </div>
  );
};

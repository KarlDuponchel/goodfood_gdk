import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchRestaurantById = async (id: number) => {
  return await apiFetch<Restaurant>(`/restaurant/restaurants/${id}`);
};

export const useFetchRestaurantById = (id: number) => {
  return useQuery({
    queryKey: ["restaurant-by-id", id],
    queryFn: () => fetchRestaurantById(id),
  });
};

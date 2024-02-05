import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchAllRestaurants = async () => {
  return await apiFetch<{
    data: Restaurant[];
  }>(`/restaurant/restaurants?limit=100`);
};

export const useFetchAllRestaurants = () => {
  return useQuery({
    queryKey: ["all-restaurants"],
    queryFn: () => fetchAllRestaurants(),
  });
};

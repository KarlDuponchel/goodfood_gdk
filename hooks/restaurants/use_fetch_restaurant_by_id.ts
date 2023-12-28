import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchRestaurantById = async (id: number) => {
    return await apiFetch<{
        id: number,
        name: string,
        address: string,
        additional_address: string,
        city: string,
        zip_code: string,
        country: string
    }>(`/restaurant/restaurants/${id}`);
};

export const useFetchRestaurantById = (id: number) => {
    return useQuery({
        queryKey: ["restaurant-by-id", id],
        queryFn: () => fetchRestaurantById(id),
      });
  };
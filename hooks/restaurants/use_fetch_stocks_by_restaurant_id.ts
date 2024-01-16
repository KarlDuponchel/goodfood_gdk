import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchStocksByRestaurantId = async (id: number) => {
  return await apiFetch<any>(`/restaurant/stocks?id_restaurant=${id}`);
};

export const useFetchStocksByRestaurantById = (id: number) => {
  return useQuery({
    queryKey: ["stocks-by-restaurant-id", id],
    queryFn: () => fetchStocksByRestaurantId(id),
  });
};

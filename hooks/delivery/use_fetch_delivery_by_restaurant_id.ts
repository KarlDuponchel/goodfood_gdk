import { apiFetch } from "@/utils/fetch";
import { Deliveries } from "@/utils/types";
import { useQuery } from "react-query";

const fetchDeliveriesByRestaurantId = async (id: number) => {
  return await apiFetch<Deliveries[]>(`/delivery/deliveries/restaurant/${id}`);
};

export const useFetchDeliveriesByRestaurantID = (id: number) => {
  return useQuery({
    queryKey: ["deliveries-by-restaurant-id", id],
    queryFn: () => fetchDeliveriesByRestaurantId(id),
    keepPreviousData: true,
  });
};

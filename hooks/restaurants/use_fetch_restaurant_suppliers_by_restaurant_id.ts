import { apiFetch } from "@/utils/fetch";
import { Restaurant, RestaurantSuppliers } from "@/utils/types";
import { useQuery } from "react-query";

const fetchRestaurantSuppliersByRestaurantId = async (id: number) => {
  return await apiFetch<RestaurantSuppliers>(
    `/restaurant/restaurant-suppliers?id_restaurant=${id}`,
  );
};

export const useFetchRestaurantSuppliersByRestaurantId = (id: number) => {
  return useQuery({
    queryKey: ["restaurant-suppliers-by-restaurant-id", id],
    queryFn: () => fetchRestaurantSuppliersByRestaurantId(id),
  });
};

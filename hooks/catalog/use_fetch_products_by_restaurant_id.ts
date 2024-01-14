import { apiFetch } from "@/utils/fetch";
import { Product } from "@/utils/types";
import { useQuery } from "react-query";

const fetchProductsByRestaurantID = async (idRestaurant: number) => {
  return await apiFetch<any>(`/catalog/products?id_restaurant=${idRestaurant}`);
};

export const useFetchProductsByRestaurantID = (idRestaurant: number) => {
  return useQuery({
    queryKey: ["products-by-restaurant-id", idRestaurant],
    queryFn: () => fetchProductsByRestaurantID(idRestaurant),
    keepPreviousData: true,
  });
};

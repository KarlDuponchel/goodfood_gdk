import { apiFetch } from "@/utils/fetch";
import { Basket } from "@/utils/types";
import { useQuery } from "react-query";

const fetchBasketByUserID = async (id: string) => {
  return await apiFetch<Basket>(`/order/baskets/${id}`);
};

export const useFetchBasketByUserID = (id: string) => {
  return useQuery({
    queryKey: ["basket-by-user-id", id],
    queryFn: () => fetchBasketByUserID(id),
    keepPreviousData: true,
  });
};

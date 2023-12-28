import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchProductByID = async (id: number) => {
    return await apiFetch<{
        id: number,
        name: string,
        price: number,
        id_restaurant: number,
        description: string,
        image: string
    }>(`/catalog/products/${id}`);
};

export const useFetchProductByID = (id: number) => {
    return useQuery({
        queryKey: ["product-by-id", id],
        queryFn: () => fetchProductByID(id),
        keepPreviousData: true,
      });
  };
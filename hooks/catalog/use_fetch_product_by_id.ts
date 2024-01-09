import { apiFetch } from "@/utils/fetch";
import { Product } from "@/utils/types";
import { useQuery } from "react-query";

const fetchProductByID = async (id: number) => {
    return await apiFetch<Product>(`/catalog/products/${id}`);
};

export const useFetchProductByID = (id: number) => {
    return useQuery({
        queryKey: ["product-by-id", id],
        queryFn: () => fetchProductByID(id),
        keepPreviousData: true,
      });
  };
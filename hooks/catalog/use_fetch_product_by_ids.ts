import { apiFetch } from "@/utils/fetch";
import { Product } from "@/utils/types";
import { useQuery } from "react-query";

const fetchProductByID = async (ids: number) => {
  return await apiFetch<Product>(`/catalog/products?ids=${ids}`);
};

export const useFetchProductByID = (ids: number) => {
  return useQuery({
    queryKey: ["product-by-ids", ids],
    queryFn: () => fetchProductByID(ids),
    keepPreviousData: true,
  });
};

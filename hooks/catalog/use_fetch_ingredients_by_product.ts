import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchIngredientsIdsByProductID = async (id: number) => {
    return await apiFetch<{
        count: number;
        data: Array<{
            id_ingredient: number,
            id_product: number,
            required_quantity: number
        }>
    }>(`/catalog/product-ingredients?id_product=${id}`);
};

export const useFetchIngredientsIdsByProductID = (id: number) => {
    return useQuery({
        queryKey: ["product-ingredients-by-id", id],
        queryFn: () => fetchIngredientsIdsByProductID(id),
      });
  };
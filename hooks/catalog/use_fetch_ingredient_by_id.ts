import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchIngredientById = async (id: number) => {
    return await apiFetch<{
        id: number,
        name: string,
        is_allergen: boolean,
        is_allergen_description: string
    }>(`/catalog/products/${id}`);
};

export const useFetchIngredientById = (id: number) => {
    return useQuery({
        queryKey: ["ingredient-by-id", id],
        queryFn: () => fetchIngredientById(id),
        keepPreviousData: true,
      });
  };
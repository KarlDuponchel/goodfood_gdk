import { apiFetch } from "@/utils/fetch";
import { Ingredient } from "@/utils/types";
import { useQuery } from "react-query";

const fetchIngredientById = async (id: number) => {
  return await apiFetch<Ingredient>(`/catalog/ingredients/${id}`);
};

export const useFetchIngredientById = (id: number) => {
  return useQuery({
    queryKey: ["ingredient-by-id", id],
    queryFn: () => fetchIngredientById(id),
    keepPreviousData: true,
  });
};

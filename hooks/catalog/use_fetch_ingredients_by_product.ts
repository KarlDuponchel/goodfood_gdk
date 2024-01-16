import { apiFetch } from "@/utils/fetch";
import { ProductIngredients } from "@/utils/types";
import { useQuery } from "react-query";

const fetchIngredientsIdsByProductID = async (id: number) => {
  return await apiFetch<ProductIngredients>(
    `/catalog/product-ingredients?id_product=${id}`,
  );
};

export const useFetchIngredientsIdsByProductID = (id: number) => {
  return useQuery({
    queryKey: ["product-ingredients-by-id", id],
    queryFn: () => fetchIngredientsIdsByProductID(id),
  });
};

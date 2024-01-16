import { apiFetch } from "@/utils/fetch";
import { IngredientsSupplier } from "@/utils/types";
import { useQuery } from "react-query";

const fetchIngredientsSupplierBySupplierId = async (id: number) => {
  return await apiFetch<IngredientsSupplier>(
    `/restaurant/ingredient-suppliers?id_supplier=${id}`,
  );
};

export const useFetchIngredientsSupplierBySupplierId = (id: number) => {
  return useQuery({
    queryKey: ["ingredients-suppliers-by-supplier-id", id],
    queryFn: () => fetchIngredientsSupplierBySupplierId(id),
  });
};

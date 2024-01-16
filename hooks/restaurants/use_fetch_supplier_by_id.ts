import { apiFetch } from "@/utils/fetch";
import { Restaurant, Supplier } from "@/utils/types";
import { useQuery } from "react-query";

const fetchSupplierById = async (id: number) => {
  return await apiFetch<Supplier>(`/restaurant/suppliers/${id}`);
};

export const useFetchSupplierById = (id: number) => {
  return useQuery({
    queryKey: ["supplier-by-id", id],
    queryFn: () => fetchSupplierById(id),
  });
};

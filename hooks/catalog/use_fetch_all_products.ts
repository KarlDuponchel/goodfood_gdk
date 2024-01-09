import { apiFetch } from "@/utils/fetch";
import { Product } from "@/utils/types";
import { useInfiniteQuery } from "react-query";

const fetchAllProducts = async (page: number, limit: number) => {
    return await apiFetch<{
      page: number;
      count: number;
      data: Array<Product>;
      succeeded: boolean;
      errors: any;
      message: string;
    }>(`/catalog/products?page=${page}&limit=${limit}`);
};

export const useFetchAllProducts = (page: number = 1, limit: number = 10) => {
    return useInfiniteQuery({
      queryKey: ["all-products", page, limit],
      queryFn: ({ pageParam }) => {
        return fetchAllProducts(pageParam ?? page, limit);
      },
      getNextPageParam: (result) => {
        if (result.page < (result.count / limit)) {
          return result.page + 1;
        }
        return undefined;
      },
      keepPreviousData: true,
    });
  };
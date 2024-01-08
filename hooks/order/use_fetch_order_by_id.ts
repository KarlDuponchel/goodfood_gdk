import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchOrderById = async (id: number) => {
    return await apiFetch<{
        id: number,
        email: string,
        idRestaurant: number,
        country: string,
        city: string,
        address: string,
        additionnalAddress: string,
        zipCode: string,
        commandType: string,
        isValidate: boolean,
        createdAt: string,
        updatedAt: string,
        orderContents: {
            id: number,
            idOrder: number,
            idContent: number,
            contentName: string,
            quantity: number,
            price: number
        }[]
    }>(`/order/orders/${id}`);
};

export const useFetchOrderById = (id: number) => {
    return useQuery({
        queryKey: ["order-by-id", id],
        queryFn: () => fetchOrderById(id),
      });
  };
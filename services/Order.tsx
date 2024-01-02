import { Order } from "@/utils/types";
import { getHeaders } from "./User";

export async function createOrder(order: Order): Promise<any> {
    const input = `${process.env.api}/order/orders`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            order
        }),
        headers: getHeaders()
    });
  
    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }
}
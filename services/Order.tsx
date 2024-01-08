import { Order } from "@/utils/types";
import { getHeaders } from "./User";

//Inutile
export async function createOrder(order: Order): Promise<any> {
    const input = `${process.env.api}/order/orders`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            email: order.email,
            idRestaurant: order.idRestaurant,
            country: order.country,
            city: order.city,
            address: order.address,
            additionnalAddress: order.additionnalAddress,
            zipCode: order.zipCode,
            commandType: order.commandType,
            isValidate: order.isValidate,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderContents: order.orderContents
        }),
        headers: getHeaders()
    });
  
    if (response.status !== 201) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json()
}
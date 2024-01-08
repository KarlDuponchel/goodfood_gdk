import { Basket } from "@/utils/types";
import { getHeaders } from "./User";

export async function createBasket(basket: Basket): Promise<any> {
    const input = `${process.env.api}/order/baskets`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            userId: basket.userId,
            products: [{
                idContent: basket.products.idContent,
                contentName: basket.products.contentName,
                quantity: basket.products.quantity
            }]
        }),
        headers: getHeaders()
    });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json()
}

export async function updateBasket(idUser: string, basket: Basket): Promise<any> {
    const input = `${process.env.api}/order/orders`;
    const response = await fetch(input, {
        method: "PUT",
        body: JSON.stringify({
            userId: idUser,
            products: basket.products
        }),
        headers: getHeaders()
    });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json()
}
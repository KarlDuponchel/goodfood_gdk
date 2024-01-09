import { Basket } from "@/utils/types";
import { getHeaders } from "./User";

export async function createBasket(basket: Basket): Promise<any> {
    const input = `${process.env.api}/order/baskets`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            userId: basket.userId,
            products: basket.products
        }),
        headers: getHeaders()
    });

    if (response.status !== 201) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json()
}

export async function updateBasket(basket: Basket): Promise<any> {
    const input = `${process.env.api}/order/baskets/${basket.userId}`;
    const response = await fetch(input, {
        method: "PUT",
        body: JSON.stringify({
            userId: basket.userId,
            products: basket.products
        }),
        headers: getHeaders()
    });

    if (response.status !== 204) {
        const error = await response.json();
        throw new Error(error.message);
    }
}
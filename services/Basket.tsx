import { Basket, OrderBody } from "@/utils/types";
import { getHeaders } from "./User";

export async function createBasket(basket: any): Promise<any> {
  const input = `${process.env.api}/order/baskets`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      userId: basket.userId,
      products: basket.products,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 201) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function updateBasket(basket: Basket): Promise<any> {
  const input = `${process.env.api}/order/baskets/${basket.userId}`;
  const response = await fetch(input, {
    method: "PUT",
    body: JSON.stringify({
      userId: basket.userId,
      products: basket.products,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 204) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function validateBasket(
  userId: string,
  order: OrderBody,
): Promise<any> {
  const input = `${process.env.api}/order/baskets/validate/${userId}`;
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
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }),
    headers: getHeaders(),
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

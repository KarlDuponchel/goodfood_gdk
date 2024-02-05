import { Restaurant, Stock } from "@/utils/types";
import { getCookie } from "cookies-next";
import { getHeaders } from "./User";

export async function getAllRestaurants(limit?: number): Promise<Restaurant> {
  let limitString = "";
  if (limit == undefined) {
    limitString = "100";
  } else {
    limitString = String(limit);
  }

  const input = `${process.env.api}/restaurant/restaurants?limit=${limitString}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json.data;
}

export async function getRestaurantsByName(
  name: string,
): Promise<Restaurant[]> {
  const input = `${process.env.api}/restaurant/restaurants?name=${name}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json.data;
}

export async function addTransactionStock(body: Stock): Promise<any> {
  const input = `${process.env.api}/restaurant/stocks/transaction/add`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify([
      {
        id_restaurant: body.id_restaurant,
        id_ingredient: body.id_ingredient,
        quantity: body.quantity,
      },
    ]),
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function updateRestaurant(body: Restaurant): Promise<Restaurant> {
  const input = `${process.env.api}/restaurant/restaurants/${body.ID}`;
  const response = await fetch(input, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json.data;
}

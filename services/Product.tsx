import { PostProduct } from "@/utils/types";
import { getCookie } from "cookies-next";

export function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Content-type", "application/json");

  return headers;
}

export async function getIngredientById(id: number): Promise<any> {
  const input = `${process.env.api}/catalog/ingredients/${id}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const json = await response.json();
  return json;
}

export async function addProduct(product: PostProduct): Promise<any> {
  const input = `${process.env.api}/catalog/products`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      activated: product.activated,
      description: product.description,
      id_restaurant: product.id_restaurant,
      name: product.name,
      price: product.price,
    }),
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 201) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

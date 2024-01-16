import { PostProduct, Product } from "@/utils/types";
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

export async function addProduct(formData: FormData): Promise<any> {
  const input = `${process.env.api}/catalog/products`;
  const response = await fetch(input, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function updateProduct(
  idProduct: number,
  formData: FormData,
): Promise<Product> {
  const input = `${process.env.api}/catalog/products/${idProduct}`;
  const response = await fetch(input, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function deleteProduct(idProduct: number): Promise<any> {
  const input = `${process.env.api}/catalog/products/${idProduct}`;
  const response = await fetch(input, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function deleteProductIngredient(
  id_product: number,
  id_ingredient: number,
): Promise<any> {
  const input = `${process.env.api}/catalog/product-ingredients/${id_product}/ingredient/${id_ingredient}`;
  const response = await fetch(input, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function addProductIngredient(
  id_product: number,
  id_ingredient: number,
  required_quantity: number,
): Promise<any> {
  const input = `${process.env.api}/catalog/product-ingredients/${id_product}/ingredient/${id_ingredient}`;
  const response = await fetch(input, {
    method: "POST",
    body: JSON.stringify({
      required_quantity: required_quantity,
    }),
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}

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
export function getHeaders(): Headers {
    const headers = new Headers();
    headers.set("Content-type", "application/json");

    return headers;
}

export async function getProducts(): Promise<any> {
    const input = `http://gabriel-delahaye.com:5000/products`;
    const response = await fetch(input, { headers: getHeaders() });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

  const json = await response.json();
  return json;
}

export async function getProductById(id: number): Promise<any> {
    const input = `http://gabriel-delahaye.com:5000/products/${id}`;
    const response = await fetch(input, { headers: getHeaders() });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

  const json = await response.json();
  return json;
}
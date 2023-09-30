export function getHeaders(): Headers {
    const headers = new Headers();
    headers.set("Content-type", "application/json");

    return headers;
}

/**
 * Fonction qui récupère tous les produits
 * @param limit Nombre de produits à récupérer
 * @returns Les produits
 */
export async function getProducts(limit?: number): Promise<any> {
  let limitString = "";  
  if (limit == undefined) {limitString = "100"} else {limitString = String(limit)};

  const input = `${process.env.api}/catalog/products?limit=${limitString}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const json = await response.json();
  return json;
}

/**
 * Fonction qui récupère un produit par son ID
 * @param id ID du produit
 * @returns Le produit
 */
export async function getProductById(id: number): Promise<any> {
  const input = `${process.env.api}/catalog/products/${id}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const json = await response.json();
  return json;
}

/**
 * Fonction qui récupère les IDS ingrédients d'un produit
 * @param id ID du produit
 * @returns 
 */
export async function getIngredientsByProduct(id: number): Promise<any> {
  const input = `${process.env.api}/catalog/product-ingredients?id_product=${id}`;
  const response = await fetch(input, { headers: getHeaders() });

  if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.message);
  }

  const json = await response.json();
  return json;
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
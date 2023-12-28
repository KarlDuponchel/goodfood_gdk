import { Restaurant } from "@/utils/types";
import { getHeaders } from "./User";

export async function getAllRestaurants(limit?: number): Promise<Restaurant> {
    let limitString = "";  
    if (limit == undefined) {limitString = "100"} else {limitString = String(limit)};
  
    const input = `${process.env.api}/restaurant/restaurants?limit=${limitString}`;
    const response = await fetch(input, { headers: getHeaders() });
  
    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }
  
    const json = await response.json();
    return json.data;
}

export async function getRestaurantsByName(name: string): Promise<Restaurant[]> {
    const input = `${process.env.api}/restaurant/restaurants?name=${name}`;
    const response = await fetch(input, { headers: getHeaders() });
  
    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }
  
    const json = await response.json();
    return json.data;
}
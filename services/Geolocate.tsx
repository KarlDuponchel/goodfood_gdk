import { LngLatLike } from "mapbox-gl";

export async function autocompleteAddresses(address: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&format=json&apiKey=d500fac743b541c6af3f94326ab88921`)
    const data = await response.json()

    return data.results;
}

export async function getCoordinates(address: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=d500fac743b541c6af3f94326ab88921`)
    const data = await response.json()

    return data.features[0].geometry.coordinates;
}

export async function getItinary(start: LngLatLike, end: LngLatLike) { 
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?alternatives=false&annotations=state_of_charge%2Cduration&geometries=geojson&language=fr&overview=simplified&steps=true&access_token=pk.eyJ1Ijoia2FybGR1cG9uY2hlbCIsImEiOiJjbGlicWp2dnUwZzVsM3JtdWZ0OWFxYndhIn0.smBViieSG9CHQiWNrBunAw`)
    const data = await response.json()

    // console.log(data);
    return data.routes[0];
}
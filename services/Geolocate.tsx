export async function autocompleteAddresses(address: string) {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&format=json&apiKey=d500fac743b541c6af3f94326ab88921`)
    const data = await response.json()

    return data.results;
}
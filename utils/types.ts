export type User = {
    _id: number,
    firstname: string,
    lastname: string,
    email: string,
    has_notifications: boolean,
    created_at: Date,
    updated_at: Date,
    role: string,
    restaurant: number
}

export type Product = {
    id: number,
    name: string,
    price: number,
    id_restaurant: number,
    description: string,
    image: string
}

export type CardProduct = {
    id: number,
    name: string,
    price: number,
    id_restaurant: number,
    nbProduct: string,
    image: string
}

export type Restaurant = {
    id: number,
    name: string,
    address: string,
    additional_address: string,
    city: string,
    zip_code: string,
    country: string
}

export type Order = {
    email: string,
    idRestaurant: number,
    country: string,
    city: string,
    address: string,
    additionnalAddress: string,
    zipCode: string,
    commandType: string,
    isValidate: boolean,
    createdAt: string,
    updatedAt: string,
    orderContents: {
        idContent: number,
        quantity: number,
        price: number
    }[]
}
export type User = {
    _id: string,
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
    ID: number,
    name: string,
    price: number,
    id_restaurant: number,
    description: string,
    image: string
}

export type CardProduct = {
    idContent: number,
    contentName: string,
    quantity: number,
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
        contentName: string,
        quantity: number,
        price: number
    }[]
}

export type Basket = {
    userId: string,
    products: [{
        idContent: number,
        contentName: string,
        quantity: number
    }]
}
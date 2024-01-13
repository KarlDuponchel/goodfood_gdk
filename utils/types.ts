export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  has_notifications: boolean;
  created_at: Date;
  updated_at: Date;
  role: {
    _id: string;
    name: string;
    created_at: string;
    updated_at: string;
    __v: number;
  };
  restaurant: number;
};

export type Product = {
  id: number;
  ID: number;
  name: string;
  price: number;
  id_restaurant: number;
  description: string;
  image: string;
};

export type CardProduct = {
  idContent: number;
  contentName: string;
  quantity: number;
};

export type Restaurant = {
  ID: number;
  name: string;
  address: string;
  additional_address: string;
  city: string;
  zip_code: string;
  country: string;
};

export type Order = {
  id?: number;
  email: string;
  idRestaurant: number;
  country: string;
  city: string;
  address: string;
  additionnalAddress: string;
  zipCode: string;
  commandType: string;
  isValidate: boolean;
  createdAt: string;
  updatedAt: string;
  orderContents: {
    idContent: number;
    contentName: string;
    quantity: number;
    price: number;
  }[];
};

export type OrderBody = {
  email: string;
  idRestaurant: number;
  country: string;
  city: string;
  address: string;
  additionnalAddress: string;
  zipCode: string;
  commandType: string;
  createdAt: string;
  updatedAt: string;
};

export type Basket = {
  userId: string;
  products: Array<{
    idContent: number;
    contentName: string;
    quantity: number;
  }>;
};

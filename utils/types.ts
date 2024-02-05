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
  _restaurant: number;
};

export type Product = {
  activated: boolean;
  id: number;
  ID: number;
  name: string;
  price: number;
  id_restaurant: number;
  description: string;
  image: string;
};

export type Stock = {
  id_restaurant: number;
  id_ingredient: number;
  quantity: number;
};

export type Ingredient = {
  ID: number;
  is_allergen: boolean;
  is_allergen_description: string;
  name: string;
  CreatedAt: string;
  DeletedAt: string;
  UpdatedAt: string;
};

export type CardProduct = {
  idContent: number;
  contentName: string;
  quantity: number;
};

export type Restaurant = {
  ID?: number;
  name: string;
  address: string;
  additional_address: string;
  city: string;
  zip_code: string;
  country: string;
};

export type PostProduct = {
  activated: boolean;
  description: string;
  id_restaurant: number;
  image?: string;
  name: string;
  price: number;
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

export type Supplier = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  name: string;
  country: string;
  city: string;
  address: string;
  additional_address: string;
  zip_code: string;
};

export type IngredientsSupplier = {
  data: {
    id_ingredient: number;
    id_supplier: number;
    price: number;
  }[];
};

export type RestaurantSuppliers = {
  data: {
    id_restaurant: number;
    id_supplier: number;
  }[];
};

export type ProductIngredients = {
  data: {
    id_product: number;
    id_ingredient: number;
    required_quantity: number;
  }[];
};

export type Deliveries = {
  id: number;
  statusId: number;
  status: {
    id: number;
    myStatus: string;
  };
  id_Restaurant: number;
  id_Order: number;
  email: string;
  picturePath: string;
};

export type OrderContent = {
  idContent: number;
  contentName: string;
  quantity: number;
  price: number;
};

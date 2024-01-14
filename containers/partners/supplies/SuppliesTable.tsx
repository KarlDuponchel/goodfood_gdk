"use client";

import { FunctionComponent } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuppliesAddProduct } from "@/containers/partners/supplies/SuppliesAddProduct";
import { useFetchProductsByRestaurantID } from "@/hooks/catalog/use_fetch_products_by_restaurant_id";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { Product } from "@/utils/types";

type SuppliesTableProps = {
  idRestaurant: number;
};

export const SuppliesTable: FunctionComponent<SuppliesTableProps> = ({
  idRestaurant,
}) => {
  const products = useFetchProductsByRestaurantID(idRestaurant);
  const restaurant = useFetchRestaurantById(idRestaurant);

  if (!products.data) return <div>Aucun produit</div>;
  return (
    <div className="flex w-full justify-center pt-24">
      <div className="flex w-3/4 flex-col gap-8">
        <Table className="">
          <TableCaption>
            Les produits de votre restaurant{" "}
            {restaurant.data && restaurant.data.name}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Image</TableHead>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Nom du produit</TableHead>
              <TableHead>Ingrédients</TableHead>
              <TableHead className="">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.data.map((product: Product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.image}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span className="cursor-pointer hover:underline">
                      Gérer
                    </span>
                  </TableCell>
                  <TableCell className="">{product.price}€</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex w-full justify-end">
          <SuppliesAddProduct idRestaurant={idRestaurant} />
        </div>
      </div>
    </div>
  );
};

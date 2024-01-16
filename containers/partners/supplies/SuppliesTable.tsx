"use client";

import { FunctionComponent } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { SuppliesAddProduct } from "@/containers/partners/supplies/SuppliesAddProduct";
import { SuppliesDeleteProduct } from "@/containers/partners/supplies/SuppliesDeleteProduct";
import { SuppliesDialogIngredient } from "@/containers/partners/supplies/SuppliesDialogIngredient";
import { SuppliesUpdateProduct } from "@/containers/partners/supplies/SuppliesUpdateProduct";
import { useFetchProductsByRestaurantID } from "@/hooks/catalog/use_fetch_products_by_restaurant_id";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { updateProduct } from "@/services/Product";
import { Product } from "@/utils/types";
import Image from "next/image";

type SuppliesTableProps = {
  idRestaurant: number;
};

export const SuppliesTable: FunctionComponent<SuppliesTableProps> = ({
  idRestaurant,
}) => {
  const formData = new FormData();
  const { toast } = useToast();

  const products = useFetchProductsByRestaurantID(idRestaurant);
  const restaurant = useFetchRestaurantById(idRestaurant);

  const activateProduct = (idProduct: number, value: boolean) => {
    formData.append("activated", String(value));
    updateProduct(idProduct, formData).then(() => {
      toast({
        title: "Produit modifié",
        description: `Le produit a bien été ${value ? "activé" : "désactivé"}`,
      });
    });
  };

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
              <TableHead>Nom du produit</TableHead>
              <TableHead>Ingrédients</TableHead>
              <TableHead className="">Prix</TableHead>
              <TableHead>Est activé ?</TableHead>
              <TableHead>Gérer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.data.map((product: Product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      alt={product.name}
                      src={`/images/${product.image}`}
                      width={75}
                      height={75}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <SuppliesDialogIngredient product={product} />
                  </TableCell>
                  <TableCell className="">{product.price}€</TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={product.activated}
                      onCheckedChange={(e) => activateProduct(product.id, e)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <SuppliesUpdateProduct idProduct={product.id} />
                      <SuppliesDeleteProduct idProduct={product.id} />
                    </div>
                  </TableCell>
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

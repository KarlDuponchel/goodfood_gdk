import { FunctionComponent } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuppliesAddProductIngredients } from "@/containers/partners/supplies/SuppliesAddProductIngredients";
import { SuppliesDialogIngredientTableRow } from "@/containers/partners/supplies/SuppliesDialogIngredientTableRow";
import { useFetchIngredientsIdsByProductID } from "@/hooks/catalog/use_fetch_ingredients_by_product";
import { Product } from "@/utils/types";

type SuppliesDialogIngredientProps = {
  product: Product;
};

export const SuppliesDialogIngredient: FunctionComponent<
  SuppliesDialogIngredientProps
> = ({ product }) => {
  const ingredientsIds = useFetchIngredientsIdsByProductID(product.id);

  if (!ingredientsIds.data) return <div>Chargement...</div>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BaseButton variant="black" label="Voir" className="w-16" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ingrédients du produit {product.name}</DialogTitle>
          <DialogDescription>
            Consultez et modifiez ici les ingrédients d'un produit
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 pt-4">
          <Table className="">
            <TableCaption>
              Les ingrédients du produit {product.name}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nom</TableHead>
                <TableHead className="text-center">Est allergène ?</TableHead>
                <TableHead className="text-center">Quantité requise</TableHead>
                <TableHead className="text-center">Supprimer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientsIds.data.data.map((ingredient) => {
                return (
                  <SuppliesDialogIngredientTableRow
                    id_ingredient={ingredient.id_ingredient}
                    id_product={product.id}
                    required_quantity={ingredient.required_quantity}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="flex w-full justify-end pt-4">
          <SuppliesAddProductIngredients
            id_product={product.id}
            id_restaurant={product.id_restaurant}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

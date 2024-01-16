import { FunctionComponent, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StocksIngredientTableRow } from "@/containers/partners/stocks/StocksIngredientTableRow";
import { StocksSelectSupplier } from "@/containers/partners/stocks/StocksSelectSupplier";
import { SuppliesAddProductIngredientsTableRow } from "@/containers/partners/supplies/SuppliesAddProductIngredientsTableRow";
import { useFetchIngredientsSupplierBySupplierId } from "@/hooks/restaurants/use_fetch_ingredients_supplier_by_supplier_id";
import { useFetchRestaurantSuppliersByRestaurantId } from "@/hooks/restaurants/use_fetch_restaurant_suppliers_by_restaurant_id";
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

type SuppliesAddProductIngredientsProps = {
  id_product: number;
  id_restaurant: number;
};

export const SuppliesAddProductIngredients: FunctionComponent<
  SuppliesAddProductIngredientsProps
> = ({ id_product, id_restaurant }) => {
  const suppliersIds = useFetchRestaurantSuppliersByRestaurantId(id_restaurant);

  const [selectValue, setSelectValue] = useState<string>("");

  let ingredients = useFetchIngredientsSupplierBySupplierId(
    Number(selectValue),
  );

  if (!suppliersIds.data) return <div>loading...</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BaseButton label="Ajouter" className="w-24" variant="black" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un ingrédient à ce produit</DialogTitle>
          <DialogDescription>
            Choisissez dans les fournisseurs si dessous
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 pt-4">
          <Select onValueChange={(e) => setSelectValue(e)}>
            <SelectTrigger>
              <SelectValue
                placeholder={"Choisissez un fournisseur"}
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {suppliersIds.data.data.map((supplier) => {
                return (
                  <StocksSelectSupplier
                    key={supplier.id_supplier}
                    idSupplier={supplier.id_supplier}
                  />
                );
              })}
            </SelectContent>
          </Select>
          <div className="">
            {ingredients.data && ingredients.data.data.length > 0 ? (
              <Table className="">
                <TableCaption>Liste des ingrédients disponibles</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de l'ingrédient</TableHead>
                    <TableHead>Est allergène ?</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Associer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.data.data.map((ingredient) => {
                    return (
                      <SuppliesAddProductIngredientsTableRow
                        id_ingredient={ingredient.id_ingredient}
                        price={ingredient.price}
                        id_supplier={ingredient.id_supplier}
                        id_restaurant={id_restaurant}
                        id_product={id_product}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              "Aucun ingrédient disponible"
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

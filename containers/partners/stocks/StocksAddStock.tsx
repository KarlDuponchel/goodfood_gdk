import { FunctionComponent, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useFetchIngredientsSupplierBySupplierId } from "@/hooks/restaurants/use_fetch_ingredients_supplier_by_supplier_id";
import { useFetchRestaurantSuppliersByRestaurantId } from "@/hooks/restaurants/use_fetch_restaurant_suppliers_by_restaurant_id";

type StocksAddStockProps = {
  id_restaurant: number;
};

export const StocksAddStock: FunctionComponent<StocksAddStockProps> = ({
  id_restaurant,
}) => {
  const suppliersIds = useFetchRestaurantSuppliersByRestaurantId(id_restaurant);

  const [selectValue, setSelectValue] = useState<string>("");

  let ingredients = useFetchIngredientsSupplierBySupplierId(
    Number(selectValue),
  );

  if (!suppliersIds.data) return <div>loading...</div>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BaseButton variant="black" label="Ajouter du stock" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un ingrédient</DialogTitle>
          <DialogDescription>
            Choisissez un de vos fournisseurs afin de commander un nouvel
            ingrédient
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
                <TableCaption>
                  Liste des ingrédients du fournisseur
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de l'ingrédient</TableHead>
                    <TableHead>Est allergène ?</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Commander</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.data.data.map((ingredient) => {
                    return (
                      <StocksIngredientTableRow
                        id_ingredient={ingredient.id_ingredient}
                        price={ingredient.price}
                        id_supplier={ingredient.id_supplier}
                        key={ingredient.id_ingredient}
                        id_restaurant={id_restaurant}
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

import { FunctionComponent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { StocksDialogOrderIngredient } from "@/containers/partners/stocks/StocksDialogOrderIngredient";
import { useFetchIngredientById } from "@/hooks/catalog/use_fetch_ingredient_by_id";
import { Plus } from "lucide-react";

type StocksIngredientTableRowProps = {
  id_ingredient: number;
  price: number;
  id_supplier: number;
  id_restaurant: number;
};

export const StocksIngredientTableRow: FunctionComponent<
  StocksIngredientTableRowProps
> = ({ id_ingredient, price, id_supplier, id_restaurant }) => {
  const ingredient = useFetchIngredientById(id_ingredient);

  if (!ingredient.data) return <div>loading...</div>;
  return (
    <TableRow>
      <TableCell>{ingredient.data.name}</TableCell>
      <TableCell>{ingredient.data?.is_allergen ? "Oui" : "Non"}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell className="flex justify-center">
        <StocksDialogOrderIngredient
          id_ingredient={ingredient.data.ID}
          price={price}
          name_ingredient={ingredient.data.name}
          id_restaurant={id_restaurant}
        />
      </TableCell>
    </TableRow>
  );
};

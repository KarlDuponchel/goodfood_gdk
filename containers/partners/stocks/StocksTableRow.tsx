import { FunctionComponent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useFetchIngredientById } from "@/hooks/catalog/use_fetch_ingredient_by_id";
import { convertDateToFr } from "@/utils/function";
import { Plus, ShoppingBag } from "lucide-react";

type StocksTableRowProps = {
  idIngredient: number;
  quantity: number;
};

export const StocksTableTow: FunctionComponent<StocksTableRowProps> = ({
  idIngredient,
  quantity,
}) => {
  const ingredient = useFetchIngredientById(idIngredient);

  if (!ingredient.data) return <div>loading...</div>;
  return (
    <TableRow>
      <TableCell className="w-[100px]">{idIngredient}</TableCell>
      <TableCell>{ingredient.data?.name}</TableCell>
      <TableCell>{ingredient.data?.is_allergen ? "Oui" : "Non"}</TableCell>
      <TableCell>{convertDateToFr(ingredient.data?.CreatedAt)}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>
        <Plus className="h-5 w-5 cursor-pointer hover:text-zinc-500" />
      </TableCell>
    </TableRow>
  );
};

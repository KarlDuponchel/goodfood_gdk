import { FunctionComponent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { SuppliesDeleteProductIngredient } from "@/containers/partners/supplies/SuppliesDeleteProductIngredient";
import { useFetchIngredientById } from "@/hooks/catalog/use_fetch_ingredient_by_id";

type SuppliesDialogIngredientTableRowProps = {
  id_ingredient: number;
  id_product: number;
  required_quantity: number;
};

export const SuppliesDialogIngredientTableRow: FunctionComponent<
  SuppliesDialogIngredientTableRowProps
> = ({ id_ingredient, id_product, required_quantity }) => {
  const ingredient = useFetchIngredientById(id_ingredient);

  if (!ingredient.data) return <div>loading...</div>;
  return (
    <TableRow>
      <TableCell className="text-center">{ingredient.data.name}</TableCell>
      <TableCell className="text-center">
        {ingredient.data?.is_allergen ? "Oui" : "Non"}
      </TableCell>
      <TableCell className="text-center">{required_quantity}</TableCell>
      <TableCell className="text-center">
        <SuppliesDeleteProductIngredient
          id_ingredient={id_ingredient}
          id_product={id_product}
        />
      </TableCell>
    </TableRow>
  );
};

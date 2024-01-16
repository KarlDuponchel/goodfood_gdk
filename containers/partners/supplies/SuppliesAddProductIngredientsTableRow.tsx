import { FunctionComponent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { SuppliesAssociateProductIngredients } from "@/containers/partners/supplies/SuppliesAssociateProductIngredients";
import { useFetchIngredientById } from "@/hooks/catalog/use_fetch_ingredient_by_id";

type SuppliesAddProductIngredientsTableRowProps = {
  id_ingredient: number;
  price: number;
  id_supplier: number;
  id_restaurant: number;
  id_product: number;
};

export const SuppliesAddProductIngredientsTableRow: FunctionComponent<
  SuppliesAddProductIngredientsTableRowProps
> = ({ id_ingredient, price, id_restaurant, id_product }) => {
  const ingredient = useFetchIngredientById(id_ingredient);

  if (!ingredient.data) return <div>loading...</div>;
  return (
    <TableRow>
      <TableCell>{ingredient.data.name}</TableCell>
      <TableCell>{ingredient.data?.is_allergen ? "Oui" : "Non"}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell className="flex justify-center">
        <SuppliesAssociateProductIngredients
          id_ingredient={ingredient.data.ID}
          name_ingredient={ingredient.data.name}
          id_restaurant={id_restaurant}
          id_product={id_product}
        />
      </TableCell>
    </TableRow>
  );
};

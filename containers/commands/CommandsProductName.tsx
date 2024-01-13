import { FunctionComponent } from "react";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";

type CommandsProductNameProps = {
  id: number;
  quantity: number;
};

export const CommandsProductsName: FunctionComponent<
  CommandsProductNameProps
> = ({ id, quantity }) => {
  const product = useFetchProductByID(id);
  return (
    <li>
      {product.data?.name} {quantity > 1 ? `x${quantity}` : ""} (
      {product.data?.price}€)
    </li>
  );
};

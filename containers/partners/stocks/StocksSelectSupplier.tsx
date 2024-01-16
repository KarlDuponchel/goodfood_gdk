import { FunctionComponent } from "react";
import { SelectItem } from "@/components/ui/select";
import { useFetchSupplierById } from "@/hooks/restaurants/use_fetch_supplier_by_id";

type StocksSelectSupplierProps = {
  idSupplier: number;
};

export const StocksSelectSupplier: FunctionComponent<
  StocksSelectSupplierProps
> = ({ idSupplier }) => {
  const supplier = useFetchSupplierById(idSupplier);

  if (!supplier.data) return <div>loading...</div>;
  return (
    <SelectItem value={String(supplier.data.ID)}>
      {supplier.data.name}
    </SelectItem>
  );
};

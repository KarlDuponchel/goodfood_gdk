import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CommandsTableRow } from "@/containers/partners/commands-management/CommandsTableRow";
import { useFetchDeliveriesByRestaurantID } from "@/hooks/delivery/use_fetch_delivery_by_restaurant_id";

export type CommandsTableProps = {
  id_restaurant: number;
};

export const CommandsTable = ({ id_restaurant }: CommandsTableProps) => {
  const deliveries = useFetchDeliveriesByRestaurantID(id_restaurant);

  console.log(deliveries.data);
  return (
    <div className="flex w-full justify-center pt-24">
      <div className="flex w-3/4 flex-col gap-8">
        <Table className="">
          <TableCaption>Les stocks de votre restaurant</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-center">
                Commande n°
              </TableHead>
              <TableHead className="text-center">Client</TableHead>
              <TableHead className="text-center">Créé le</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.data?.map((delivery) => {
              return (
                <CommandsTableRow
                  key={delivery.id}
                  idOrder={delivery.id_Order}
                  status={delivery.status}
                  email={delivery.email}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

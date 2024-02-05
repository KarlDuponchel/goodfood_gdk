import { FunctionComponent } from "react";
import { StatusType } from "@/components/admin/StatusType";
import { TableCell, TableRow } from "@/components/ui/table";
import { useFetchOrderById } from "@/hooks/order/use_fetch_order_by_id";
import { convertDateToFr } from "@/utils/function";
import { Check } from "lucide-react";

type CommandsTableRowProps = {
  idOrder: number;
  email: string;
  status: { id: number; myStatus: string };
};

export const CommandsTableRow: FunctionComponent<CommandsTableRowProps> = ({
  idOrder,
  email,
  status,
}) => {
  const command = useFetchOrderById(idOrder);
  console.log(command.data);
  if (!command.data) return <div>Loading...</div>;
  return (
    <TableRow>
      <TableCell className="w-[150px] text-center">
        <a
          className="cursor-pointer"
          href={`/partners/commands-management/${idOrder}`}
        >
          {idOrder}
        </a>
      </TableCell>
      <TableCell className="text-center">{email}</TableCell>
      <TableCell className="text-center">
        {convertDateToFr(command.data.createdAt)}
      </TableCell>
      <TableCell className="text-center">
        <StatusType myStatus={status.myStatus} />
      </TableCell>
    </TableRow>
  );
};

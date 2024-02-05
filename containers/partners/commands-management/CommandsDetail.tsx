"use client";

import { ContentInfo } from "@/components/admin/ContentInfo";
import { ContentTotalPrice } from "@/components/admin/ContentTotalPrice";
import { StatusType } from "@/components/admin/StatusType";
import { BaseButton } from "@/components/button/Button";
import { useFetchOrderById } from "@/hooks/order/use_fetch_order_by_id";
import { convertDateToFr } from "@/utils/function";
import { OrderContent } from "@/utils/types";

type CommandsDetailProps = {
  idOrder: number;
};

export const CommandsDetail = ({ idOrder }: CommandsDetailProps) => {
  const command = useFetchOrderById(idOrder);
  console.log(command.data);
  if (!command.data) return <div>Loading...</div>;
  return (
    <div className="flex w-full justify-center pt-24">
      <div className="flex w-3/4">
        <div className="flex w-1/2 flex-col p-2">
          <div className="flex w-full justify-center border-b border-zinc-300 text-lg font-extrabold">
            Info client
          </div>
          <div className="flex w-full flex-col gap-3 pt-8">
            <span className="font-bold">
              Email :{" "}
              <span className="text-gray-700">{`${command.data.email}`}</span>
            </span>
            <span className="font-bold">
              Adresse de livraison :{" "}
              <span className="text-gray-700">{`${command.data.address}, ${command.data.zipCode} ${command.data.city}`}</span>
            </span>
          </div>
        </div>
        <div className="w-1/2 flex-col border-l border-zinc-300 p-2">
          <div className="flex w-full justify-center border-b border-zinc-300 text-lg font-extrabold">
            Info commande
          </div>
          <div className="flex w-full flex-col gap-3 pt-8">
            <span className="font-bold">
              Créée le :{" "}
              <span className="text-gray-700">{`${convertDateToFr(
                command.data.createdAt,
              )}`}</span>
            </span>
            <span className="flex gap-2 font-bold">
              Contenu de la commande :{" "}
              <ul>
                {command.data.orderContents.map((content: OrderContent) => {
                  return <ContentInfo orderContent={content} />;
                })}
              </ul>
            </span>
            <span className="flex gap-2 font-bold">
              Prix total :{" "}
              <span>
                {" "}
                <ContentTotalPrice
                  orderContents={command.data.orderContents}
                />{" "}
              </span>
            </span>
            <span className="flex gap-2 font-bold">
              Status :{" "}
              <span>
                <StatusType myStatus="En cours" />
              </span>
            </span>
            <div className="flex w-full justify-end pt-6">
              <BaseButton variant="black" label="Terminer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

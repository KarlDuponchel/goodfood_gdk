"use client";

import { FunctionComponent } from "react";
import { BaseButton } from "@/components/button/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StocksAddStock } from "@/containers/partners/stocks/StocksAddStock";
import { StocksTableTow } from "@/containers/partners/stocks/StocksTableRow";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { useFetchStocksByRestaurantById } from "@/hooks/restaurants/use_fetch_stocks_by_restaurant_id";
import { Stock } from "@/utils/types";

type StocksTableProps = {
  idRestaurant: number;
};

export const StocksTable: FunctionComponent<StocksTableProps> = ({
  idRestaurant,
}) => {
  const restaurant = useFetchRestaurantById(idRestaurant);
  const stocks = useFetchStocksByRestaurantById(idRestaurant);

  if (!stocks.data) return <div>loading...</div>;

  return (
    <div className="flex w-full justify-center pt-24">
      <div className="flex w-3/4 flex-col gap-8">
        <Table className="">
          <TableCaption>
            Les stocks de votre restaurant{" "}
            {restaurant.data && restaurant.data.name}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nom de l'ingrédient</TableHead>
              <TableHead>Est allergène ?</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Gérer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.data.data.map((stock: Stock) => {
              return (
                <StocksTableTow
                  key={stock.id_ingredient}
                  quantity={stock.quantity}
                  idIngredient={stock.id_ingredient}
                />
              );
            })}
          </TableBody>
        </Table>
        <div className="flex w-full justify-end">
          <StocksAddStock id_restaurant={idRestaurant} />
        </div>
      </div>
    </div>
  );
};

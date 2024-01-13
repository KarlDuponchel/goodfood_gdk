"use client";

import { FunctionComponent } from "react";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import Image from "next/image";

type CommandProductProps = {
  id: number;
  nameRestaurant: string;
  quantity: number;
};

export const CommandProduct: FunctionComponent<CommandProductProps> = ({
  id,
  nameRestaurant,
  quantity,
}) => {
  const product = useFetchProductByID(id);

  if (!product.data) return <div>Loading...</div>;

  return (
    <div className="flex w-4/6 border-b border-black max-2xl:w-full">
      <div className="mb-2 w-1/3">
        <Image
          src={"/images/burger2.jpg"}
          alt={product.data.name}
          className="h-full w-full object-center"
          width={96}
          height={96}
        />
      </div>
      <div className="flex w-2/3 flex-col pl-2">
        <span className="text-base font-black">{nameRestaurant}</span>
        <ul className="list-disc pl-8">
          <li>
            {product.data.name} {quantity > 1 ? ` x${quantity}` : ""}
          </li>
        </ul>
        <span className="flex h-full w-full items-end justify-end text-lg font-black text-primary">
          {product.data.price}€
        </span>
      </div>
    </div>
  );
};

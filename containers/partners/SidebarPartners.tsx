"use client";

import { useEffect, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { useAuth } from "@/hooks/useAuth";
import {
  Archive,
  BarChart4,
  PackagePlus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const SidebarPartners = () => {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const [styleCommands, setStyleCommands] = useState("");
  const [styleStatistics, setStyleStatistics] = useState("");
  const [styleSupplies, setStyleSupplies] = useState("");
  const [styleStocks, setStyleStocks] = useState("");

  useEffect(() => {
    switch (pathName) {
      case "/partners/commands-management":
        setStyleCommands("border-black text-black");
        break;
      case "/partners/statistics":
        setStyleStatistics("border-black text-black");
        break;
      case "/partners/supplies":
        setStyleSupplies("border-black text-black");
        break;
      case "/partners/stocks":
        setStyleStocks("border-black text-black");
        break;
      default:
        setStyleCommands("border-zinc-300");
        setStyleStatistics("border-zinc-300");
        setStyleSupplies("border-zinc-300");
        setStyleStocks("border-zinc-300");
        break;
    }
  }, [pathName]);

  const restaurant = useFetchRestaurantById(
    user && user._restaurant ? user._restaurant : -1,
  );

  if (role < 2 || !user) {
    router.push("/");
  }

  if (!restaurant.data) return <div>loading...</div>;

  return (
    <>
      <div className="col-span-1 col-start-1 row-span-full flex flex-col items-center border-r border-zinc-200 py-8 max-lg:hidden">
        <div className="h-1/5">
          <Image
            alt="logo goodfood"
            src={"/images/logoblackv2.png"}
            width={200}
            height={200}
          />
        </div>
        <div className="flex h-3/5 flex-col gap-2">
          <a
            className="cursor-pointer text-xl font-extrabold hover:text-zinc-500 max-xl:text-lg"
            href="/partners"
          >
            {restaurant.data.name}
          </a>
          <ul className="flex flex-col text-zinc-500 max-xl:text-sm">
            <li
              className={`cursor-pointer border-l ${styleCommands} pl-4 hover:border-black hover:text-black`}
            >
              <a href="/partners/commands-management">Gestion commandes</a>
            </li>
            <li
              className={`cursor-pointer border-l ${styleSupplies} pl-4 hover:border-black hover:text-black`}
            >
              <a href="/partners/supplies">Fournitures</a>
            </li>
            <li
              className={`cursor-pointer border-l ${styleStocks} pl-4 hover:border-black hover:text-black`}
            >
              <a href="/partners/stocks">Stocks</a>
            </li>
            <li
              className={`cursor-pointer border-l ${styleStatistics} pl-4 hover:border-black hover:text-black`}
            >
              <a href="/partners/statistics">Statistiques</a>
            </li>
          </ul>
        </div>
        <div className="flex h-1/5 items-end">
          <BaseButton variant="black" label="Déconnexion" onClick={logout} />
        </div>
      </div>
      <div className="h-hit col-span-5 col-start-2 row-span-1 flex items-center justify-between border-b border-zinc-200 px-4 max-lg:col-span-full">
        <span className="text-2xl font-extrabold">
          {role == 2 ? "Gestion du restaurant" : "Gestion administrateur"}
        </span>
        <div className="hidden gap-8 max-lg:flex">
          <a href="/partners/commands-management">
            <Truck className="h-6 w-6" />
          </a>
          <a href="/partners/supplies">
            <PackagePlus className="h-6 w-6" />
          </a>
          <a href="/partners/stocks">
            <Archive className="h-6 w-6" />
          </a>
          <a href="/partners/statistics">
            <BarChart4 className="h-6 w-6" />
          </a>
        </div>
      </div>
    </>
  );
};

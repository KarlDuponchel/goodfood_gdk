"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { BaseInput } from "@/components/input/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { useAuth } from "@/hooks/useAuth";
import { autocompleteAddresses } from "@/services/Geolocate";
import { getRestaurantsByName } from "@/services/Restaurants";
import { Restaurant } from "@/utils/types";
import {
  ArrowPathIcon,
  Bars3Icon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type HeaderProps = {
  toogle?: boolean;
};

export const Header: FunctionComponent<HeaderProps> = ({ toogle }) => {
  const { user, status, role, logout } = useAuth();
  const basket = useFetchBasketByUserID(user ? user._id : "");

  //Router next.js
  const router = useRouter();

  //Ref inputs
  const refAddress = useRef<HTMLInputElement>(null);
  const refRestaurant = useRef<HTMLInputElement>(null);

  //Constantes
  const [potentialAddresses, setPotentialAddresses] = useState<any[]>([]);
  const [nameAddress, setNameAddress] = useState<string>("");
  const [toogleAddress, setToogleAddress] = useState<boolean>(false);
  const [toogleAccount, setToogleAccount] = useState<boolean>(false);
  const [cardProducts, setCardProducts] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState<string>("w-full");
  const [showAddress, setShowAddress] = useState<string>("hidden");
  const [restaurantsSearched, setRestaurantsSearched] = useState<Restaurant[]>(
    [],
  );

  useEffect(() => {
    if (localStorage.getItem("product")) {
      setCardProducts(JSON.parse(localStorage.getItem("product") as string));
    }
  }, [toogle]);

  useEffect(() => {
    if (localStorage.getItem("address")) {
      let address = localStorage.getItem("address") as string;
      if (address.length > 55) {
        setNameAddress(`${address.substring(0, 55)}...`);
      } else {
        setNameAddress(localStorage.getItem("address") as string);
      }
    } else {
      setNameAddress("Votre adresse");
    }
  }, [toogleAddress]);

  //Fonctions addresses
  const handleAddresses = async (address: string) => {
    if (address.length > 2) {
      await autocompleteAddresses(address).then((result) =>
        setPotentialAddresses(result),
      );
    } else {
      setPotentialAddresses([]);
    }
  };
  const handleChangeAddress = () => {
    if (!refAddress.current) return;
    handleAddresses(refAddress.current.value);
  };
  const setAddress = (address: string) => {
    if (!refAddress.current) return;
    refAddress.current.value = address;
    setPotentialAddresses([]);

    setToogleAddress(!toogleAddress);
    localStorage.setItem("address", address);
  };
  const removeAddress = () => {
    if (!refAddress.current) return;
    refAddress.current.value = "";
    setPotentialAddresses([]);

    localStorage.removeItem("address");
    setToogleAddress(!toogleAddress);
  };

  const removeRestaurants = () => {
    if (!refRestaurant.current) return;
    refRestaurant.current.value = "";

    setRestaurantsSearched([]);
  };

  const handleShowSearch = () => {
    if (showAddress == "w-full") {
      setShowAddress("hidden");
      setShowSearch("w-full");
    } else {
      setShowAddress("w-full");
      setShowSearch("hidden");
    }
  };

  const handleSearchRestaurants = () => {
    if (!refRestaurant.current) return;
    const keySearch = refRestaurant.current.value;

    if (keySearch.length > 2) {
      getRestaurantsByName(keySearch).then((restaurants) => {
        setRestaurantsSearched(restaurants);
      });
    } else {
      setRestaurantsSearched([]);
    }
  };

  if (role > 1) {
    router.push("/partners");
  }

  return (
    <div className="sticky top-0 z-10 flex h-20 w-full items-center justify-between bg-inherit px-8 py-1 shadow-md">
      <div className="flex h-full w-1/4 items-center justify-start max-md:hidden">
        <a href="/">
          <Image
            alt="Logo du site"
            src={"/images/logoBlackPng.png"}
            width={140}
            height={140}
          />
        </a>
      </div>
      <div className="hidden h-full w-1/6 items-center justify-start max-md:flex">
        <a href="/">
          <Image
            alt="Logo du site"
            src={"/images/logoGF.png"}
            width={80}
            height={80}
          />
        </a>
      </div>
      <div className="flex h-full w-2/4 items-center justify-center gap-4 max-md:w-4/6">
        <div className={`relative w-1/2 max-lg:${showAddress} flex gap-2`}>
          <div className="flex w-full">
            <BaseInput
              ref={refAddress}
              className="w-96"
              placeholder={nameAddress}
              list="addresses"
              onChange={handleChangeAddress}
            />
            <span className="grid h-10 w-10 place-items-center rounded-r-lg border-y border-r border-black bg-zinc-200">
              <XMarkIcon
                className="w-7 cursor-pointer rounded-full p-[3px] transition duration-150 ease-in-out hover:bg-zinc-300"
                onClick={removeAddress}
              />
            </span>
          </div>
          <ArrowPathIcon
            className="hidden w-6 cursor-pointer max-lg:block"
            onClick={handleShowSearch}
          />
          {potentialAddresses && potentialAddresses.length > 0 ? (
            <div className="absolute top-10 w-full rounded-b-lg bg-zinc-200 p-1">
              {potentialAddresses.map((address, key) => {
                const nameAddress = `${address.address_line1}, ${address.address_line2}`;
                return (
                  <div
                    className={`flex flex-col justify-between transition duration-100 hover:bg-zinc-300 ${
                      key !== potentialAddresses.length - 1
                        ? `border-b border-zinc-300`
                        : ""
                    } cursor-pointer text-sm`}
                    key={key}
                  >
                    <span
                      onClick={() => setAddress(nameAddress)}
                    >{`${nameAddress}`}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={`relative w-1/2 max-lg:${showSearch} flex gap-2`}>
          <div className="flex w-full">
            <BaseInput
              ref={refRestaurant}
              className="w-96"
              onChange={handleSearchRestaurants}
              placeholder="Rechercher parmis nos restaurants"
            />
            <span className="grid h-10 w-10 place-items-center rounded-r-lg border-y border-r border-black bg-zinc-200">
              <XMarkIcon
                className="w-7 cursor-pointer rounded-full p-[3px] transition duration-150 ease-in-out hover:bg-zinc-300"
                onClick={removeRestaurants}
              />
            </span>
          </div>
          <ArrowPathIcon
            className="hidden w-6 cursor-pointer max-lg:block"
            onClick={handleShowSearch}
          />
          {restaurantsSearched && restaurantsSearched.length > 0 ? (
            <div className="absolute top-10 w-full rounded-b-lg bg-zinc-200 p-1">
              {restaurantsSearched.map((restaurant, key) => {
                return (
                  <div
                    className={`flex flex-col justify-between transition duration-100 hover:bg-zinc-300 ${
                      key !== restaurantsSearched.length - 1
                        ? `border-b border-zinc-300`
                        : ""
                    } cursor-pointer text-sm`}
                    key={key}
                  >
                    <span>{restaurant.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex h-full w-1/4 transform items-center justify-end transition-all max-lg:hidden">
        {status !== 1 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BaseButton
                className="focus:outline-none"
                label="Mon compte"
                variant="zinc"
              ></BaseButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 w-56 border border-black bg-zinc-200">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex items-center focus:border-black"
                  onClick={() => router.push("/connect")}
                >
                  <User className="mr-2 h-5 w-5"></User>
                  <span>Connexion</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/register")}
                >
                  <UserPlusIcon className="mr-1 h-6 w-6"></UserPlusIcon>
                  <span>Inscription</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/basket")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                  <span>
                    Panier{" "}
                    {cardProducts.length > 1 && ` - ${cardProducts.length}`}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : !toogleAccount ? (
          <div className="flex gap-10">
            <a href="/commands">
              <ShoppingBag className="w-6 text-black" />
            </a>
            <a className="relative" href="/basket">
              <ShoppingCart className="w-6 text-black" />
              {basket.data && basket.data?.products.length > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 animate-bounce items-center justify-center rounded-full bg-primary text-sm font-bold">
                  {basket.data?.products.length}
                </span>
              ) : (
                ""
              )}
            </a>
            <span
              className="cursor-pointer"
              onClick={() => setToogleAccount(!toogleAccount)}
            >
              <User className="w-6 text-black" />
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-6 max-[1090px]:gap-2">
            <a className="cursor-pointer hover:underline" href="/account">
              Mon compte
            </a>
            <button className="hover:underline" onClick={logout}>
              Déconnexion
            </button>
            <span>
              <XMarkIcon
                className="w-7 cursor-pointer rounded-full p-1 text-black hover:bg-zinc-200"
                onClick={() => setToogleAccount(!toogleAccount)}
              />
            </span>
          </div>
        )}
      </div>
      <div className="relative hidden w-1/4 items-center justify-end max-lg:flex max-lg:w-1/12">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Bars3Icon className="w-7 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 mt-1 w-56 border border-black bg-zinc-200">
            {status !== 1 ? (
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex items-center focus:border-black"
                  onClick={() => router.push("/connect")}
                >
                  <User className="mr-2 h-5 w-5"></User>
                  <span>Connexion</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/register")}
                >
                  <UserPlusIcon className="mr-1 h-6 w-6"></UserPlusIcon>
                  <span>Inscription</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/basket")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                  <span>
                    Panier{" "}
                    {cardProducts.length > 0 && ` - ${cardProducts.length}`}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex items-center focus:border-black"
                  onClick={() => router.push("/basket")}
                >
                  <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                  <span>
                    Panier{" "}
                    {basket.data &&
                      basket.data.products.length > 0 &&
                      ` - ${basket.data.products.length}`}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/commands")}
                >
                  <ShoppingBag className="mr-2 h-5 w-5"></ShoppingBag>
                  <span>Mes commandes</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => router.push("/account")}
                >
                  <User className="mr-2 h-5 w-5"></User>
                  <span>Mon compte</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-5 w-5"></LogOut>
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

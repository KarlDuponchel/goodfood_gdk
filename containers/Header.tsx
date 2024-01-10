'use client';

import { FunctionComponent, useEffect, useRef, useState } from "react";
import logo from "../images/logoBlackPng.png";
import smallLogo from "../images/logoGF.png";
import { BaseInput } from "@/components/input/Input";
import { InboxIcon, ShoppingCartIcon, UserCircleIcon, XMarkIcon, Bars3Icon, ArrowRightOnRectangleIcon, ArrowPathIcon, UserPlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { autocompleteAddresses } from "@/services/Geolocate";
import { BaseButton } from "@/components/button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { disconnect } from "@/services/User";
import { useToast } from "@/components/ui/use-toast";
import { getRestaurantsByName } from "@/services/Restaurants";
import { Restaurant } from "@/utils/types";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { CarIcon, LogOut, ShoppingBag, ShoppingCart, User } from "lucide-react";

export type HeaderProps = {
    toogle?: boolean;
}

export const Header: FunctionComponent<HeaderProps> = ({toogle}) => {

    const { user, status, logout } = useAuth();
    const { toast } = useToast();
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
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<string>("w-full");
    const [showAddress, setShowAddress] = useState<string>("hidden");
    const [restaurantsSearched, setRestaurantsSearched] = useState<Restaurant[]>([]);

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
            await autocompleteAddresses(address).then((result) => setPotentialAddresses(result));
        } else {
            setPotentialAddresses([]);
        }
    }
    const handleChangeAddress = () => {
        if (!refAddress.current) return;
        handleAddresses(refAddress.current.value);
    }
    const setAddress = (address: string) => {
        if (!refAddress.current) return;
        refAddress.current.value = address;
        setPotentialAddresses([]);

        setToogleAddress(!toogleAddress);
        localStorage.setItem("address", address);
    }
    const removeAddress = () => {
        if (!refAddress.current) return;
        refAddress.current.value = "";
        setPotentialAddresses([]);

        localStorage.removeItem("address");
        setToogleAddress(!toogleAddress);
    }

    const removeRestaurants = () => {
        if (!refRestaurant.current) return;
        refRestaurant.current.value = "";

        setRestaurantsSearched([])
    }

    const handleShowSearch = () => {
        if (showAddress == "w-full") {
            setShowAddress("hidden");
            setShowSearch("w-full");
        } else {
            setShowAddress("w-full");
            setShowSearch("hidden");
        }
    }

    const handleSearchRestaurants = () => {
        if (!refRestaurant.current) return;
        const keySearch = refRestaurant.current.value;

        if (keySearch.length > 2) {
            getRestaurantsByName(keySearch).then((restaurants) => {
                setRestaurantsSearched(restaurants);
            })
        } else {
            setRestaurantsSearched([]);
        }
    }

    return (
        <div className="sticky flex justify-between items-center w-full top-0 z-10 bg-inherit px-8 py-1 h-20 shadow-md">
            <div className="w-1/4 h-full flex justify-start items-center max-md:hidden">
                <a href="/"><Image alt="Logo du site" src={"/images/logoBlackPng.png"} width={140} height={140} /></a>
            </div>
            <div className="w-1/6 h-full hidden justify-start items-center max-md:flex">
                <a href="/"><Image alt="Logo du site" src={"/images/logoGF.png"} width={80} height={80} /></a>
            </div>
            <div className="w-2/4 flex justify-center items-center gap-4 h-full max-md:w-4/6">
                <div className={`w-1/2 relative max-lg:${showAddress} flex gap-2`}>
                    <div className="flex w-full">
                        <BaseInput ref={refAddress} className="w-96" placeholder={nameAddress} list="addresses" onChange={handleChangeAddress} />
                        <span className="w-10 h-10 border-r border-y rounded-r-lg border-black bg-zinc-200 grid place-items-center">
                            <XMarkIcon className="p-[3px] cursor-pointer w-7 hover:bg-zinc-300 rounded-full transition ease-in-out duration-150" onClick={removeAddress} />
                        </span>
                    </div>
                    <ArrowPathIcon className="w-6 hidden max-lg:block cursor-pointer" onClick={handleShowSearch}/>
                    {potentialAddresses && potentialAddresses.length > 0 ? (
                        <div className="absolute bg-zinc-200 top-10 w-full p-1 rounded-b-lg">
                            {potentialAddresses.map((address, key) => {
                                const nameAddress = `${address.address_line1}, ${address.address_line2}`;
                                return (
                                    <div className={`flex flex-col transition duration-100 justify-between hover:bg-zinc-300 ${key !== potentialAddresses.length - 1 ? `border-b border-zinc-300` : ""} cursor-pointer text-sm`} key={key}>
                                        <span onClick={() => setAddress(nameAddress)}>{`${nameAddress}`}</span>
                                    </div>
                                )
                            })}
                        </div>
                        ) : ""}
                </div>
                <div className={`w-1/2 relative max-lg:${showSearch} flex gap-2`}>
                    <div className="flex w-full">
                        <BaseInput ref={refRestaurant} className="w-96" onChange={handleSearchRestaurants} placeholder="Rechercher parmis nos restaurants"/>
                        <span className="w-10 h-10 border-r border-y rounded-r-lg border-black bg-zinc-200 grid place-items-center">
                            <XMarkIcon className="p-[3px] cursor-pointer w-7 hover:bg-zinc-300 rounded-full transition ease-in-out duration-150" onClick={removeRestaurants} />
                        </span>
                    </div>
                    <ArrowPathIcon className="w-6 hidden max-lg:block cursor-pointer" onClick={handleShowSearch}/>
                    {restaurantsSearched && restaurantsSearched.length > 0 ? (
                        <div className="absolute bg-zinc-200 top-10 w-full p-1 rounded-b-lg">
                        {restaurantsSearched.map((restaurant, key) => {
                            return (
                                <div className={`flex flex-col transition duration-100 justify-between hover:bg-zinc-300 ${key !== restaurantsSearched.length - 1 ? `border-b border-zinc-300` : ""} cursor-pointer text-sm`} key={key}>
                                    <span>{restaurant.name}</span>
                                </div>
                            )
                        })}
                    </div>
                    ) : ""}
                </div>
            </div>
            <div className="transform transition-all w-1/4 h-full flex justify-end items-center max-lg:hidden">
                {status !== 1 ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <BaseButton className="focus:outline-none" label="Mon compte" variant="zinc"></BaseButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-200 border border-black mr-4">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="flex items-center focus:border-black" onClick={() => router.push("/connect")}>
                                    <User className="mr-2 h-5 w-5"></User>
                                    <span>Connexion</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/register")}>
                                    <UserPlusIcon className="mr-1 h-6 w-6"></UserPlusIcon>
                                    <span>Inscription</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/basket")}>
                                    <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                                    <span>Panier {cardProducts.length > 1 && ` - ${cardProducts.length}`}</span>
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
                            {cardProducts.length > 0 || basket.data && basket.data?.products.length > 0 ? (
                                <span className="absolute font-bold animate-bounce flex justify-center items-center w-4 h-4 text-sm rounded-full bg-primary -top-2 -right-2">{status == 1 ? basket.data?.products.length : cardProducts.length}</span>
                            ) : ""}
                        </a>
                        <span className="cursor-pointer" onClick={() => setToogleAccount(!toogleAccount)}>
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
                            <XMarkIcon className="w-7 text-black cursor-pointer hover:bg-zinc-200 rounded-full p-1" onClick={() => setToogleAccount(!toogleAccount)} />
                        </span>
                    </div>
                )}
            </div>
            <div className="max-lg:flex max-lg:w-1/12 justify-end items-center hidden w-1/4 relative">
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Bars3Icon className="cursor-pointer w-7" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-200 border border-black mr-4 mt-1">
                            {status !== 1 ? (
                                <DropdownMenuGroup>
                                <DropdownMenuItem className="flex items-center focus:border-black" onClick={() => router.push("/connect")}>
                                    <User className="mr-2 h-5 w-5"></User>
                                    <span>Connexion</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/register")}>
                                    <UserPlusIcon className="mr-1 h-6 w-6"></UserPlusIcon>
                                    <span>Inscription</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/basket")}>
                                    <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                                    <span>Panier {cardProducts.length > 0 && ` - ${cardProducts.length}`}</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            ) : (
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="flex items-center focus:border-black" onClick={() => router.push("/basket")}>
                                        <ShoppingCart className="mr-2 h-5 w-5"></ShoppingCart>
                                        <span>Panier {basket.data && basket.data.products.length > 0 && ` - ${basket.data.products.length}`}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center" onClick={() => router.push("/commands")}>
                                        <ShoppingBag className="mr-2 h-5 w-5"></ShoppingBag>
                                        <span>Mes commandes</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center" onClick={() => router.push("/account")}>
                                        <User className="mr-2 h-5 w-5"></User>
                                        <span>Mon compte</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center" onClick={logout}>
                                        <LogOut className="mr-2 h-5 w-5"></LogOut>
                                        <span>Déconnexion</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
            </div>
        </div>
        )
}
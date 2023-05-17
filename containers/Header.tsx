'use client';

import { ReactElement, useEffect, useRef, useState } from "react";
import logo from "../images/logoBlackPng.png";
import { BaseInput } from "@/components/input/Input";
import { InboxIcon, ShoppingCartIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { autocompleteAddresses } from "@/services/Geolocate";
import { InputDatalist } from "@/components/input/InputDatalist";

export function Header(): ReactElement {

    //Ref inputs
    const refAddress = useRef<HTMLInputElement>(null);
    
    //Constantes
    const [potentialAddresses, setPotentialAddresses] = useState<any[]>([]);
    const [nameAddress, setNameAddress] = useState<string>("");
    const [toogleAddress, setToogleAddress] = useState<boolean>(false);
    const [toogleAccount, setToogleAccount] = useState<boolean>(false);

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

        localStorage.setItem("address", address);
    }
    const removeAddress = () => {
        if (!refAddress.current) return;
        refAddress.current.value = "";
        setPotentialAddresses([]);

        localStorage.removeItem("address");
        setToogleAddress(!toogleAddress);
    }

    return (
        <div className="sticky flex justify-center items-center w-full top-0 bg-inherit px-8 py-1 h-20 shadow-md">
            <div className="w-1/4 h-full flex justify-start items-center">
                <a href="/"><img src={logo.src} alt="Logo du site" width={140} /></a>
            </div>
            <div className="w-2/4 flex justify-center items-center gap-4 h-full">
                <div className="w-1/2 relative">
                    <BaseInput ref={refAddress} className="w-96" placeholder={nameAddress} list="addresses" onChange={handleChangeAddress} />
                    <XMarkIcon onClick={removeAddress} className="absolute right-3 top-[7px] p-[3px] cursor-pointer w-7 hover:bg-zinc-300 rounded-full transition ease-in-out duration-150" />
                    {potentialAddresses && potentialAddresses.length > 0 ? (
                        <div className="absolute bg-zinc-200 w-11/12 ml-4 p-1 rounded-b-lg">
                            {potentialAddresses.map((address, key) => {
                                const nameAddress = `${address.address_line1}, ${address.address_line2}`;
                                return (
                                    <div className={`flex flex-col justify-between ${key !== potentialAddresses.length - 1 ? `border-b border-zinc-300` : ""} cursor-pointer text-sm`} key={key}>
                                        <span onClick={() => setAddress(nameAddress)}>{`${nameAddress}`}</span>
                                    </div>
                                )
                            })}
                        </div>
                        ) : ""}
                        {/*
                    <datalist id={`addresses`} className="bg-zinc-200 w-11/12 p-1 rounded-b-lg">
                        {potentialAddresses.map((value, index) => (
                            <option key={index} value={`${value.address_line1}, ${value.address_line2}`} />
                        ))}
                    </datalist>*/}
                </div>
                <div className="w-1/2 relative">
                    <BaseInput className="w-96" placeholder="Rechercher parmis nos restaurants"/>
                    <XMarkIcon onClick={removeAddress} className="absolute right-3 top-[7px] p-[3px] cursor-pointer w-7 hover:bg-zinc-300 rounded-full transition ease-in-out duration-150" />
                    {/*<InputDatalist placeholder="Rechercher parmis nos restaurants" options={potentialAddresses} />*/}
                </div>
            </div>
            <div className="transform transition-all w-1/4 h-full flex justify-end gap-10 items-center">
                {!toogleAccount ? (
                    <>
                        <a href="/commands">
                            <InboxIcon className="w-6 text-black" />
                        </a>
                        <a href="/basket">
                            <ShoppingCartIcon className="w-6 text-black" />
                        </a>
                        <span className="cursor-pointer" onClick={() => setToogleAccount(!toogleAccount)}>
                            <UserCircleIcon className="w-6 text-black" />
                        </span>
                    </>
                ) : (
                    <>
                        <a className="cursor-pointer hover:underline" href="/account">
                            Mon compte
                        </a>
                        <button className="hover:underline">
                            Déconnexion
                        </button>
                        <span>
                            <XMarkIcon className="w-5 text-black cursor-pointer" onClick={() => setToogleAccount(!toogleAccount)} />
                        </span>
                    </>
                )}
            </div>
        </div>
        )
}
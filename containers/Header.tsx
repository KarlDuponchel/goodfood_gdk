import { ReactElement } from "react";
import logo from "../images/logoBlackPng.png";
import { BaseInput } from "@/components/Input";
import { InboxIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export function Header(): ReactElement {
    return (
        <div className="sticky flex justify-center items-center w-full top-0 bg-inherit px-8 py-1 h-20 shadow-md">
            <div className="w-1/4 h-full flex justify-start items-center">
                <a href="/"><img src={logo.src} alt="Logo du site" width={140} /></a>
            </div>
            <div className="w-2/4 flex justify-center items-center gap-4 h-full">
                <BaseInput className="w-96" placeholder="Votre adresse"/>
                <BaseInput className="w-96" placeholder="Rechercher parmis nos restaurants"/>
            </div>
            <div className="w-1/4 h-full flex justify-end gap-10 items-center">
                <a href="/commands">
                    <InboxIcon className="w-7" />
                </a>
                <a href="/basket">
                    <ShoppingCartIcon className="w-7" />
                </a>
                <a href="/account">
                    <UserCircleIcon className="w-7" />
                </a>
            </div>
        </div>
        )
}
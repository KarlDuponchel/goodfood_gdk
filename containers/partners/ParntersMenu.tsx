"use client";

import logo from "@/images/logoBlackPng.png"
import Image from "next/image"
import { PlusCircleIcon, ChartBarSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { BaseButton } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function PartnersMenu() {
    const router = useRouter();

    const disconnect = () => {
        router.push("/partners/connect");
    }

    return (
        <div className="bg-zinc-200 h-full w-[13%] flex flex-col">
            <div className="w-full h-1/5 grid justify-center pt-8">
                <Image alt="Logo du site" src={logo.src} width={150} height={150} />
            </div>
            <div className="w-full h-1/5 flex flex-col gap-4 px-14">
                <a href="/" className="flex gap-2 hover:underline underline-offset-4">
                    <PlusCircleIcon className="w-6" />
                    <span className="font-bold">Fournitures</span>
                </a>
                <a href="/" className="flex gap-2 hover:underline underline-offset-4">
                    <ChartBarSquareIcon className="w-6" />
                    <span className="font-bold">Statistiques</span>
                </a>
                <a href="/" className="flex gap-2 hover:underline underline-offset-4">
                    <UserCircleIcon className="w-6" />
                    <span className="font-bold">Mon compte</span>
                </a>
            </div>
            <div className="w-full h-3/5">
                <div className="flex flex-col gap-3 h-full justify-end items-center pb-4">
                    <BaseButton className="w-3/4" label="Déconnexion" onClick={disconnect} variant="black" />
                    <span className="font-bold text-lg">© GoodFood 2023</span>
                </div>
            </div>
        </div>
    )
}
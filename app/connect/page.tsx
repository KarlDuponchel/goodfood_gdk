'use client';

import { BaseInputConnect } from "@/components/input/InputConnect";
import logo from "../../images/logoGF.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function Connect() {
    const router = useRouter();
    const [typeInput, setTypeInput] = useState<string>("password");

    const handleClick = () => {
        if (typeInput == "password") {
            setTypeInput("text");
        } else {
            setTypeInput("password");
        }
    }

    const redirectToRegister = () => {
        router.push("/register");
    }

    const submitConnect = () => {
        let ok = true;
        if (ok) {
            router.push("/");
        }
    } 

    return (
        <div className="bg-bg-food w-full bg-cover h-screen grid place-items-center">
            <div className="bg-slate-50 w-1/5 h-fit rounded-lg p-4 flex flex-col items-center">
                <div className="text-center text-3xl font-bold pb-2">
                    <img src={logo.src} alt="Logo de GoodFood" width={120}/>
                </div>
                <span className="bg-primary w-full h-0.5"/>
                <div className="flex flex-col justify-center gap-4 w-full py-4">
                    <div className="flex justify-center items-center">
                        <BaseInputConnect label="Adresse mail" type="email" />
                    </div>
                    <div className="flex justify-center items-center relative">
                        <BaseInputConnect label="Mot de passe" type={typeInput} />
                        {typeInput == "password" ? (
                            <EyeIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                            <EyeSlashIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                        )}
                        <span className="absolute -bottom-6 text-sm right-4 cursor-pointer hover:underline">Mot de passe oublié ?</span>
                    </div>
                </div>
                <div className="w-full flex gap-4 pt-10">
                    <BaseButton variant="primary" label="Connexion" onClick={submitConnect} className="w-full" />
                    <BaseButton variant="transparent" label="Inscription" onClick={redirectToRegister} className="w-full" />
                </div>
                <div className="w-full flex justify-center items-center pt-6 gap-2">
                    <span className="text-gray-400">Vous êtes livreur ?</span>
                    <span className="text-primary cursor-pointer hover:underline">Cliquez ici</span>
                </div>
            </div>
        </div>
    )
}
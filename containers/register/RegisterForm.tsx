"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseInputConnect } from "@/components/input/InputConnect";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function RegisterForm () {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<string>("password");
    const [showConfirmPassword, setShowConfirmPassword] = useState<string>("password");

    const handleClickPassword = (type: string) => {
        if (type == "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    }

    const handleClickConfirmPassword = (type: string) => {
        if (type == "password") {
            setShowConfirmPassword("text");
        } else {
            setShowConfirmPassword("password");
        }
    }
    
    const submitRegister = () => {
        console.log("submit register");
    }

    const redirectToConnect = () => {
        router.push("/connect");
    }

    return (
        <div className="bg-slate-50 w-2/5 h-fit rounded-lg p-8 flex flex-col items-center max-xl:w-3/5 max-lg:w-4/5">
            <div className="text-center text-3xl w-3/4 h-1/6 grid place-items-center font-bold pb-4">
                <span>Rejoignez-nous, en renseignant vos coordonnées</span>
            </div>
            <span className="bg-primary w-full h-0.5"/>
            <div className="grid grid-cols-2 w-full place-items-center pt-3 gap-4">
                <BaseInputConnect label="Nom*" />
                <BaseInputConnect label="Prenom*" />
                <BaseInputConnect label="Email*" />
                <div className="w-full grid place-items-center relative">
                    <BaseInputConnect label="Mot de passe*" type={showPassword} />
                    {showPassword == "password" ? (
                        <EyeIcon onClick={() => handleClickPassword(showPassword)} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                        <EyeSlashIcon onClick={() => handleClickPassword(showPassword)} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                    )}
                </div>
                <div className="w-full grid place-items-center relative">
                    <BaseInputConnect className="" label="Confirmation de mot de passe*" type={showConfirmPassword} />
                    {showConfirmPassword == "password" ? (
                        <EyeIcon onClick={() => handleClickConfirmPassword(showConfirmPassword)} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                        <EyeSlashIcon onClick={() => handleClickConfirmPassword(showConfirmPassword)} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center w-full gap-4 mt-7">
                <BaseButton label="Continuer" className="w-1/3" variant="primary" onClick={submitRegister}/>
                <BaseButton label="Connexion" className="w-1/3" variant="transparent" onClick={redirectToConnect}/>
            </div>
            <span className="bg-black w-full h-0.5 my-7"/>
            <div className="text-center text-sm px-4">
                <span>En continuant, vous acceptez nos Conditions d&apos;utilisations et de recevoir des messages
                    et appels de la part de nos livreurs et des restaurants partenaires.
                </span>
            </div>
        </div>
    )
}
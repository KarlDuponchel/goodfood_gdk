'use client';

import { BaseInputConnect } from "@/components/input/InputConnect";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export type ConnectFormProps = {}

export const ConnectForm: FunctionComponent<ConnectFormProps> = () => {
    const { toast } = useToast();

    const { login } = useAuth();

    const router = useRouter();

    const refEmail = useRef<HTMLInputElement>(null);
    const refPswd = useRef<HTMLInputElement>(null);

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
        if (!refEmail.current || !refPswd.current) return;
        const email = refEmail.current.value;
        const password = refPswd.current.value;

        try {
            login(email, password)
        } catch {
            toast({
                description: "Informations de connexion erronées"
            })
        }
    } 

    return (
        <div className="bg-slate-50 w-1/5 h-fit rounded-lg p-4 flex flex-col items-center max-xl:w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-2/3">
            <div className="text-center text-3xl font-bold pb-2">
                <Image alt="Logo goodfood" src={"/images/logoGF.png"} width={120} height={120} />
            </div>
            <span className="bg-primary w-full h-0.5"/>
            <div className="flex flex-col justify-center gap-4 w-full py-4">
                <div className="flex justify-center items-center">
                    <BaseInputConnect ref={refEmail} label="Adresse mail" type="email" />
                </div>
                <div className="flex justify-center items-center relative">
                    <BaseInputConnect ref={refPswd} label="Mot de passe" type={typeInput} />
                    {typeInput == "password" ? (
                        <EyeIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                        <EyeSlashIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                    )}
                    <span className="absolute -bottom-6 text-sm right-4 cursor-pointer hover:underline">Mot de passe oublié ?</span>
                </div>
            </div>
            <div className="w-full flex gap-4 pt-10">
                <BaseButton variant="primary" label="Connexion" type="button" onClick={submitConnect} className="w-full" />
                <BaseButton variant="transparent" label="Inscription" onClick={redirectToRegister} className="w-full" />
            </div>
            <div className="w-full flex justify-center items-center pt-6 gap-2">
                <span className="text-gray-400">Vous êtes livreur ?</span>
                <a className="text-primary cursor-pointer hover:underline" href="/partners/connect">Cliquez ici</a>
            </div>
        </div>
    )
}
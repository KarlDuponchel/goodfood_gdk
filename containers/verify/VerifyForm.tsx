'use client';

import { BaseInputConnect } from "@/components/input/InputConnect";
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/services/User";
import { useToast } from "@/components/ui/use-toast";

export type VerifyFormProps = {}

export const VerifyForm: FunctionComponent<VerifyFormProps> = () => {

    //REGEX : Une majuscule, une minuscule, 1 chiffre, et 1 caractère spécial, entre 8 et 32 chars

    //Initialisation des constantes
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    /*Récupération du token*/
    const token = searchParams.get("accessToken");

    const [typeInput, setTypeInput] = useState<string>("password");
    const [typeInputConfirm, setTypeInputConfirm] = useState<string>("password");

    const [tooglePswd, setTooglePswd] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const refPassword = useRef<HTMLInputElement>(null);
    const refPasswordConfirm = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (typeInput == "password") {
            setTypeInput("text");
        } else {
            setTypeInput("password");
        }
    }

    const handleClickConfirm = () => {
        if (typeInputConfirm == "password") {
            setTypeInputConfirm("text");
        } else {
            setTypeInputConfirm("password");
        }
    }

    const handlePasswordMatch = () => {
        if (!refPassword.current || !refPasswordConfirm.current) return;

        if (refPassword.current.value !== refPasswordConfirm.current.value) {
            setTooglePswd(true);
            setDisabled(true);
        } else {
            setTooglePswd(false);
            setDisabled(false);
        }
    }

    const confirmRegister = () => {
        if (!refPassword.current || !refPasswordConfirm.current || token == null) return;

        if (!disabled) {
            verifyEmail(token, refPassword.current.value, refPasswordConfirm.current.value).then(() => {
                toast({
                    variant: "default",
                    title: "Création réussie !",
                    description: "La création de compte est terminée, vous serez redirigé(e) vers la page de connexion"
                })
                setTimeout(() => {
                    router.push("/connect");
                }, 3500)
            }).catch(() => {
                toast({
                    title: "Erreur",
                    variant: "destructive",
                    description: "Une erreur est survenue à la confirmation du mot de passe"
                })
            });
        }
    }
    /*
    if (!token || token == null) {
        return (
            <div className="text-white">
                Veuillez passer la page de connexion
            </div>
        )
    }*/

    return (
        <div className="bg-slate-50 w-1/5 h-fit rounded-lg p-4 flex flex-col items-center max-xl:w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-2/3">
            <div className="text-center text-xl w-3/4 h-1/6 grid place-items-center font-bold pb-4">
                <span>Dernière chose, renseignez votre mot de passe</span>
            </div>
            <span className="bg-primary w-full h-0.5"/>
            <div className="flex flex-col justify-center gap-4 w-full py-4 relative">
                <div className="flex justify-center items-center relative">
                    <BaseInputConnect ref={refPassword} label="Mot de passe" type={typeInput} />
                    {typeInput == "password" ? (
                        <EyeIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                        <EyeSlashIcon onClick={handleClick} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                    )}
                </div>
                <div className="flex justify-center items-center relative">
                    <BaseInputConnect ref={refPasswordConfirm} label="Confirmation de mot de passe" type={typeInputConfirm} onChange={handlePasswordMatch} />
                    {typeInputConfirm == "password" ? (
                        <EyeIcon onClick={handleClickConfirm} className="absolute w-6 right-6 bottom-2 cursor-pointer" />) : (
                        <EyeSlashIcon onClick={handleClickConfirm} className="absolute w-6 right-6 bottom-2 cursor-pointer" />
                    )}
                </div>
                {tooglePswd ? (
                    <span className="text-red-500 text-sm font-thin animate-pulse -mt-4">Les mots de passe ne correspondent pas</span>
                ) : ""}
            </div>
            <div className="flex flex-col items-start w-full text-sm">
                <span>Le mot de passe doit contenir au moins :</span>
                <ul className="list-disc list-inside pl-4">
                    <li>8 caractères</li>
                    <li>1 majuscule et 1 minuscule</li>
                    <li>1 chiffre</li>
                </ul>
            </div>
            <div className="w-3/4 flex gap-4 pt-4">
                <BaseButton variant="primary" label="Poursuivre" type="button" disabled={disabled} onClick={confirmRegister} className={`w-full ${disabled ? "cursor-not-allowed" : ""}`} />
            </div>
        </div>
    )
}
"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseInputConnect } from "@/components/input/InputConnect";
import { useToast } from "@/components/ui/use-toast";
import { createUser } from "@/services/User";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function RegisterForm () {
    const router = useRouter();
    const { toast } = useToast();

    const refName = useRef<HTMLInputElement>(null);
    const refFirstname = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);

    const submitRegister = () => {
        if (!refName.current || !refFirstname.current || !refEmail.current) return;
        const email = refEmail.current.value;
        const firstname = refFirstname.current.value;
        const name = refName.current.value;

        createUser(email, firstname, name).then(async () => {
            toast({
                title: "Mail envoyé",
                description: "Un mail de confirmation a bien été envoyé."
            })
        }).catch(() => {
            toast({
                title: "Erreur",
                variant: "destructive",
                description: "Erreur à la création de compte"
            })
        });
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
                <BaseInputConnect ref={refName} label="Nom*" />
                <BaseInputConnect ref={refFirstname} label="Prenom*" />
                <BaseInputConnect ref={refEmail} label="Email*" />
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
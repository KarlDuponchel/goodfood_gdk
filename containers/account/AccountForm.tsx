"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseInputAccount } from "@/components/input/InputAccount";
import { useAuth } from "@/hooks/useAuth";

export const AccountForm = () => {
    const { user } = useAuth()

    if (!user) return (
        <div className="animate-pulse">
            Loading...
        </div>
    )
    return (
        <div className="w-1/2 bg-zinc-200 rounded shadow-md p-3 flex flex-col gap-6 justify-center items-center max-2xl:w-2/3 max-lg:w-10/12">
            <span className="w-full font-bold text-lg">Informations</span>
            <div className="w-3/4 grid grid-cols-2 gap-6 max-lg:w-10/12 max-sm:grid-cols-1 max-sm:w-full max-sm:place-items-center">
                <BaseInputAccount label="Nom" defaultValue={user.lastname} />
                <BaseInputAccount label="Prénom" defaultValue={user.firstname} />
                <BaseInputAccount label="Mot de passe" defaultValue={"********"} type="password" />
                <BaseInputAccount label="Adresse mail" defaultValue={user.email} />
                <BaseInputAccount label="Confirmation de mot de passe" defaultValue={"********"} type="password" />
            </div>
            <div className="w-full flex justify-end max-sm:justify-center">
                <BaseButton className="w-40 hover:scale-105 transition-all duration-150" label="Sauvegarder" variant="primary" />
            </div>
        </div>
    )
}
"use client";

import { FormEvent, useEffect, useState } from "react"
import { Footer } from "../Footer"
import { Header } from "../Header"
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline"
import { Progress } from "@/components/ui/progress"
import { BaseButton } from "@/components/button/Button"
import { Order, OrderBody } from "@/utils/types";
import { useAuth } from "@/hooks/useAuth";
import { validateBasket } from "@/services/Basket";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Popup } from "@/components/blocks/Popup";

export const ValidatePage = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [adresseClient, setAdresseClient] = useState<string>("");
    const [ouvrir, setOuvrir] = useState(false);

    const [emailDisconnectUser, setEmailDisconnectUser] = useState("")

    const open = (event: FormEvent) => {
        event.preventDefault();
        setOuvrir(true);
    };

    const fermer = () => {
        setOuvrir(false);
    };

    useEffect(() => {
        if (localStorage.getItem("address")) {
            setAdresseClient(localStorage.getItem("address") as string);
        }
        if (localStorage.getItem("email")) {
            setEmailDisconnectUser(localStorage.getItem("email") as string);
        }
    }, []);

    const submitOrder = () => {
        const adresse = adresseClient.split(",");
        const indexOfCity = adresse[1].trim().indexOf(" ")
        const zipCode = adresse[1].trim().substring(0, indexOfCity + 1)
        const city = adresse[1].trim().substring(indexOfCity + 1, adresse[1].length)
        
        if (user) {
            const orderBody: OrderBody = {
                email: user ? user.email : "",
                idRestaurant: 1,
                country: adresse[2],
                city: city,
                address: adresse[0],
                additionnalAddress: "",
                zipCode: zipCode.trim(),
                commandType: "client",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            validateBasket(user._id, orderBody).then((value: Order) => {
                toast({
                    title: "Commande créée",
                    description: "Votre commande a bien été créée, vous allez être ridirigé"
                })

                setTimeout(() => {
                    router.push(`/commands/${value.id}`)
                }, 2000)
            })
        } else {
            const orderBody: OrderBody = {
                email: emailDisconnectUser,
                idRestaurant: 1,
                country: adresse[2],
                city: city,
                address: adresse[0],
                additionnalAddress: "",
                zipCode: zipCode.trim(),
                commandType: "client",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            validateBasket(emailDisconnectUser, orderBody).then((value: Order) => {
                localStorage.removeItem("product")
                toast({
                    title: "Commande créée",
                    description: "Votre commande a bien été créée, vous allez être ridirigé"
                })

                setTimeout(() => {
                    router.push(`/commands/${value.id}`)
                }, 2000)
            })
        }
    }

    return (
        <>
            <Header />
            <div className="p-6 flex flex-col gap-5 min-h-screen">
                <div className='flex justify-between font-bold text-lg'>
                    <div className="">
                        <a href="/basket" className="flex gap-2">
                          <ArrowSmallLeftIcon className='w-6'/>
                          <span>Retour au <span className='text-primary'>panier</span></span>
                        </a>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-16">
                    <span className="text-2xl font-bold">Validation de ma commande</span>
                    <div className="flex justify-center">
                        <div className="w-3/4 flex flex-col gap-8 relative">
                            <span className="absolute left-0 -top-14 w-7 text-center">
                                Panier validé
                            </span>
                            <span className="absolute right-1/2 -top-14 w-7 text-center">
                                Panier confirmé
                            </span>
                            <span className="absolute right-0 -top-14 w-24 text-center">
                                Attente de paiement
                            </span>
                            <Progress value={50} />
                            <div className="flex justify-end">
                                <BaseButton label="Paiement" variant="black" className="w-32" onClick={open}></BaseButton>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup 
                    btnLbl="Confirmer" 
                    title="Confirmation de commande" 
                    content={`Appuyer sur confirmer pour commander`} 
                    ouvrir={ouvrir} 
                    fermer={fermer} 
                    submit={submitOrder} 
                />
            </div>
            <Footer />
        </>
    )
}
'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { FormEvent, useEffect, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { ProductBasket } from "@/containers/products/ProductBasket";
import { Popup } from "@/components/blocks/Popup";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CardProduct, Order } from "@/utils/types";
import { useAuth } from "@/hooks/useAuth";
import { createOrder } from "@/services/Order";

export const BasketPage = () => {

    //Ajouter la demande d'email si non connecté avec status

    const router = useRouter();

    const { toast } = useToast();
    const { user, status } = useAuth();

    //Constantes pour le modal Popup
    const [ouvrir, setOuvrir] = useState(false);

    const open = (event: FormEvent) => {
        event.preventDefault();
        setOuvrir(true);
    };

    const fermer = () => {
        setOuvrir(false);
    };

    const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

    const [cardProducts, setCardProducts] = useState<CardProduct[]>([]);
    const [adresseClient, setAdresseClient] = useState<string>("");
    const [loading, setLoading] = useState<string>("pulse");

    useEffect(() => {
        if (localStorage.getItem("product")) {
            setCardProducts(JSON.parse(localStorage.getItem("product") as string));
        }
        if (localStorage.getItem("address")) {
            setAdresseClient(localStorage.getItem("address") as string);
        }
        setLoading("none");
    }, [updateShoppingCart]);

    /**
     * Met à jour les différentes données
     * @param n any
     */
    const toogleFromChild = (n: any) => {
        if (!updateShoppingCart) {
          setUpdateShoppingCart(n);
        } else {
          setUpdateShoppingCart(!n);
        }
    }

    /**
     * Permet de calculer le prix total
     * @returns number
     */
    const getTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < cardProducts.length; i++) {
            total += Number(cardProducts[i].nbProduct) * cardProducts[i].price;
        }
        return total.toFixed(2);
    }

    if (!cardProducts) {
        return (
            <div>Chargement...</div>
        )
    }

    /**
     * Permet de soumettre la commande
     */
    const submitCommand = () => {
        //TODO: Envoyer la commande
        if (adresseClient !== "") {
            const adresse = adresseClient.split(",");
            const indexOfCity = adresse[1].trim().indexOf(" ")
            const zipCode = adresse[1].trim().substring(0, indexOfCity + 1)
            const city = adresse[1].trim().substring(indexOfCity + 1, adresse[1].length)

            const orderContent = cardProducts.map((product: CardProduct) => {
                return {
                    idContent: product.id,
                    quantity: Number(product.nbProduct),
                    price: product.price
                }
            })
            
            const orderBody: Order = {
                email: user ? user.email : "test@email.com",
                idRestaurant: cardProducts[0].id_restaurant,
                country: adresse[2],
                city: city,
                address: adresse[0],
                additionnalAddress: "",
                zipCode: zipCode.trim(),
                commandType: "done",
                isValidate: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                orderContents: [{
                    idContent: 1,
                    quantity: 1,
                    price: 7
                }]
            }

            createOrder(orderBody).then((body) => {
                toast({
                    title: "Commande créée",
                    description: "Votre commande a bien été créée, vous allez être redirigé"
                })
                localStorage.removeItem("product")
                router.push(`/commands/${body.id}`);
                setOuvrir(false);
            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Une erreur est survenue",
                    description: `Une erreur est survenue à la création de la commande`
                })
                setOuvrir(false)
            })
        } else {
            setOuvrir(false);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Veuillez renseigner votre adresse de livraison",
            });
        }
    }

    return (
        <>
            <Header toogle={updateShoppingCart} />
            <div className={`p-6 flex flex-col gap-8 min-h-screen animate-${loading}`}>
                <div className='flex justify-between font-bold text-lg'>
                    <span>Votre <span className='text-primary'>panier</span></span>
                </div>
                {cardProducts.length === 0 ? (
                    <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                        Votre panier est vide
                    </div>
                ) : (
                <div className="w-full flex justify-center items-center">
                    <div className="w-4/6 max-md:w-5/6 max-sm:w-11/12 h-3/4 flex flex-col">
                        {cardProducts.map((product) => {
                            return (
                                <ProductBasket key={product.id} product={product} onUpdateCart={toogleFromChild} />
                            )
                        })}
                        <div className="flex justify-end gap-3 mt-10">
                            <div className="flex flex-col w-2/12 max-lg:w-1/4 max-md:w-1/3 gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold">{getTotalPrice()}€</span>
                                </div>
                                <div className="">
                                    <BaseButton className="w-full transition-all duration-75 hover:scale-105" onClick={open} variant="primary" label="Commander" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                <Popup 
                    btnLbl="Confirmer" 
                    title="Confirmation de commande" 
                    content={`Souhaitez-vous vraiment commander ${cardProducts.length} article${cardProducts.length > 1 ? "s" : ""} pour un montant de ${getTotalPrice()}€ ?`} 
                    ouvrir={ouvrir} 
                    fermer={fermer} 
                    submit={submitCommand} 
                />
            </div>
            <Footer />
        </>
    )
}
'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { FormEvent, useEffect, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { ProductBasket } from "@/containers/products/ProductBasket";
import { Popup } from "@/components/blocks/Popup";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Basket, CardProduct, Order, Product } from "@/utils/types";
import { useAuth } from "@/hooks/useAuth";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { PopupInput } from "@/components/blocks/PopupInput";
import { createBasket } from "@/services/Basket";

export const BasketPage = () => {

    //Ajouter la demande d'email si non connecté avec status

    const router = useRouter();

    const { toast } = useToast();
    const { user, status } = useAuth();

    const basket = useFetchBasketByUserID(user ? user._id : "");

    //Constantes pour le modal Popup
    const [ouvrir, setOuvrir] = useState(false);
    const [ouvrirInput, setOuvrirInput] = useState(false);

    const [inputDialog, setInputDialog] = useState("");

    const open = (event: FormEvent) => {
        event.preventDefault();
        setOuvrir(true);
    };

    const openInput = (event: FormEvent) => {
        event.preventDefault();
        setOuvrirInput(true);
    }

    const fermer = () => {
        setOuvrir(false);
        setOuvrirInput(false);
    };

    const getInputDialog = (n: string) => {
        setInputDialog(n);
    }

    useEffect(() => {
        localStorage.setItem("email", inputDialog)
    }, [inputDialog])

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
            total += Number(cardProducts[i].quantity) * 12;
        }
        return total.toFixed(2);
    }

    if (!cardProducts) {
        return (
            <div>Chargement...</div>
        )
    }

    const confirmCommand = () => {
        if (adresseClient == "") {
            setOuvrir(false);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Veuillez renseigner votre adresse de livraison",
            });
        } else {
            if (user) {
                router.push("/validate");
            } else {
                const products = cardProducts.map((val) => {
                    return {
                        idContent: val.idContent,
                        contentName: val.contentName,
                        quantity: val.quantity
                    }
                })
                const orderBody = {
                    userId: inputDialog,
                    products: products
                }
                createBasket(orderBody).then(() => {
                    router.push("/validate")
                })
            }
        }
    }

    /**
     * Permet de soumettre la commande
     */
    /*const submitCommand = () => {
        if (adresseClient !== "") {
            const adresse = adresseClient.split(",");
            const indexOfCity = adresse[1].trim().indexOf(" ")
            const zipCode = adresse[1].trim().substring(0, indexOfCity + 1)
            const city = adresse[1].trim().substring(indexOfCity + 1, adresse[1].length)

            const orderContent = cardProducts.map((product: CardProduct) => {
                return {
                    idContent: product.id,
                    quantity: Number(product.nbProduct),
                    contentName: product.name,
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
                commandType: "wait",
                isValidate: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                orderContents: orderContent
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
    }*/

    return (
        <>
            <Header toogle={updateShoppingCart} />
            <div className={`p-6 flex flex-col gap-8 min-h-screen animate-${loading}`}>
                <div className='flex justify-between font-bold text-lg'>
                    <span>Votre <span className='text-primary'>panier</span></span>
                </div>
                {status !== 1 ? (
                    cardProducts.length == 0 ? (
                        <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                            Votre panier est vide
                        </div>
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <div className="w-4/6 max-md:w-5/6 max-sm:w-11/12 h-3/4 flex flex-col">
                                {cardProducts.map((product) => {
                                    return (
                                        <ProductBasket key={product.idContent} productSent={product} onUpdateCart={toogleFromChild} />
                                    )
                                })}
                                <div className="flex justify-end gap-3 mt-10">
                                    <div className="flex flex-col w-2/12 max-lg:w-1/4 max-md:w-1/3 gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">Total</span>
                                            <span className="font-bold">{getTotalPrice()}</span>
                                        </div>
                                        <div className="">
                                            <BaseButton className="w-full transition-all duration-75 hover:scale-105" onClick={openInput} variant="primary" label="Confirmer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    basket.data && basket.data.products.length === 0 ? (
                        <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                            Votre panier est vide
                        </div>
                    ) : (
                        <div className="w-full flex justify-center items-center">
                            <div className="w-4/6 max-md:w-5/6 max-sm:w-11/12 h-3/4 flex flex-col">
                                {basket.data?.products.map((product) => {
                                    return (
                                        <ProductBasket key={product.idContent} productSent={product} onUpdateCart={toogleFromChild} />
                                    )
                                })}
                                <div className="flex justify-end gap-3 mt-10">
                                    <div className="flex flex-col w-2/12 max-lg:w-1/4 max-md:w-1/3 gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">Total</span>
                                            <span className="font-bold">Total PRICE A FAIRE€</span>
                                        </div>
                                        <div className="">
                                            <BaseButton className="w-full transition-all duration-75 hover:scale-105" onClick={open} variant="primary" label="Confirmer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
                {basket.data && basket.data.products ? (
                    <Popup 
                    btnLbl="Commander" 
                    title="Confirmation de commande" 
                    content={`Souhaitez-vous vraiment commander ${basket.data.products.length} article(s) ?`} 
                    ouvrir={ouvrir} 
                    fermer={fermer} 
                    submit={confirmCommand} 
                />
                ) : (
                    <PopupInput 
                        btnLbl="Commander" 
                        title="Confirmation de commande" 
                        content={`Souhaitez-vous vraiment commander ${cardProducts.length} article${cardProducts.length > 1 ? "s" : ""} pour un montant de ${getTotalPrice()}€ ?`} 
                        ouvrir={ouvrirInput} 
                        fermer={fermer} 
                        submit={confirmCommand}
                        inputValue={getInputDialog}
                    />
                )}
            </div>
            <Footer />
        </>
    )
}
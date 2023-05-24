'use client';

import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { useEffect, useRef, useState } from "react";
import logoBurger from '../../images/burger.jpg';
import { BaseButton } from "@/components/button/Button";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Basket() {
    //Ref
    const refBaseNbSelect = useRef<HTMLSelectElement>(null);

    const [cardProducts, setCardProducts] = useState<any[]>([]);
    const [adresseClient, setAdresseClient] = useState<string>("");
    const [loading, setLoading] = useState<string>("pulse");
    const [toogle, setToogle] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("product")) {
            setCardProducts(JSON.parse(localStorage.getItem("product") as string));
        }

        if (localStorage.getItem("address")) {
            setAdresseClient(localStorage.getItem("address") as string);
        }
        setLoading("none");
    }, [toogle]);

    const getTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < cardProducts.length; i++) {
            total += cardProducts[i].nbProduct * cardProducts[i].price;
        }
        return total.toFixed(2);
    }

    /**
     * Fonction qui supprime un produit du panier
     * @param id id du produit
     * @returns Le tableau des produits sans le produit supprimé
     */
    const deleteFromCart = (id: number) => {
        let products = JSON.parse(localStorage.getItem("product") as string);

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products.splice(i, 1);
                localStorage.setItem("product", JSON.stringify(products));
                setCardProducts(products);
                setToogle(!toogle);
                return;
            }
        }
    }

    /**
     * Fonction qui met à jour le nombre d'un produit dans le panier
     * @param id id du produit
     */
    const updateNbProducts = (id: number) => {
        let products = JSON.parse(localStorage.getItem("product") as string);

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i].nbProduct = refBaseNbSelect.current?.value;
                localStorage.setItem("product", JSON.stringify(products));
                setCardProducts(products);
                setToogle(!toogle);
                return;
            }
        }
    }

    //Récupération des produits en base pour plus d'informations

    return (
        <>
            <Header toogle={toogle} />
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
                    <div className="w-4/6 h-3/4 flex flex-col">
                        {cardProducts.map((product, key) => {
                            return (
                                <div key={key} className="w-full border-b border-zinc-300 mt-3">
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <div className="mb-2">
                                                <a href={`/products/${product.id}`} >
                                                    <img src={logoBurger.src} className="w-16 h-16 bg-no-repeat rounded-full" />
                                                </a>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-extrabold">Nom Restaurant - {product.name} ({product.price}€)</span>
                                                {adresseClient ? (
                                                    <span>Livraison au {adresseClient}</span>
                                                ) : (
                                                    <span>Veuillez renseigner votre adresse</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative flex flex-col items-end gap-3">
                                            <div className="flex gap-1">
                                                <BaseNbSelect ref={refBaseNbSelect} onChange={() => updateNbProducts(product.id)} defaultValue={product.nbProduct}/>
                                                <TrashIcon className="absolute cursor-pointer w-6 text-red-500 -right-7 top-10" onClick={() => deleteFromCart(product.id)} />
                                            </div>
                                            <span className="font-black text-lg">{(product.nbProduct * product.price).toFixed(2)}€</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="flex justify-end gap-3 mt-10">
                            <div className="flex flex-col w-2/12 gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold">{getTotalPrice()}€</span>
                                </div>
                                <div className="">
                                    <BaseButton className="w-full transition-all duration-75 hover:scale-105" variant="primary" label="Commander" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <Footer />
        </>
    )
}
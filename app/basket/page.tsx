'use client';

import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { use, useEffect, useRef, useState } from "react";
import logoBurger from '../../images/burger.jpg';
import { BaseButton } from "@/components/button/Button";

export default function Basket() {
    //Ref
    const refBaseNbSelect = useRef<HTMLSelectElement>(null);

    const [cardProducts, setCardProducts] = useState<any[]>([]);
    const [adresseClient, setAdresseClient] = useState<string>("");

    useEffect(() => {
        if (localStorage.getItem("product")) {
            setCardProducts(JSON.parse(localStorage.getItem("product") as string));
        }

        if (localStorage.getItem("address")) {
            setAdresseClient(localStorage.getItem("address") as string);
        }
    }, []);

    //Récupération des produits en base pour plus d'informations

    console.log(cardProducts);

    return (
        <>
            <Header />
            <div className='p-6 flex flex-col gap-8 min-h-screen'>
                <div className='flex justify-between font-bold text-lg'>
                    <span>Votre <span className='text-primary'>panier</span></span>
                </div>
                {cardProducts.length === 0 ? (
                    <div className="w-full flex flex-col justify-center items-center text-4xl animate-pulse">
                        Votre panier est vide
                    </div>
                ) : (
                    <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-4/6 h-3/4 flex flex-col">
                        {cardProducts.map((product, key) => {
                            return (
                                <div key={key} className="w-full border-b border-zinc-300 mt-3">
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <div className="mb-2">
                                                <img src={logoBurger.src} className="w-16 h-16 bg-no-repeat rounded-full" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-extrabold">Nom Restaurant - {product.name}</span>
                                                {adresseClient ? (
                                                    <span>Livraison au {adresseClient}</span>
                                                ) : (
                                                    <span>Veuillez renseigner votre adresse</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <BaseNbSelect ref={refBaseNbSelect} defaultValue={product.nbProduct}/>
                                            <span className="font-black text-lg">{(product.nbProduct * 7.99).toFixed(2)}€</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="flex justify-end gap-3 mt-10">
                            <div className="flex flex-col w-2/12 gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold">{/*Calcul total prix*/}41€</span>
                                </div>
                                <div className="">
                                    <BaseButton className="w-full" variant="primary" label="Commander" />
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
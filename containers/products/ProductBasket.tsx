'use client';

import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export type ProductBasketProps = {
    /**
     * Identifiant du produit
     */
    id: number;

    /**
     * Nom du produit;
     */
    name: string;

    /**
     * Prix du produit
     */
    price: number;

    /**
     * Nombre de produits
     */
    nbProduct: number;

    /**
     * Image du produit
     */
    image: string;

    /**
     * Permet d'envoyer au container parent un booleen pour actualiser les données
     * @param n any
     * @returns void
     */
    onUpdateCart: (n: any) => void;
}

export const ProductBasket: FunctionComponent<ProductBasketProps> = ({id, name, price, nbProduct, image, onUpdateCart}) => {

    //Ref
    const refBaseNbSelect = useRef<HTMLSelectElement>(null);

    const [adresseClient, setAdresseClient] = useState<string>("");

    useEffect(() => {
        if (localStorage.getItem("address")) {
            setAdresseClient(localStorage.getItem("address") as string);
        }
    }, [])

    /**
     * Fonction qui supprime un produit du panier
     * @param id id du produit
     * @returns Le tableau des produits sans le produit supprimé
     */
    const deleteFromCart = (id: number) => {
        let products = JSON.parse(localStorage.getItem("product") as string);
        onUpdateCart(true);
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products.splice(i, 1);
                localStorage.setItem("product", JSON.stringify(products));
                return;
            }
        }
    }

    /**
     * Fonction qui met à jour le nombre d'un produit dans le panier
     * @param id id du produit
     */
    const updateNbProducts = (id: number) => {
        if (!refBaseNbSelect.current) return;
        let products = JSON.parse(localStorage.getItem("product") as string);
        onUpdateCart(true);
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                console.log(refBaseNbSelect.current?.value);
                products[i].nbProduct = refBaseNbSelect.current.value;
                localStorage.setItem("product", JSON.stringify(products));
                return;
            }
        }
    }
    
    return (
        <div className="w-full border-b border-zinc-300 mt-3">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="mb-2">
                        <a href={`/products/${id}`} >
                            <img src={image} className="w-16 h-16 bg-no-repeat rounded-full" />
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold">Nom Restaurant - {name} ({price}€)</span>
                        {adresseClient ? (
                            <span>Livraison au {adresseClient}</span>
                        ) : (
                            <span>Veuillez renseigner votre adresse</span>
                        )}
                    </div>
                </div>
                <div className="relative flex flex-col items-end gap-3">
                    <div className="flex gap-1">
                        <BaseNbSelect ref={refBaseNbSelect} onChange={() => updateNbProducts(id)} defaultValue={nbProduct}/>
                        <TrashIcon className="absolute cursor-pointer w-6 text-red-500 -right-7 top-10" onClick={() => deleteFromCart(id)} />
                    </div>
                    <span className="font-black text-lg">{(nbProduct * price).toFixed(2)}€</span>
                </div>
            </div>
        </div>
    )
}
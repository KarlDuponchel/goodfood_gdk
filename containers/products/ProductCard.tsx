"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { FunctionComponent, use, useEffect, useRef, useState } from "react";

export type ProductCardProps = {
    /**
     * Identifiant du produit
     */
    id: number;
    
    /**
     * Nom du produit
     */
    name: string;

    /**
     * Image du produit
     */
    image: string;
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({id, name, image}) => {
    const refNbProduct = useRef<HTMLSelectElement>(null);

    const addToCard = () => {
        if (!refNbProduct.current) return;
        let nbProduct = refNbProduct.current.value;
        let product = {
            id: id,
            name: name,
            nbProduct: nbProduct
        }
        if (localStorage.getItem("product")) {
            let products = JSON.parse(localStorage.getItem("product") as string);
            products.push(product);
            localStorage.setItem("product", JSON.stringify(products));
        } else {
            let products = [];
            products.push(product);
            localStorage.setItem("product", JSON.stringify(products));
        }
    }

    console.log(localStorage.getItem("product"));
    
    return (
        <div className="w-64 h-60 rounded bg-zinc-200 shadow-lg transition-all duration-200 hover:scale-105">
            <div className="h-5/6 cursor-pointer">
                <img src={image} alt={name} className="rounded-t object-fill w-full h-full" />
            </div>
            <div className="flex justify-between p-2">
                <span className="font-bold">{name}</span>
                <div className="flex gap-2">
                    <div> <BaseNbSelect ref={refNbProduct} /> </div>
                    <BaseButton onClick={() => localStorage.removeItem("product")} className="h-7 px-1 py-0 flex items-center" variant="primary" label="Remove" />
                    <BaseButton onClick={addToCard} className="h-7 px-1 py-0 flex items-center" variant="primary" label="Ajouter" />
                </div>
            </div>
        </div>
    )
}
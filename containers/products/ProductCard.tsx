"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { FunctionComponent, use, useEffect, useRef, useState } from "react";
import logo404 from '../../images/404.webp';

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

    /**
     * Prix du produit
     */
    price: number;

    /**
     * Fonction de mise à jour du panier
     */
    onUpdateCart: (n: any) => void;
}

export const ProductCard: FunctionComponent<ProductCardProps> = ({id, name, image, price, onUpdateCart}) => {
    const refNbProduct = useRef<HTMLSelectElement>(null);
    const [imageProduct, setImageProduct] = useState<string>("");

    useEffect(() => {
        if (image == "") {
            setImageProduct(logo404.src);
        } else {
            setImageProduct(logo404.src);
        }
    }, []);

    const addToCard = () => {
        if (!refNbProduct.current) return;
        onUpdateCart(true);
        let nbProduct = refNbProduct.current.value;
        let product = {
            id: id,
            name: name,
            nbProduct: nbProduct,
            price: price
        }
        if (localStorage.getItem("product")) {
            let products = JSON.parse(localStorage.getItem("product") as string);

            for (let i = 0; i < products.length; i++) {
                if (products[i].id == id) {
                    products[i].nbProduct = parseInt(products[i].nbProduct) + parseInt(nbProduct);
                    localStorage.setItem("product", JSON.stringify(products));
                    return;
                }
            }
            products.push(product);
            localStorage.setItem("product", JSON.stringify(products));
        } else {
            let products = [];
            products.push(product);
            localStorage.setItem("product", JSON.stringify(products)); 
        }
    }
    
    console.log(imageProduct);

    return (
        <div className="w-64 h-60 rounded bg-zinc-200 shadow-lg transition-all duration-200 hover:scale-105">
            <div className="h-5/6 cursor-pointer">
                <a href={`/products/${id}`}>
                    <img src={imageProduct} alt={name} className="rounded-t object-cover w-full h-full" />
                </a>
            </div>
            <div className="flex justify-between p-2">
                <span className="font-bold">{name}</span>
                <div className="flex gap-2">
                    <div> <BaseNbSelect ref={refNbProduct} /> </div>
                    <BaseButton onClick={addToCard} 
                    className="h-7 px-1 py-0 flex items-center" variant="primary" label="Ajouter" />
                </div>
            </div>
        </div>
    )
}
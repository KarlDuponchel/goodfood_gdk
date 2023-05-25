"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { FunctionComponent, use, useEffect, useRef, useState } from "react";
import logo404 from '../../images/404.webp';
import logoB from '../../images/burger.jpg';

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

    /**
     * Fonction d'ajout au panier
     * @returns 
     */
    const addToCard = () => {
        if (!refNbProduct.current) return;
        onUpdateCart(true);
        let nbProduct = refNbProduct.current.value;
        let product = {
            id: id,
            name: name,
            nbProduct: nbProduct,
            price: price,
            image: imageProduct
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

    /**
     * Formate le nom du produit
     * @param name Nom du produit
     */
    const formatProductName = (name: string) => {
        if (name.length > 15) {
            return name.substring(0, 15) + "...";
        }
        return name;
    }

    return (
        <div className="w-64 h-fit-content rounded bg-zinc-200 shadow-lg transition-all duration-200 hover:scale-105">
            <div className="h-5/6 cursor-pointer relative">
                <a href={`/products/${id}`}>
                    <img src={imageProduct} alt={name} className="rounded-t object-cover w-full h-full" />
                </a>
                <span className="absolute -top-2 -right-4 font-bold p-1 rounded-full grid place-items-center bg-primary text-black">{price}€</span> 
            </div>
            <div className="flex flex-col p-2 gap-2">
                <div className="flex justify-between">
                    <span className="font-bold" title={name}>{formatProductName(name)}</span>
                    <div className="flex gap-2">
                        <div> <BaseNbSelect ref={refNbProduct} /> </div>
                        <BaseButton onClick={addToCard} 
                        className="h-7 px-1 py-0 flex items-center" variant="primary" label="Ajouter" />
                    </div>
                </div>
            </div>
        </div>
    )
}
'use client';

import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CardProduct, Product } from "@/utils/types";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { useAuth } from "@/hooks/useAuth";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { updateBasket } from "@/services/Basket";
import { useToast } from "@/components/ui/use-toast";

export type ProductBasketProps = {
    /**
     * Le produit
     */
    productSent: CardProduct;

    /**
     * Permet d'envoyer au container parent un booleen pour actualiser les données
     * @param n any
     * @returns void
     */
    onUpdateCart: (n: any) => void;
}

export const ProductBasket: FunctionComponent<ProductBasketProps> = ({
    productSent, onUpdateCart,
}) => {

    const { user, status } = useAuth();
    const { toast } = useToast()

    //Ref
    const refBaseNbSelect = useRef<HTMLSelectElement>(null);

    const [adresseClient, setAdresseClient] = useState<string>("");
    const product = useFetchProductByID(productSent.idContent);
    const restaurant = useFetchRestaurantById(product.data && product.data?.id_restaurant ? product.data.id_restaurant : -1)
    const basket = useFetchBasketByUserID(user ? user._id : "");

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
        let products: CardProduct[] = JSON.parse(localStorage.getItem("product") as string);
        onUpdateCart(true);
        for (let i = 0; i < products.length; i++) {
            if (products[i].idContent == id) {
                products.splice(i, 1);
                localStorage.setItem("product", JSON.stringify(products));
                toast({
                    title: "Produit supprimé",
                    description: `Le produit a été supprimé du panier`
                })
                return;
            }
        }
    }

    const deleteFromBasket = (id: number) => {
        if (!basket.data) return;
        const products = basket.data.products
        onUpdateCart(true)
        for (let i = 0; i < products.length; i++) {
            if (products[i].idContent === id) {
                basket.data.products.splice(i, 1);
                updateBasket(basket.data).then(() => {
                    toast({
                        title: "Produit supprimé",
                        description: `Le produit a été supprimé du panier`
                    })
                })
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
        let products: CardProduct[] = JSON.parse(localStorage.getItem("product") as string);
        onUpdateCart(true);
        for (let i = 0; i < products.length; i++) {
            if (products[i].idContent == id) {
                console.log(refBaseNbSelect.current?.value);
                products[i].quantity = Number(refBaseNbSelect.current.value);
                localStorage.setItem("product", JSON.stringify(products));
                return;
            }
        }
    }

    const updateQuandityBasket = (id: number) => {
        if (!refBaseNbSelect.current || !basket.data) return;
        onUpdateCart(true);

        const products = basket.data.products

        for (let i = 0; i < products.length; i++) {
            if (products[i].idContent === id) {
                basket.data.products[i].quantity = Number(refBaseNbSelect.current.value);
                updateBasket(basket.data).then(() => {
                    toast({
                        title: "Produit mis à jour",
                        description: `Le produit a été modifié`
                    })
                })
                return;
            }
        }
    }
    
    return (
        <div className="w-full border-b border-zinc-300 mt-3">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="mb-2">
                        <a href={`/products/${productSent.idContent}`} >
                            <Image alt="Image produit" src={"/images/burger.jpg"} className="w-16 h-16 bg-center rounded-full" width={45} height={45}  />
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-extrabold">{restaurant.data?.name} - {productSent.contentName} ({product.data?.price}€)</span>
                        {adresseClient ? (
                            <span>Livraison au {adresseClient}</span>
                        ) : (
                            <span>Veuillez renseigner votre adresse</span>
                        )}
                    </div>
                </div>
                <div className="relative flex flex-col items-end gap-3">
                    <div className="flex gap-1">
                        <BaseNbSelect ref={refBaseNbSelect} onChange={() => status === 1 ? updateQuandityBasket(product.data && product.data.ID ? product.data.ID : -1) : updateNbProducts(productSent.idContent)} defaultValue={productSent.quantity}/>
                        <TrashIcon className="absolute cursor-pointer w-6 text-red-500 -right-7 top-10" onClick={() => status === 1 ? deleteFromBasket(product.data && product.data.ID ? product.data.ID : -1) : deleteFromCart(productSent.idContent)} />
                    </div>
                    <span className="font-black text-lg">{product.data && (Number(productSent.quantity) * product.data?.price).toFixed(2)}€</span>
                </div>
            </div>
        </div>
    )
}
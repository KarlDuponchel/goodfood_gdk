"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { useToast } from "@/components/ui/use-toast";
import { useFetchAllProducts } from "@/hooks/catalog/use_fetch_all_products"
import { FunctionComponent, useRef } from "react";
import logo404 from '../../images/404.webp';
import { Product } from "@/utils/types";
import Image from "next/image";
import { ToastAction } from "@radix-ui/react-toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type ProductsCardProps = {
    /**
     * Numéro de page
     */
    page: number,

    /**
     * Limite d'objets retournés
     */
    limit: number,

    /**
     * Afficher plus ?
     */
    showMore: boolean,

    /**
     * Met à jour le nb de produits du panier
     * @param n Booleen
     * @returns 
     */
    onUpdateCart: (n: boolean) => void;
}

export const ProductsCards: FunctionComponent<ProductsCardProps> = ({
    page, limit, showMore, onUpdateCart
}) => {

    const products = useFetchAllProducts(page, limit);

    const { toast } = useToast();
    const router = useRouter();

    const refNbProduct = useRef<HTMLSelectElement>(null);

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

    /**
     * Fonction d'ajout au panier
     * @returns 
     */
    const addToCard = (product: Product) => {
        if (!refNbProduct.current) return;
        onUpdateCart(true)
        let nbProduct = refNbProduct.current.value;
        let productSent = {
            id: product.id,
            id_restaurant: product.id_restaurant,
            name: product.name,
            nbProduct: nbProduct,
            price: product.price,
            image: logo404.src
        }

        if (localStorage.getItem("product")) {
            let products = JSON.parse(localStorage.getItem("product") as string);

            for (let i = 0; i < products.length; i++) {
                if (products[i].id == product.id) {
                    products[i].nbProduct = parseInt(products[i].nbProduct) + parseInt(nbProduct);
                    localStorage.setItem("product", JSON.stringify(products));
                    return;
                }
            }
            products.push(productSent);
            localStorage.setItem("product", JSON.stringify(products));
        } else {
            let products = [];
            products.push(productSent);
            localStorage.setItem("product", JSON.stringify(products)); 
        }
        toast({
            title: "Produit ajouté au panier !",
            description: `${productSent.nbProduct} ${product.name} ${Number(productSent.nbProduct) > 1 ? "ont été ajoutés" : "a été ajouté"} au panier avec succès !`,
            action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
        })
    }

    return (
        <>
            <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 place-items-center gap-6'>
                {products.isLoading && (
                    <div>
                        Chargement...
                    </div>
                )}
                
                {products.data?.pages.map((page) => {
                    return page.data.map((product: Product) => {
                        return (
                            <div key={product.id} className="w-64 h-fit-content rounded bg-zinc-200 shadow-lg transition-all duration-200 hover:scale-105">
                                <div className="h-5/6 cursor-pointer relative w-full">
                                    <a href={`/products/${product.id}`}>
                                        <Image src={logo404.src} alt={product.name} className="rounded-t object-cover w-full h-full" width={500} height={500} />
                                    </a>
                                    <span className="absolute -top-2 -right-4 font-bold p-1 rounded-full grid place-items-center bg-primary text-black">{product.price}€</span> 
                                </div>
                                <div className="flex flex-col p-2 gap-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold" title={product.name}>{formatProductName(product.name)}</span>
                                        <div className="flex gap-2">
                                            <div> <BaseNbSelect ref={refNbProduct} /> </div>
                                            <BaseButton onClick={() => addToCard(product)} 
                                            className="h-7 px-1 py-0 flex items-center hover:opacity-80" variant="primary" label="Ajouter" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    )
                })}
            </div>
            <div>
                {products.hasNextPage && showMore && (
                    <div className="flex justify-center py-8">
                        <BaseButton
                        variant="primary"
                        onClick={() => products.fetchNextPage()}
                        disabled={products.isLoading}
                        label="Charger plus"
                        >
                        </BaseButton>
                    </div>
                )}
            </div>  
        </>
    )
}
"use client";

import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { useToast } from "@/components/ui/use-toast";
import { useFetchAllProducts } from "@/hooks/catalog/use_fetch_all_products"
import { FunctionComponent, useRef, useState } from "react";
import { Basket, CardProduct, Product } from "@/utils/types";
import Image from "next/image";
import { ToastAction } from "@radix-ui/react-toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { createBasket, updateBasket } from "@/services/Basket";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { useAuth } from "@/hooks/useAuth";

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

    const { status, user } = useAuth();

    const products = useFetchAllProducts(page, limit);
    const basket = useFetchBasketByUserID(user ? user._id : "");

    const { toast } = useToast();
    const router = useRouter();

    const refNbProduct = useRef<HTMLSelectElement>(null);

    const [nbProduct, setNbProduct] = useState(1);

    const updateNbProduct = (event: any) => {
        setNbProduct(event.target.value)
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

    /**
     * Fonction d'ajout au panier
     * @returns 
     */
    const addToCard = (product: Product) => {
        onUpdateCart(true)
        let productSent: CardProduct = {
            idContent: product.id,
            contentName: product.name,
            quantity: nbProduct,
        }
        if (localStorage.getItem("product")) {
            let products: CardProduct[] = JSON.parse(localStorage.getItem("product") as string);
            for (let i = 0; i < products.length; i++) {
                if (products[i].idContent == product.id) {
                    products[i].quantity = products[i].quantity + nbProduct;
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
            description: `${productSent.quantity} ${product.name} ${Number(productSent.quantity) > 1 ? "ont été ajoutés" : "a été ajouté"} au panier avec succès !`,
            action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
        })
    }

    const addToBasket = (product: Product) => {
        if (!user) return;
        const productObject: Basket = {
            userId: user._id,
            products: [{
                idContent: product.id,
                contentName: product.name,
                quantity: nbProduct
            }]
        }

        const contentObject = {
            idContent: product.id,
            contentName: product.name,
            quantity: nbProduct
        }

        if (basket.data) {
            for (let i = 0; i < basket.data.products.length; i++) {
                if (basket.data.products[i].idContent == product.id) {
                    basket.data.products[i].quantity += nbProduct;
                    updateBasket(basket.data).then(() => {
                        toast({
                            title: "Produit mis à jour",
                            description: `${nbProduct} ${product.name} ${nbProduct > 1 ? "ajoutés" : "ajouté"} au panier`,
                            action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
                        })
                    })
                    return;
                }
            }

            const newProducts: Basket = {
                userId: user._id,
                products: basket.data.products
            };

            newProducts.products.push(contentObject)

            updateBasket(newProducts).then(() => {
                toast({
                    title: "Produit ajouté",
                    description: `${nbProduct} ${product.name} ${nbProduct > 1 ? "ajoutés" : "ajouté"} au panier`,
                    action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
                })
            })
        } else {
            createBasket(productObject).then(() => {
                toast({
                    title: "Produit ajouté",
                    description: `${nbProduct} ${product.name} ${nbProduct > 1 ? "ajoutés" : "ajouté"} au panier`,
                    action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
                })
            })
        }
        /*createBasket(productObject).then(() => {
            toast({
                title: "Produit ajouté",
                description: `${refNbProduct.current?.value} ${product.name} ${Number(refNbProduct.current?.value) > 1 ? "ajoutés" : "ajouté"} au panier`
            })
        })*/
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
                                        <Image src={"/images/burger.jpg"} alt={product.name} className="rounded-t object-cover w-full h-full" width={500} height={500} />
                                    </a>
                                    <span className="absolute -top-2 -right-4 font-bold p-1 rounded-full grid place-items-center bg-primary text-black">{product.price}€</span> 
                                </div>
                                <div className="flex flex-col p-2 gap-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold" title={product.name}>{formatProductName(product.name)}</span>
                                        <div className="flex gap-2">
                                            <div> <BaseNbSelect onChange={updateNbProduct} /> </div>
                                            <BaseButton onClick={() => {status === 1 ? addToBasket(product) : addToCard(product)}} 
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
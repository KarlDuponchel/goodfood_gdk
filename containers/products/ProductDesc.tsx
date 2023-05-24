import { FunctionComponent, useEffect, useRef, useState } from "react";
import logoBurger from "../../images/burger.jpg";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { getProductById } from "@/services/Product";
import logo404 from '../../images/404.webp';

export type ProductDescProps = {
    /**
     * Product id
     */
    id: number;
}

export const ProductDesc: FunctionComponent<ProductDescProps> = ({id}) => {
    //Ref
    const refNbProduct = useRef<HTMLSelectElement>(null);
    
    //Constantes
    const [showComposition, setShowComposition] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(false);

    //getProduct avec l'id, quand y'a les APIs
    const [product, setProduct] = useState<any>();
    const [imageProduct, setImageProduct] = useState<string>("");

    useEffect(() => {
        getProductById(id).then((product) => { setProduct(product) });
    }, [])

    //Ajouter au panier
    const addToCard = () => {
        if (!refNbProduct.current) return;

        let nbProduct = refNbProduct.current.value;
        let product = {
            //Mettre à jour avec les champs du plat
            id: id,
            name: "Le Cheeseburger",
            nbProduct: nbProduct,
            price: 14.99
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

    const handleShowComposition = () => {
        setShowComposition(!showComposition);
    }

    const handleShowDescription = () => {
        setShowDescription(!showDescription);
    }

    if (!product) return (<div>Chargement...</div>)

    return (
        <div className="w-3/4 h-96 bg-zinc-200 rounded-md flex shadow-lg">
            <div className="w-1/3 h-full">
                <img src={logoBurger.src} className="w-full h-full object-cover rounded-l-md" />
            </div>
            <div className="w-2/4 h-full flex flex-col pt-5 pl-10">
                <div className="w-full flex justify-between font-black text-lg">
                    <span>{product.name}</span>
                    <span>{product.price}€</span>
                </div>
                <div className="w-full text-sm">
                    <span>{/*Nom et adresse du restaurant*/}
                        BurgCity - 6 rue de la République, 76000 Rouen
                    </span>
                </div>
                <div className="flex justify-between pt-8">
                    <span className="font-bold">Composition du produit</span>
                    {showComposition ? <ChevronUpIcon className="w-5 cursor-pointer" onClick={() => setShowComposition(!showComposition)} /> : <ChevronDownIcon className="w-5 cursor-pointer" onClick={handleShowComposition} />} 
                </div>
                {showComposition && (
                    /*Avec les infos produits*/
                    <div className={`w-full pl-8 transition-all ease-in-out`}>    
                        <ul className="list-disc">
                            <li>Pain sésame complet français</li>
                            <li>Burger boeuf 30% MG</li>
                            <li>Bacon</li>
                            <li>Salade fraîche</li>
                            <li>Tomate fraîche</li>
                        </ul>
                    </div>
                )}
                <div className="flex justify-between pt-2">
                    <span className="font-bold">Description</span>
                    {showDescription ? <ChevronUpIcon className="w-5 cursor-pointer" onClick={() => setShowDescription(!showDescription)} /> : <ChevronDownIcon className="w-5 cursor-pointer" onClick={handleShowDescription} />} 
                </div>
                {showDescription && (
                    /*Avec la description du produit*/
                    <div className={`w-full pl-4 pt-2 transition-all ease-in-out`}>    
                        <span>{product.description}</span>
                    </div>
                )}
            </div>
            <div className="w-1/6 h-full p-4">
                <div className="w-full h-full flex justify-center items-end">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-end">
                            <BaseNbSelect ref={refNbProduct} className="justify-end" />
                        </div>
                        <BaseButton className="w-full" label="Commander" onClick={addToCard} variant="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}
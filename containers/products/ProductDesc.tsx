import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { getIngredientById, getIngredientsByProduct, getProductById } from "@/services/Product";
import logo404 from '../../images/404.webp';
import { useToast } from "@/components/ui/use-toast";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export type ProductDescProps = {
    /**
     * Product id
     */
    id: number;

    /**
     * Fonction de mise à jour du panier
     */
    onUpdateCart: (n: any) => void;
}

export const ProductDesc: FunctionComponent<ProductDescProps> = ({id, onUpdateCart}) => {
    /**
     * Notifications
     */
    const { toast } = useToast();

    //Ref
    const refNbProduct = useRef<HTMLSelectElement>(null);

    //Constantes
    const [product, setProduct] = useState<any>();
    const [ingredientsIds, setIngredientsIds] = useState<any[]>([]);
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [imageProduct, setImageProduct] = useState<string>("");

    //Animations
    const [rotateDesc, setRotateDesc] = useState<string>("");
    const [rotateComp, setRotateComp] = useState<string>("");

    //Affichage
    const [showComposition, setShowComposition] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(false);

    /**
     * Récupère les informations du produit et les ingrédients
     */
    useEffect(() => {
        setIngredients([]);
        getProductById(id).then((product) => { setProduct(product) });
        getIngredientsByProduct(id).then((ingredients) => { setIngredientsIds(ingredients.data) });
    }, [id])

    /**
     * Récupère les informations des ingrédients
     */
    useEffect(() => {
        if (!ingredientsIds || ingredientsIds.length == 0) return;
        console.log(ingredientsIds);
        let ingredientsToPush: any[] = [];
        for (let i = 0; i < ingredientsIds.length; i++) {
            getIngredientById(ingredientsIds[i].id_ingredient).then((ingredient) => {
                ingredientsToPush.push(ingredient);
            });
        }
        console.log(ingredientsToPush)
        setIngredients(ingredientsToPush);
    }, [ingredientsIds])

    useEffect(() => {
        if (!product) return;
        if (product.image == "") {
            setImageProduct(logo404.src);
        } else {
            setImageProduct(logo404.src);
        }
    }, [product]);

    /**
     * Gère l'affichage de la composition, et les animations
     */
    const handleShowComposition = () => {
        setShowComposition(!showComposition);
        if (showComposition) {
            setRotateComp("transform rotate-0");
        } else {
            setRotateComp("transform rotate-180");
        }
        if (showDescription) {
            setShowDescription(false);
            setRotateDesc("transform rotate-0");
        }
    }

    /**
     * Gère l'affichage de la description, et les animations
     */
    const handleShowDescription = () => {
        setShowDescription(!showDescription);
        if (showDescription) {
            setRotateDesc("transform rotate-0");
        } else {
            setRotateDesc("transform rotate-180");
        }
        if (showComposition) {
            setShowComposition(false);
            setRotateComp("transform rotate-0");
        }
    }

    /**
     * Gère l'ajout au panier
     * @returns 
     */
    const addToCard = () => {
        if (!refNbProduct.current || !product) return;
        onUpdateCart(true);
        let nbProduct = refNbProduct.current.value;
        console.log(product.price);
        let productToAdd = {
            //Mettre à jour avec les champs du plat
            id: id,
            name: product.name,
            nbProduct: nbProduct,
            price: product.price,
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
            products.push(productToAdd);
            localStorage.setItem("product", JSON.stringify(products));
        } else {
            let products = [];
            products.push(productToAdd);
            localStorage.setItem("product", JSON.stringify(products)); 
        }
        toast({
            title: "Produit ajouté au panier",
            description: `${productToAdd.nbProduct} ${productToAdd.name} ${Number(productToAdd.nbProduct) > 1 ? "ont été ajoutés" : "a été ajouté"} au panier avec succès !`
        })
    }

    if (!product || !ingredientsIds || !ingredients) return (<div>Chargement...</div>)

    return (
        <div className="w-3/4 h-96 max-lg:h-fit bg-zinc-200 rounded-md flex max-lg:flex-col shadow-lg">
            <div className="w-1/3 h-full max-lg:w-full">
                <Image src={imageProduct} alt="Image du produit" width={500} height={500} className="w-full h-full object-cover rounded-l-md" />
            </div>
            <div className="w-2/4 h-full flex flex-col pt-5 pl-10 max-lg:w-full max-lg:pr-10">
                <div className="w-full flex justify-between font-black text-lg">
                    <span>{product.name}</span>
                    <span>{product.price}€</span>
                </div>
                <div className="w-full text-sm">
                    <span className="bg-red-500">{/*Nom et adresse du restaurant*/}
                        BurgCity - 6 rue de la République, 76000 Rouen
                    </span>
                </div>
                <div className="flex justify-between pt-8 cursor-pointer hover:underline" onClick={handleShowComposition}>
                    <span className="font-bold">Composition du produit</span>
                    <ChevronDownIcon className={`w-5 ${rotateComp} transition-all duration-300`} />
                </div>
                {showComposition && (
                    /*Avec les infos produits*/
                    <div className={`w-full pl-8 transition-all ease-in-out`}>
                        {ingredients.map((ingredient, key) => (
                            <ul key={key} className="list-disc">
                                <li>{ingredient.name}</li>
                            </ul>
                            )
                        )}       
                    </div>
                )}
                <div className="flex justify-between pt-4 cursor-pointer hover:underline" onClick={handleShowDescription}>
                    <span className="font-bold">Description</span>
                    <ChevronDownIcon className={`w-5 cursor-pointer ${rotateDesc} transition-all duration-300`} />
                </div>
                {showDescription && (
                    <div className={`w-4/6 pl-4 transition-all duration-300 ease-in-out`}>    
                        <span>{product.description}</span>
                    </div>
                )}
            </div>
            <div className="w-1/6 max-lg:w-full h-full p-4">
                <div className="h-full flex justify-center items-end max-lg:justify-end">
                    <div className="w-full flex flex-col gap-2 max-lg:w-auto">
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
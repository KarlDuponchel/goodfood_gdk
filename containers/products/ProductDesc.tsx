import { FunctionComponent, useEffect, useRef, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { getIngredientById } from "@/services/Product";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { useFetchIngredientsIdsByProductID } from "@/hooks/catalog/use_fetch_ingredients_by_product";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Basket, CardProduct, Product } from "@/utils/types";
import { createBasket, updateBasket } from "@/services/Basket";
import { useFetchOrderById } from "@/hooks/order/use_fetch_order_by_id";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";

export type ProductDescProps = {
    /**
     * Product id
     */
    id: number;

    /**
     * Fonction de mise à jour du panier
     */
    onUpdateCart: (n: boolean) => void;
}

export const ProductDesc: FunctionComponent<ProductDescProps> = ({id, onUpdateCart}) => {

    const { status, user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    //Ref
    const refNbProduct = useRef<HTMLSelectElement>(null);

    //Appels API
    const product = useFetchProductByID(id)
    const ingredientsIds = useFetchIngredientsIdsByProductID(id).data;
    const restaurant = useFetchRestaurantById(product.data?.id_restaurant ?? -1)
    const basket = useFetchBasketByUserID(user ? user._id : "");

    //Constantes
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [imageProduct, setImageProduct] = useState<string>("");

    //Animations
    const [rotateDesc, setRotateDesc] = useState<string>("");
    const [rotateComp, setRotateComp] = useState<string>("");

    //Affichage
    const [showComposition, setShowComposition] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(false);


    /**
     * Récupère les informations des ingrédients
     */
    useEffect(() => {
        if (!ingredientsIds) return;

        let ingredientsToPush: any[] = [];
        for (let i = 0; i < ingredientsIds.data.length; i++) {
            const idIngredient = ingredientsIds.data[i].id_ingredient;
            getIngredientById(idIngredient).then((ingredient) => {
                ingredientsToPush.push(ingredient);
            });
        }
        setIngredients(ingredientsToPush);
    }, [ingredientsIds])

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
        let productToAdd: CardProduct = {
            idContent: id,
            contentName: product.data?.name ?? "",
            quantity: Number(nbProduct),
        }

        if (localStorage.getItem("product")) {
            let products: CardProduct[] = JSON.parse(localStorage.getItem("product") as string);

            for (let i = 0; i < products.length; i++) {
                if (products[i].idContent == id) {
                    products[i].quantity = products[i].quantity + parseInt(nbProduct);
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
            description: `${productToAdd.quantity} ${productToAdd.contentName} ${Number(productToAdd.quantity) > 1 ? "ont été ajoutés" : "a été ajouté"} au panier avec succès !`,
            action: <ToastAction altText="Panier" className="border border-primary p-1 rounded hover:bg-zinc-200 transition" onClick={() => router.push("/basket")}>Panier</ToastAction>
        })
    }

    const addToBasket = (product: Product) => {
        if (!user) return;
        const productObject: Basket = {
            userId: user._id,
            products: [{
                idContent: product.ID,
                contentName: product.name,
                quantity: Number(refNbProduct.current?.value)
            }]
        }

        const contentObject = {
            idContent: product.ID,
            contentName: product.name,
            quantity: Number(refNbProduct.current?.value)
        }

        if (basket.data) {
            for (let i = 0; i < basket.data.products.length; i++) {
                if (basket.data.products[i].idContent == product.ID) {
                    basket.data.products[i].quantity += Number(refNbProduct.current?.value);
                    updateBasket(basket.data).then(() => {
                        toast({
                            title: "Produit mis à jour",
                            description: `${refNbProduct.current?.value} ${product.name} ${Number(refNbProduct.current?.value) > 1 ? "ajoutés" : "ajouté"} au panier`
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
                    description: `${refNbProduct.current?.value} ${product.name} ${Number(refNbProduct.current?.value) > 1 ? "ajoutés" : "ajouté"} au panier`
                })
            })
        } else {
            createBasket(productObject).then(() => {
                toast({
                    title: "Produit ajouté",
                    description: `${refNbProduct.current?.value} ${product.name} ${Number(refNbProduct.current?.value) > 1 ? "ajoutés" : "ajouté"} au panier`
                })
            })
        }
    }

    if (!product.data || !ingredientsIds?.data || !ingredients || !restaurant.data) return (<div>Chargement...</div>)

    return (
        <div className="w-3/4 h-96 max-lg:h-fit bg-zinc-200 rounded-md flex max-lg:flex-col shadow-lg">
            <div className="w-1/3 h-full max-lg:w-full">
                <Image src={"/images/burger.jpg"} alt="Image du produit" width={500} height={500} className="w-full h-full object-cover rounded-l-md" />
            </div>
            <div className="w-2/4 h-full flex flex-col pt-5 pl-10 max-lg:w-full max-lg:pr-10">
                <div className="w-full flex justify-between font-black text-lg">
                    <span>{product.data?.name}</span>
                    <span>{product.data?.price}€</span>
                </div>
                <div className="w-full text-sm">
                    <span>
                        {`${restaurant.data?.name} - ${restaurant.data?.address}, ${restaurant.data?.zip_code} ${restaurant.data?.city}`}
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
                        <span>{product.data?.description}</span>
                    </div>
                )}
            </div>
            <div className="w-1/6 max-lg:w-full h-full p-4">
                <div className="h-full flex justify-center items-end max-lg:justify-end">
                    <div className="w-full flex flex-col gap-2 max-lg:w-auto">
                        <div className="w-full flex justify-end">
                            <BaseNbSelect ref={refNbProduct} className="justify-end" />
                        </div>
                        <BaseButton className="w-full" label="Commander" onClick={() => {status === 1 ? addToBasket(product.data) : addToCard()}} variant="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}
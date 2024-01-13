"use client";

import { FormEvent, useEffect, useState } from "react";
import { Popup } from "@/components/blocks/Popup";
import { PopupInput } from "@/components/blocks/PopupInput";
import { BaseButton } from "@/components/button/Button";
import { useToast } from "@/components/ui/use-toast";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { ProductBasket } from "@/containers/products/ProductBasket";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { useAuth } from "@/hooks/useAuth";
import { createBasket } from "@/services/Basket";
import { apiFetch } from "@/utils/fetch";
import { CardProduct, Product } from "@/utils/types";
import { useRouter } from "next/navigation";

export const BasketPage = () => {
  const router = useRouter();

  const { toast } = useToast();
  const { user, status } = useAuth();

  const basket = useFetchBasketByUserID(user ? user._id : "");

  //Constantes pour modal Popup
  const [ouvrir, setOuvrir] = useState(false);
  const [ouvrirInput, setOuvrirInput] = useState(false);

  const [inputDialog, setInputDialog] = useState("");

  const [totalPrice, setTotalPrice] = useState("");

  const open = (event: FormEvent) => {
    event.preventDefault();
    setOuvrir(true);
  };

  const openInput = (event: FormEvent) => {
    event.preventDefault();
    setOuvrirInput(true);
  };

  const fermer = () => {
    setOuvrir(false);
    setOuvrirInput(false);
  };

  const getInputDialog = (n: string) => {
    setInputDialog(n);
  };

  useEffect(() => {
    localStorage.setItem("email", inputDialog);
  }, [inputDialog]);

  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

  const [cardProducts, setCardProducts] = useState<CardProduct[]>([]);
  const [adresseClient, setAdresseClient] = useState<string>("");
  const [loading, setLoading] = useState<string>("pulse");

  useEffect(() => {
    if (localStorage.getItem("product")) {
      setCardProducts(JSON.parse(localStorage.getItem("product") as string));
    }
    if (localStorage.getItem("address")) {
      setAdresseClient(localStorage.getItem("address") as string);
    }
    setLoading("none");
  }, [updateShoppingCart]);

  /**
   * Met à jour les différentes données
   * @param n any
   */
  const toogleFromChild = (n: any) => {
    if (!updateShoppingCart) {
      setUpdateShoppingCart(n);
    } else {
      setUpdateShoppingCart(!n);
    }
  };

  // Définir la fonction getTotalPrice
  const getTotalPrice = async () => {
    let total = 0;

    if (basket.data && basket.data.products.length > 0) {
      // Utilisation de Promise.all pour attendre toutes les promesses
      await Promise.all(
        basket.data.products.map(async (product) => {
          const value = await apiFetch<Product>(
            `/catalog/products/${product.idContent}`,
          );
          total += product.quantity * value.price;
        }),
      );
    }

    // Retourner le total directement en tant que nombre
    return total.toFixed(2);
  };

  const confirmCommand = () => {
    if (adresseClient == "") {
      setOuvrir(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez renseigner votre adresse de livraison",
      });
    } else {
      if (user) {
        router.push("/validate");
      } else {
        const products = cardProducts.map((val) => {
          return {
            idContent: val.idContent,
            contentName: val.contentName,
            quantity: val.quantity,
          };
        });
        const orderBody = {
          userId: inputDialog,
          products: products,
        };
        createBasket(orderBody).then(() => {
          router.push("/validate");
        });
      }
    }
  };

  if (!cardProducts) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header toogle={updateShoppingCart} />
      <div
        className={`flex min-h-screen flex-col gap-8 p-6 animate-${loading}`}
      >
        <div className="flex justify-between text-lg font-bold">
          <span>
            Votre <span className="text-primary">panier</span>
          </span>
        </div>
        {status !== 1 ? (
          cardProducts.length == 0 ? (
            <div className="flex w-full animate-pulse flex-col items-center justify-center text-4xl">
              Votre panier est vide
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="flex h-3/4 w-4/6 flex-col max-md:w-5/6 max-sm:w-11/12">
                {cardProducts.map((product) => {
                  return (
                    <ProductBasket
                      key={product.idContent}
                      productSent={product}
                      onUpdateCart={toogleFromChild}
                    />
                  );
                })}
                <div className="mt-10 flex justify-end gap-3">
                  <div className="flex w-2/12 flex-col gap-2 max-lg:w-1/4 max-md:w-1/3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">15€</span>
                    </div>
                    <div className="">
                      <BaseButton
                        className="w-full transition-all duration-75 hover:scale-105"
                        onClick={openInput}
                        variant="primary"
                        label="Confirmer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (basket.data && basket.data.products.length === 0) ||
          !basket.data?.products ? (
          <div className="flex w-full animate-pulse flex-col items-center justify-center text-4xl">
            Votre panier est vide
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="flex h-3/4 w-4/6 flex-col max-md:w-5/6 max-sm:w-11/12">
              {basket.data?.products.map((product) => {
                return (
                  <ProductBasket
                    key={product.idContent}
                    productSent={product}
                    onUpdateCart={toogleFromChild}
                  />
                );
              })}
              <div className="mt-10 flex justify-end gap-3">
                <div className="flex w-2/12 flex-col gap-2 max-lg:w-1/4 max-md:w-1/3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="bg-red-500 font-bold">A FAIRE €</span>
                  </div>
                  <div className="">
                    <BaseButton
                      className="w-full transition-all duration-75 hover:scale-105"
                      onClick={open}
                      variant="primary"
                      label="Confirmer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {basket.data && basket.data.products ? (
          <Popup
            btnLbl="Commander"
            title="Confirmation de commande"
            content={`Souhaitez-vous vraiment commander ${basket.data.products.length} article(s) ?`}
            ouvrir={ouvrir}
            fermer={fermer}
            submit={confirmCommand}
          />
        ) : (
          <PopupInput
            btnLbl="Commander"
            title="Confirmation de commande"
            content={`Souhaitez-vous vraiment commander ${
              cardProducts.length
            } article${
              cardProducts.length > 1 ? "s" : ""
            } pour un montant de A FAIRE€ ?`}
            ouvrir={ouvrirInput}
            fermer={fermer}
            submit={confirmCommand}
            inputValue={getInputDialog}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

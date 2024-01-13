"use client";

import { FunctionComponent, useState } from "react";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { ProductDesc } from "@/containers/products/ProductDesc";
import { ProductsCards } from "@/containers/products/ProductsCards";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";

type ProductDetailPageProps = {
  idProduct: number;
};

export const ProductDetailPage: FunctionComponent<ProductDetailPageProps> = ({
  idProduct,
}) => {
  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

  const toogleFromChild = (n: any) => {
    if (!updateShoppingCart) {
      setUpdateShoppingCart(n);
    } else {
      setUpdateShoppingCart(!n);
    }
  };

  return (
    <>
      <Header toogle={updateShoppingCart} />
      <div className="flex min-h-screen flex-col gap-5 p-6">
        <div className="flex justify-between text-lg font-bold">
          <div className="">
            <a href="/" className="flex gap-2">
              <ArrowSmallLeftIcon className="w-6" />
              <span>
                Retour aux <span className="text-primary">produits</span>
              </span>
            </a>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <ProductDesc id={idProduct} onUpdateCart={toogleFromChild} />
        </div>
        <div className="mt-8 flex justify-center">
          <span className="w-10/12 text-lg font-black">
            Produits qui pourrait vous plaire
          </span>
        </div>
        <div className="flex w-full items-center justify-center">
          <ProductsCards
            page={1}
            limit={4}
            showMore={false}
            onUpdateCart={toogleFromChild}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

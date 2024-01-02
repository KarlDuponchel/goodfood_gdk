"use client";

import { useState } from "react";
import { Footer } from "../Footer"
import { Header } from "../Header"
import { ProductsCards } from "../products/ProductsCards"

export const HomePage = ({}) => {
    
    const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

    const toogleFromChild = (n: any) => {
      if (!updateShoppingCart) {
        setUpdateShoppingCart(n);
      } else {
        setUpdateShoppingCart(!n);
      }
    }

    return (
        <>
            <Header toogle={updateShoppingCart} />
                <div className='p-6 flex flex-col gap-8 min-h-screen'>
                <div className='flex justify-between relative'>
                    <span className='font-bold text-lg text-black'>Une sélection de produit, rien que <span className='text-primary'>pour vous</span></span>
                </div>
                <div className='flex flex-col gap-4'>
                    <ProductsCards page={1} limit={10} showMore onUpdateCart={toogleFromChild} />
                </div>
                </div>
            <Footer/>
        </>
    )
}
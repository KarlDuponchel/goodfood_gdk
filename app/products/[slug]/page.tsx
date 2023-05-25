'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { ProductDesc } from "@/containers/products/ProductDesc";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "@/containers/products/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/Product";

export default function Page({
    params,
  }: {
    params: { slug: number };
  }) {

    const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
  
    useEffect(() => {
        getProducts(4).then((result) => setProducts(result.data));
    }, [])

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
            <div className="p-6 flex flex-col gap-5 min-h-screen">
                <div className='flex justify-between font-bold text-lg'>
                    <div className="">
                        <a href="/" className="flex gap-2">
                          <ArrowSmallLeftIcon className='w-6'/>
                          <span>Retour aux <span className='text-primary'>produits</span></span>
                        </a>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <ProductDesc id={params.slug} onUpdateCart={toogleFromChild} />
                </div>
                <div className="flex justify-center mt-8">
                    <span className="w-10/12 font-black text-lg">Produits qui pourrait vous plaire</span>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="grid grid-cols-4 gap-4 w-3/4 place-items-center">
                      {products.map((product, key) => {
                        return (
                          <ProductCard key={key} id={product.ID} name={product.name} image={product.image} price={product.price} onUpdateCart={toogleFromChild} />
                        )
                      })}
                    </div> 
                </div>
            </div>
          <Footer/>
        </>
    );
  }
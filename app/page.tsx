'use client';

import { Footer } from '@/containers/Footer'
import { Header } from '@/containers/Header'
import { ProductCard } from '@/containers/products/ProductCard'
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import logoBurger from '../images/burger.jpg';
import logoBurger2 from '../images/burger2.jpg';
import logoPizza from '../images/pizza.jpeg';
import logoPasta from '../images/pasta.jpg';
import logoSalade from '../images/salade.jpeg';
import logo404 from '../images/404.webp';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/Product';

export default function Home() {

  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
      getProducts().then((result) => setProducts(result.data));
  }, []);

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
          <div className='flex justify-between font-bold text-lg'>
            <span>Une sélection de produit, rien que <span className='text-primary'>pour vous</span></span>
            <AdjustmentsHorizontalIcon className='cursor-pointer w-8 rounded-full p-1 transition-all duration-100 hover:bg-zinc-200' title='Filtres'/>
          </div>
          <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 place-items-center gap-6'>
            {products.map((product, key) => {
              let image = "";

              if (product.image == "") {
                image = logo404.src;
              } else {
                image = product.image;
              }

              return (
                <ProductCard key={key} id={product.ID} name={product.name} image={image} price={product.price} onUpdateCart={toogleFromChild} />
              )
            })}
          </div>
        </div>
      <Footer/>
    </>      
  )
}

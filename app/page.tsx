'use client';

import { Footer } from '@/containers/Footer'
import { Header } from '@/containers/Header'
import { ProductCard } from '@/containers/products/ProductCard'
import { AdjustmentsHorizontalIcon, XMarkIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import logo404 from '../images/404.webp';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/Product';

export default function Home() {

  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [productsToDisplay, setProductsToDisplay] = useState<any[]>([]);
  const [ascendingName, setAscendingName] = useState<boolean>(true);
  const [ascendingPrice, setAscendingPrice] = useState<boolean>(true);

  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
      getProducts().then((result) => setProducts(result.data));
  }, []);

  useEffect(() => {
    setProductsToDisplay(products);
  }, [products])

  const toogleFromChild = (n: any) => {
    if (!updateShoppingCart) {
      setUpdateShoppingCart(n);
    } else {
      setUpdateShoppingCart(!n);
    }
  }

  const sortProductsByName = (products: any[], ascending: boolean) => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      
      if (nameA < nameB) {
        return ascending ? -1 : 1;
      }
      
      if (nameA > nameB) {
        return ascending ? 1 : -1;
      }

      return 0;
    });

    return sortedProducts;
  }

  const sortProductsByPrice = (products: any[], ascending: boolean) => {
    const sortedProducts = [...products];
    
    sortedProducts.sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });
    
    return sortedProducts;
  }

  const filterProductsName = () => {
    setAscendingName(!ascendingName);
    setProductsToDisplay(sortProductsByName(productsToDisplay, ascendingName));
  }

  const filterProductsPrice = () => {
    setAscendingPrice(!ascendingPrice);
    setProductsToDisplay(sortProductsByPrice(productsToDisplay, ascendingPrice));
  }

  const resetFilter = () => {
    setProductsToDisplay(products);
  }

  if (!products) {
    return (
      <div>Chargement...</div>
    )
  }

  return (
    <>
      <Header toogle={updateShoppingCart} />
        <div className='p-6 flex flex-col gap-8 min-h-screen'>
          <div className='flex justify-between relative'>
            <span className='font-bold text-lg text-black'>Une sélection de produit, rien que <span className='text-primary'>pour vous</span></span>
            <div>
              {openFilters ? (
                <>
                  <div className='flex items-center gap-4 text-lg max-lg:hidden'>
                      <ArrowsUpDownIcon className='w-5 h-5 text-black' />
                      <span className='cursor-pointer hover:underline' onClick={filterProductsName}>Par nom</span>
                      <span className='cursor-pointer hover:underline' onClick={filterProductsPrice}>Par prix</span>
                      <span className='cursor-pointer hover:underline'>Par catégorie</span>
                      <span className='cursor-pointer hover:underline' onClick={resetFilter}>Réinitialiser</span>
                      <XMarkIcon className='w-8 h-8 p-1 rounded-full hover:bg-zinc-200 cursor-pointer' onClick={() => setOpenFilters(false)} />
                  </div>
                  <div className='max-lg:flex hidden flex-col p-1 rounded-md h-fit w-48 absolute top-0 right-0 bg-zinc-200 z-50'>
                      <div className='w-full flex items-center justify-between border-b border-zinc-300'>
                        <span className='cursor-pointer hover:underline' onClick={filterProductsName}>Par nom</span>
                        <XMarkIcon className='w-7 h-7 p-1 rounded-full hover:bg-zinc-200 cursor-pointer' onClick={() => setOpenFilters(false)} />
                      </div>
                      <span className='cursor-pointer hover:underline border-b border-zinc-300' onClick={filterProductsPrice}>Par prix</span>
                      <span className='cursor-pointer hover:underline border-b border-zinc-300'>Par catégorie</span>
                      <span className='cursor-pointer hover:underline' onClick={resetFilter}>Réinitialiser</span>
                  </div>
                </>
              ) : (
                <AdjustmentsHorizontalIcon className='cursor-pointer w-8 rounded-full p-1 transition-all duration-100 hover:bg-zinc-200 text-black' onClick={() => setOpenFilters(true)} title='Filtres'/>
              )}
            </div>
          </div>
          <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 place-items-center gap-6'>
            {productsToDisplay.map((product, key) => {
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

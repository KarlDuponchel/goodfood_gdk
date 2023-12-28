"use client";

import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/utils/types";
import { AdjustmentsHorizontalIcon, ArrowsUpDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FunctionComponent, useState } from "react";

type FilterProductsProps = {

}

export const FilterProducts: FunctionComponent<FilterProductsProps> = () => {
    const { toast } = useToast();

    const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);
    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);
    const [ascendingName, setAscendingName] = useState<boolean>(true);
    const [ascendingPrice, setAscendingPrice] = useState<boolean>(true);
  
    const toogleFromChild = (n: boolean) => {
      if (!updateShoppingCart) {
        setUpdateShoppingCart(n);
      } else {
        setUpdateShoppingCart(!n);
      }
    }
  
    const sortProductsByName = (products: Product[], ascending: boolean) => {
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
  
    const sortProductsByPrice = (products: Product[], ascending: boolean) => {
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
    
    return (
        <>
        {openFilters ? (
            <>
              <div className='flex items-center gap-4 text-lg max-lg:hidden'>
                  <ArrowsUpDownIcon className='w-5 h-5 text-black' />
                  <span className='cursor-pointer hover:underline' onClick={filterProductsName}>Par nom</span>
                  <span className='cursor-pointer hover:underline' onClick={filterProductsPrice}>Par prix</span>
                  <span className='cursor-pointer hover:underline'>Par catégorie</span>
                  <span className='cursor-pointer hover:underline' onClick={() => console.log("oui")}>Réinitialiser</span>
                  <XMarkIcon className='w-8 h-8 p-1 rounded-full hover:bg-zinc-200 cursor-pointer' onClick={() => setOpenFilters(false)} />
              </div>
              <div className='max-lg:flex hidden flex-col p-1 rounded-md h-fit w-48 absolute top-0 right-0 bg-zinc-200 z-50'>
                  <div className='w-full flex items-center justify-between border-b border-zinc-300'>
                    <span className='cursor-pointer hover:underline' onClick={filterProductsName}>Par nom</span>
                    <XMarkIcon className='w-7 h-7 p-1 rounded-full hover:bg-zinc-200 cursor-pointer' onClick={() => setOpenFilters(false)} />
                  </div>
                  <span className='cursor-pointer hover:underline border-b border-zinc-300' onClick={filterProductsPrice}>Par prix</span>
                  <span className='cursor-pointer hover:underline border-b border-zinc-300'>Par catégorie</span>
                  <span className='cursor-pointer hover:underline' onClick={() => console.log("oui")}>Réinitialiser</span>
              </div>
            </>
          ) : (
            <AdjustmentsHorizontalIcon className='cursor-pointer w-8 rounded-full p-1 transition-all duration-100 hover:bg-zinc-200 text-black' onClick={() => setOpenFilters(true)} title='Filtres'/>
          )}
          </>
    )
}
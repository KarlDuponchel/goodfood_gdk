import { Footer } from '@/containers/Footer'
import { Header } from '@/containers/Header'
import { ProductCard } from '@/containers/products/ProductCard'
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import logoBurger from '../images/burger.jpg';
import logoPizza from '../images/pizza.jpeg';
import logoPasta from '../images/pasta.jpg';
import logoSalade from '../images/salade.jpeg';

export default function Home() {

  const products: any[] = [
    {
      id: 1,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 2,
      name: 'Pizza',
      price: 9,
      image: logoPizza.src
    },
    {
      id: 3,
      name: 'Salade',
      price: 3,
      image: logoSalade.src
    },
    {
      id: 4,
      name: 'Pasta',
      price: 7,
      image: logoPasta.src
    },
    {
      id: 5,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 6,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 7,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 8,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 9,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 10,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },
    {
      id: 11,
      name: 'Burger',
      price: 5,
      image: logoBurger.src
    },

  ]

  return (
    <>
      <Header/>
        <div className='p-6 flex flex-col gap-8'>
          <div className='flex justify-between font-bold text-lg'>
            <span>Une sélection de produit, rien que <span className='text-primary'>pour vous</span></span>
            <AdjustmentsHorizontalIcon className='cursor-pointer w-8 rounded-full p-1 transition-all duration-100 hover:bg-zinc-200' title='Filtres'/>
          </div>
          <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 place-items-center gap-6'>
            {products.map((product, key) => {
              return (
                <ProductCard key={key} id={product.id} name={product.name} image={product.image} />
              )
            })}
          </div>
        </div>
      <Footer/>
    </>      
  )
}

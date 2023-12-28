import { Footer } from '@/containers/Footer'
import { Header } from '@/containers/Header'
import { ProductsCards } from '@/containers/products/ProductsCards';
import { FilterProducts } from '@/containers/home/FilterProducts';

export default function Home() {
  return (
    <>
      <Header toogle={true} />
        <div className='p-6 flex flex-col gap-8 min-h-screen'>
          <div className='flex justify-between relative'>
            <span className='font-bold text-lg text-black'>Une sélection de produit, rien que <span className='text-primary'>pour vous</span></span>
          </div>
          <div className='grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 place-items-center gap-6'>
            <ProductsCards page={1} limit={10} showMore />
          </div>
        </div>
      <Footer/>
    </>      
  )
}

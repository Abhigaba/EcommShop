import React from 'react'
import { useCart } from '../contexts/useCart'
import { useRouter } from 'next/navigation'
import DiscountHeader from './DiscountHeader'
const Header = () => {

    const {cart} = useCart()
    const itemCount = cart.length
    const router = useRouter()
    const handleCart = (e:any) => {
        e.preventDefault();
        router.push('/Cart')
    }

    const handleHome = () => {
        router.push('/')
    }
    return (
    
   <div className='fixed w-full z-10'>
        <DiscountHeader></DiscountHeader>
   <div className='flex bg-white z-10 w-full justify-center items-center py-2 shadow-sm  '>
    
    <div className='ml-auto sm:ml-[45%] cursor-pointer' onClick={() => handleHome()}>
     <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/logo@2x-free-img.png" 
    className='h-12 w-32 ml-auto '
     alt="" />
    </div>
    <div className='flex gap-3 ml-auto pr-10'>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>


    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>


    <svg xmlns="http://www.w3.org/20border-black00/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>


    <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => handleCart(e)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" cursor-pointer size-7">
        <path strokeLinecap="round"  strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    {itemCount >= 0 && (
        <span onClick={(e) => handleCart(e)} className="absolute cursor-pointer top-20 right-10 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
          {itemCount}
        </span>)}
        
    </div>
    </div>
    </div>
  )
}

export default Header
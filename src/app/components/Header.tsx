import React from 'react'
import { useCart } from '../contexts/useCart'
import { useRouter } from 'next/navigation'
import DiscountHeader from './DiscountHeader'
import { useAuth } from '../contexts/useAuth'
const Header = () => {

    const str = 'username'
    const {cart, setCart} = useCart()
    const itemCount = cart.length
    const router = useRouter()
    const {userId, setuserId} = useAuth()
    const username = JSON.parse(localStorage.getItem(str) || '')
    const handleCart = (e:any) => {
        e.preventDefault();
        router.push('/Cart')
    }

    const handleHome = () => {
        router.push('/')

    }

    const handleSignIn = () => {
        router.push('/Login')
    }

    const handleSignUp = () => {
        router.push('/Register')
    }

    const handleLogOut = () => {
        localStorage.removeItem('userId'); 
        localStorage.removeItem('username'); 
        setuserId('')
        setCart([]);
        
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
    <div className='flex gap-3 ml-auto pr-10 items-center'>

    {userId ? <>
        <button className="bg-teal-600 duration-500 hover:bg-white text-white hover:text-black rounded-2xl font-bold py-2 px-4 rounded inline-flex items-center">
    <span>Hi {username}</span>
        </button>
    <button onClick={() => handleLogOut()} className="bg-white duration-500 hover:bg-black text-black hover:text-white rounded-2xl font-bold py-2 px-4 rounded inline-flex items-center">
    <span>Log Out</span>
        </button></>
    : <><button onClick={() => handleSignUp()} className="bg-white duration-500 hover:bg-black text-black hover:text-white rounded-2xl font-bold py-2 px-4 rounded inline-flex items-center">
    <span>Sign Up</span>
        </button>
    <button onClick={() => handleSignIn()} className="bg-teal-600 duration-500 hover:bg-white text-white hover:text-black rounded-2xl font-bold py-2 px-4 rounded inline-flex items-center">
    <span>Sign In</span>
        </button></>}   

    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleHome()} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-7 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
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
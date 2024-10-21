import React, { useRef, useState, useEffect } from 'react'
import { useCart } from '../contexts/useCart'
import { useRouter } from 'next/navigation'
import DiscountHeader from './DiscountHeader'
import { useAuth } from '../contexts/useAuth'
import Link from 'next/link'
const Header = () => {

    const str = 'username'
    const {cart, setCart} = useCart()
    const itemCount = cart.length
    const router = useRouter()
    const {userId, setuserId} = useAuth()
    const storeduser = localStorage.getItem(str) || ''
    const username = storeduser ?  JSON.parse(storeduser) : ''
    const [openNav, setopenNav] = useState(false) 
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        
    })

    const handleClickOutside = (event : any) => {
        if (openNav && ref.current && !ref.current.contains(event.target) ) {
            setopenNav(false)
        }
    }
  
    const handleLogOut = () => {
        localStorage.removeItem('userId'); 
        localStorage.removeItem('username'); 
        setuserId('')
        setCart([]);
        
        router.push('/')
    } 

    const handleNav = () => {
        setopenNav(!openNav);
    }
    return (
    
   <div className='fixed w-full z-[100]'>
        <DiscountHeader></DiscountHeader>
   <div className='flex bg-white z-10  px-1 justify-between md:justify-start fold:px-3 w-full py-2 shadow shadow-white '>
    <div  className=' cursor-pointer  md:w-3/5 flex md:gap-9 gap-4 md:px-10'>
    <img src="./icon-menu.svg" onClick={() => handleNav()} className='cursor-pointer mt-3 h-4 sm:mt-5 md:hidden' alt="" />
     <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/logo@2x-free-img.png" 
    className='h-8 mt-2 fold:h-12 fold:w-32 '
     alt="" />
        {openNav && <div className='fixed inset-0 bg-gray-800 opacity-25 md:hidden'></div>}
        <div ref={ref} className={`absolute top-0 py-10 md:p-0 md:relative z-[200] md:z-[100] h-screen md:h-full bg-white md:bg-none w-2/3   transition-[left] md:transition-none duration-500 md:duration-0 ease-in md:ease-linear ${openNav ? 'left-0' : '-left-full md:left-0' } md:w-2/3   `}>
        <img src="./icon-close.svg" onClick={() => handleNav()}  alt="" className='h-4 w-4 mr-auto ml-3 md:hidden cursor-pointer'/>
        <img src="https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/logo@2x-free-img.png" 
            className='h-12 m-auto md:hidden mt-10 '
            alt="" />
        <ul className='flex flex-col  md:flex-row md:justify-start  items-end mt-10 md:mt-4 h-1/2 '>
                <li className='px-8 md:px-3 flex items-center w-full md:w-1/4 h-20 bg-gray-200 md:bg-white   border border-b-gray-300 md:border-none hover:font-semibold md:hover:font-normal hover:text-teal-600 md:hover:text-black md:h-full hover:md:underline decoration-4 decoration-teal-600  md:hover:underline-offset-[1.7rem]'>Men</li>
                <li className='px-8 md:px-3 flex items-center w-full md:w-1/4 h-20 bg-gray-200 md:bg-white   border border-b-gray-300 md:border-none  hover:font-semibold md:hover:font-normal hover:text-teal-600 md:hover:text-black md:h-full hover:md:underline decoration-4 decoration-teal-600 md:hover:underline-offset-[1.7rem]'>Women</li>
                <li className='px-8 md:px-3 flex items-center w-full md:w-1/4 h-20 bg-gray-200 md:bg-white   border border-b-gray-300 md:border-none hover:font-semibold md:hover:font-normal hover:text-teal-600 md:hover:text-black md:h-full hover:md:underline decoration-4 decoration-teal-600 md:hover:underline-offset-[1.7rem]'>Accessories</li>
            </ul>
        <ul className='flex flex-col items-center h-1/3 md:hidden'>
                <li className=' px-8  flex items-center w-full  h-20 bg-gray-50 md:bg-white border border-b-gray-300 hover:font-semibold  hover:text-teal-600 '>About</li>
                <li className='px-8 flex items-center w-full  h-20 bg-gray-50 md:bg-white border  border-b-gray-300  hover:font-semibold  hover:text-teal-600 '>Contact Us</li>
            </ul>
        </div>
    </div>

    <div className='flex  md:gap-3  fold:pr-4 md:pr-7 fold:w-1/2 justify-end items-center '>

    {userId ? <>
        <button className="bg-teal-600 duration-500 hover:bg-white text-white text-sm  hover:text-black rounded-2xl font-bold p-2 fold:px-3 fold:text-xl" >
    <span>Hi, {username}</span>
        </button>
    <button onClick={() => handleLogOut()} className="bg-white duration-500 text-sm hover:bg-black text-black hover:text-white rounded-2xl font-bold p-2  fold:px-3 fold:text-lg">
    <span>Log Out</span>
        </button></>
    : <><Link href={"/Register"}><button  className="bg-white text-sm duration-500 hover:bg-black text-black hover:text-white rounded-2xl font-bold p-2 fold:px-2  fold:text-lg">
    <span>Sign Up</span>
        </button></Link>
    <Link href={"/Login"}>    
    <button  className="bg-teal-600 text-sm duration-500 hover:bg-white text-white hover:text-black rounded-2xl font-bold p-2   fold:px-2 fold:text-lg">
    <span>Sign In</span>
        </button></Link></>}   

    <div className='flex gap-2 ml-1 relative pr-1 '>
        <Link href={"/"}><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-6 fold:size-7 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg></Link>

    <Link href={"/Cart"}> <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" cursor-pointer size-6 fold:size-7 ">
        <path strokeLinecap="round"  strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg></Link>

    {itemCount >= 0 && (
        <Link href={userId ? "/Cart" : "/Login"}><span  className="absolute cursor-pointer top-5 right-2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
          {itemCount}
        </span></Link>)}
    </div>
    </div>
    </div>
    </div>
  )
}

export default Header
"use client"
import React from 'react'
import { useCart } from '../contexts/useCart'
import { CartBody } from '../components/CartBody'
import CartSummary from '../components/CartSummary'
import { useAuth } from '../contexts/useAuth'
import { useRouter } from 'next/navigation'
const Cart = () => {

  
    const {userId} = useAuth()
    const router = useRouter()

    if (!userId){
        router.push('/Login');
    }

    const {cart} = useCart()
  return (

    <div className="bg-gray-100 h-screen py-8">
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4 pt-24">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4 ">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md py-6 pr-9 flex flex-wrap flex-col fold:flex-row">

                        {cart.map((item, index) => (
                            <CartBody item={item} key={index}></CartBody>
                        ))}
                </div>
            </div>
            <CartSummary ></CartSummary>
        </div>
    </div>
      </div>
  )
}

export default Cart;
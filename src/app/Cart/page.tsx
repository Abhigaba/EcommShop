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
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md py-6 px-2  sm:px-6 mb-4">
                    <table className="w-full mt-7">
                        <thead>
                            <tr>
                                <th className="text-left font-semibold">Product</th>
                                <th className="text-left font-semibold">Price</th>
                                <th className="text-left font-semibold ml-9">Quantity</th>
                                <th className="text-left font-semibold">Total</th>
                                <th className='text-left font-semibold'> </th>
                            </tr>
                        </thead>
                        <tbody>
                        {cart.map((item, index) => (
                            <CartBody item={item} key={index}></CartBody>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CartSummary ></CartSummary>
        </div>
    </div>
      </div>
  )
}

export default Cart;
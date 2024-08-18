import React, { useMemo } from 'react'
import { useCart } from '../contexts/useCart'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../contexts/useAuth'
import { useRouter } from 'next/navigation'
const CartSummary = () => {

    const {cart, setCart} = useCart()
    const {userId} = useAuth()
    const router = useRouter()
      
        const subtotal = useMemo(() => {
          return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }, [cart]);

        const quant = useMemo(() => {
            return cart.reduce((acc, item) => acc + item.quantity, 0)
        }, [cart])
      
        const discount = useMemo(() => {
            if (quant >= 3) {
            return subtotal * 0.1;}
          return 0;
        }, [subtotal, quant]);
      
        const total = useMemo(() => {
                return subtotal - discount;
        }, [subtotal, discount]);

        const handleToast = async () => {

        await axios.post('/api/Checkout',{userId: userId});
        setCart([])

        toast.success(`Checkout successfull`, {
            duration: 4000,
            position: 'bottom-center',
          })
        router.push('/')
        ;}

  return (
    
    <div className="md:w-1/4 mt-6">
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(3)}</span>
        </div>

        <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>${discount.toFixed(3)}</span>
        </div>
        <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{quant}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between mb-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${total.toFixed(3)}</span>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4
        hover:bg-blue-300 w-full hover:scale-105 duration-500" onClick={() => handleToast()}>Checkout</button>
    </div>
</div>    
)
}

export default CartSummary
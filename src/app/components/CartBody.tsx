import React, { useState } from 'react'
import { useCart } from '../contexts/useCart';
import toast from 'react-hot-toast';
interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  // Define the props interface
  interface CartBodyProps {
    item: CartItem;
  }
export const CartBody: React.FC<CartBodyProps>= ({item}) => {

    const {removeFromCart, editQuantity} = useCart()
    
    const handleRemove = (item: number) => {
            removeFromCart(item);
    }

    const [quant, setquant] = useState(item.quantity)

    const increaseQuant = () => {
        setquant((prev) => prev + 1)
        editQuantity(item.id, quant + 1)        
    }

    const DecreaseQuant = () => {
        if (quant - 1 === 0 ){ 
            toast.error(` Quantity cannot be 0`, {
                duration: 4000,
                position: 'bottom-center',
              });
            return
        }
        setquant((prev) => prev - 1)
        editQuantity(item.id, quant - 1)
    }
  return (
    <>
        <tr>
            <td className="py-4">
                    <div className="flex items-center">
                    <img className="h-16 w-16 mr-2 sm:mr-4" src={item.image} alt="Product image" />
                    <span className="font-semibold w-16 sm:w-full text-lg sm:text-base">{item.name}</span>
                        </div>
            </td>
            <td className="py-4">{item.price}</td>
            <td className="py-4">
            <div className="flex flex-col  items-center sm:justify-start  sm:flex-row">
                    <button className="border rounded-md py-2 px-2 sm:px-4 sm:mr-2" onClick={() => DecreaseQuant()}>-</button>
                            <span className="text-center w-8">{quant}</span>
                    <button className="border rounded-md py-2 px-2 sm:px-4 sm:ml-2" onClick={() => increaseQuant()}>+</button>
            </div>
            </td>
            <td className="py-4">${item.price*item.quantity}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => handleRemove(item.id)} className="cursor-pointer size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </td>
        </tr>

    </>
  )
}

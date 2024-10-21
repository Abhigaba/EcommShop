import React, { useState } from 'react'
import { useCart } from '../contexts/useCart';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/useAuth';
import { CartBodyProps, CartItem } from '../util/interface';

export const CartBody: React.FC<CartBodyProps>= ({item}) => {

    const {removeFromCart, editQuantity} = useCart()
    const {userId} = useAuth()

    const handleRemove = (item: number) => {
            removeFromCart(item);

            const handlerDatabase = async () => {
              const res = await axios.post('/api/RemoveFromCart', {userId: userId, productId:item})
            } 
            handlerDatabase();
    }

    const [quant, setquant] = useState(item.quantity)

    const increaseQuant = () => {
        setquant((prev) => prev + 1)
        editQuantity(item.id, quant + 1)    

        const handleDatabaseInc = async () => {
          await axios.post('/api/EditCart', {userId: userId, productId: item.id, quantity: quant + 1})
        }
        handleDatabaseInc()
    }

    const DecreaseQuant = () => {
        if (quant - 1 === 0 ){ 
            toast.error(` Quantity cannot be 0`, {
                duration: 4000,
                position: 'bottom-center',
              });
            return
        }

        const handleDatabaseDec = async () => {        
          await axios.post('/api/EditCart', {userId: userId, productId: item.id, quantity: quant - 1})
        }
        handleDatabaseDec()
        setquant((prev) => prev - 1)
        editQuantity(item.id, quant - 1)
    }
  return (
    <>
        <div className='relative mt-2 h-[150px] ml-3 fold:ml-8 w-full fold:h-[320px]  flex justify-between fold:justify-around fold:flex-col fold:w-[250px]  overflow-hidden  rounded-lg border border-gray-100 bg-white shadow-md duration-200  group'>
        <button
          id='remove' 
          className="absolute z-50 top-2 right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center fold:transform fold:scale-0 fold:opacity-0 group-hover:opacity-100 group-hover:scale-100 fold:group-hover:animate-popIn fold:transition-transform duration-300 ease-out"
          onClick={() => handleRemove(item.id)}
          aria-label="Remove item"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

        </button>
        <div className='group relative   h-full w-1/2  fold:w-full fold:h-2/3   bg-[#f9edda] rounded-lg flex justify-center items-center'>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(0,0,0,0.3)_100%)] z-10"></div>
           <img
            className=" object-scale-down h-full fold:mx-3 mt-3 flex  fold:w-full  overflow-hidden rounded-xl relative z-0"
            src={item.image}
            alt={`${item.name} image`}
          />
          </div>

          <div className="mt-4 px-5 ">
        <h5 className="text-base sm:text-lg tracking-tight  text-slate-900">{item.name}</h5>
        <div className="mt-2 mb-5 flex items-center gap-2 sm:gap-0 justify-between flex-wrap">
          <p>
            <span className="text-lg sm:text-xl font-bold text-slate-900">${item.price}</span>
          </p>
          <div className='flex rounded-xl justify-around items-center   hover:scale-110 duration-200 bg-teal-600'>
              <button className='text-white text-lg sm:text-xl w-9 ' onClick={() => DecreaseQuant()}>-</button>
              <p className='text-white font-semibold sm:text-lg' >{quant}</p>
              <button className='text-white text-lg sm:text-xl w-9' onClick={() => increaseQuant()} >+</button>
            </div>  
        </div>
      </div>
        </div>
    </>
  )
}

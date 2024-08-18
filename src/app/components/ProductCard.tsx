import React, { useMemo } from 'react';
import { useCart } from '../contexts/useCart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  item: {
    id: number;
    image: string;
    name: string;
    price: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  
  const { id, image, name, price } = useMemo(() => ({
    id: item.id,
    image: item.image,
    name: item.name,
    price: item.price,
  }), [item]);



  const handleCart = useMemo(() => () => {
    addToCart({ id: id, image: image, name: name, price: price, quantity: 1 });
    toast.success(`${name} added to cart!`, {
      duration: 4000,
      position: 'bottom-center',
    });
  }, [addToCart, id, image, name, price]);

  return (
    <div className="relative md:m-3 lg:m-6 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:scale-105 duration-200">
      <img
        className="object-cover mx-3 mt-3 bg-[#f9edda] flex h-52 overflow-hidden rounded-xl"
        src={image}
        alt={`${name} image`}
      />
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-lg tracking-tight text-slate-900">{name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">${price}</span>
          </p>
        </div>
        <button
          onClick={handleCart}
          className="flex w-full justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 hover:scale-105 duration-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";
import { CartItem, CartContextType } from "../util/interface";

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const {userId} = useAuth()

  useEffect(() => {
    try{
    const updateCart = async () => {
      const res = await axios.post('/api/UpdateCart', {userId: userId})
      setCart(res.data.cart || []);
    }
    if (!userId){
      return
    };
    console.log(userId)
    updateCart()
  }
    catch(error:any){
      console.log(error.message);
    }
}, [userId]);

const addToCart = (data: CartItem) => {
  setCart((prev) => {
    // Check if the item already exists
    const existingItem = prev.find(item => item.id === data.id);
    if (existingItem) {
      // If it exists, update the quantity
      return prev.map(item => 
        item.id === data.id 
          ? { ...item, quantity: item.quantity + data.quantity } // Add quantity to existing item
          : item
      );
    } else {
      // If it doesn't exist, add the new item to the cart
      return [...prev, { ...data, quantity: data.quantity || 1 }]; // Default quantity to 1 if not specified
    }
  });
};

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter(item => item.id !== id)); // Remove item by id
  };

  const editQuantity = (id: number, quantity: number) => {
    setCart((prev) => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item // Update quantity of the specific item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, editQuantity }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

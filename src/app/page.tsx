"use client"
import HeadImage from "./components/HeadImage";

import ProductList from "./components/ProductList";
import { Toaster } from 'react-hot-toast';
import axios from 'axios'

export default function Home() {
  
  return (
    <>
      <HeadImage></HeadImage>
      <p className="text-4xl text-black text-center mt-4 font-bold font-serif">Featured Products</p>
      <hr className="mt-10 w-2/3 m-auto"/>
      <ProductList></ProductList> 
      

     
    </>
  );
}

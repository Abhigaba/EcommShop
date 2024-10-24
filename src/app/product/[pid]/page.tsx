"use client"
  
import { useEffect, useState, useMemo } from 'react'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '@/app/contexts/useCart';
import { useAuth } from '@/app/contexts/useAuth';
import { Reviews, ProductType } from '@/app/util/interface';
import Image from 'next/image';

type ProductPageProps = {
  params: { pid: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  
  const [loading, setLoading] = useState(false);
  const [product , setProduct] = useState<ProductType>();
  const [quantity, setquantity] = useState(1);
  const { pid } = params;
  const {addToCart} = useCart()
  const {userId} = useAuth()


  useEffect(() => {
  const getProductData  = async (pid: string) => {
    
    const res = await axios.get(`/api/product/${pid}`);

    const data= res.data
    const prod: ProductType = {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.images[0], 
      rating: data.rating,
      brand: data.brand,
      reviews: data.reviews,
    };

    setProduct(prod);
  }

  getProductData(pid);
  }, [pid])
  console.log(product)


  const handleCart =  () => {
    
    if (product) {
    addToCart({ id: product?.id, image: product?.image, name: product?.title, price: product?.price, quantity: quantity });
    }

    toast.success(`${product?.title} added to cart!`, {
      duration: 4000,
      position: 'bottom-center',
    });

    try{
    const handler = async () =>{ 
    const res = await axios.post('/api/AddToCart', {userId: userId, productId: product?.id , image:product?.image, name: product?.title, price: product?.price})
    }
    handler()
  }
  
    catch(error: any){
      console.log(error)
    }
  }


  return (
    <div className="bg-gray-100 pt-24 fold:pt-36">
      <div className="container  mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
        
          <div className="w-full md:w-1/2  px-4 mb-8">
          <div className='relative w-full fold:w-11/12 bg-[#f9edda] rounded-lg flex justify-center items-center'>
          <div className="absolute inset-0  rounded-xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(0,0,0,0.3)_100%)] z-10"></div>
           <img
            className="object-contain h-[20em] fold:h-[35em] w-full flex overflow-hidden rounded-xl relative z-0"
            src={product?.image}
            alt={product?.title}
          />
          </div>
          </div>

          <div className="w-full md:w-1/2 px-4 py-3 fold:py-10">
            <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
            <p className="text-gray-600 mb-4">{`(In Stock)`}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product?.price}</span>
            </div>
            <div className="flex items-center mb-4">
                  {Array.from({ length: Math.round(product?.rating || 0) }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
              <span className="ml-2 text-gray-600">{product?.rating} ({product?.reviews.length} reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{product?.description}</p>

            <div className="mb-6">
              <label  className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
              <input type="number" id="quantity" name="quantity" min="1" value={quantity}
                      onChange={(e: any) => setquantity(e.target.value)}      className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>

            <div className="flex space-x-4 mb-6">
              <button onClick={() => handleCart()} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            Add to Cart
                        </button>
              <button
                            className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            Wishlist
                        </button>
            </div>
            <div>
          <h3 className="text-lg font-semibold mb-2">30 days return policy</h3>
        </div>
      </div>
    </div>
  </div>

      <div>

      <section className="py-20 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="w-full">
                <h2 className="font-manrope font-bold text-2xl text-black mb-8 text-center">Our customer reviews
                </h2>

                {product?.reviews.map((review, index) => (
        <div key={index} className="pt-6 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
          <div className="flex items-center gap-3 mb-4">
          {Array.from({ length: Math.round(review?.rating || 0) }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
             
          </div>
          <h3 className="font-manrope font-semibold text-xl sm:text-xl leading-9 text-black ">
            {review.comment}
          </h3>
          <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5">
            <div className="flex items-center">
              <h6 className="font-semibold text-base leading-8 text-indigo-600">
                {review.reviewerName} 
              </h6>
            </div>
          </div>
        </div>
      ))}
              </div>
        </div>
    </section>
      </div>
      </div>   
     
  );
}
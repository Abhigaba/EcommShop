
import React from 'react'
import { ProductCard } from './ProductCard'
import Link from 'next/link'
import { useProducts } from '../contexts/useProducts'

const ProductList = () => {

        const {products} = useProducts()

        return(
                <div className='flex w-full flex-wrap gap-2 justify-center'>
                {
                products.map((item :any, index) => (

                    <Link key={index} href={`/product/${item.id}`}><ProductCard key={index} item={item}></ProductCard></Link>
                ))
                }
            </div>
        
    )
}

export default ProductList
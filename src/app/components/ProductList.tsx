
import React from 'react'
import { ProductCard } from './ProductCard'
import { useState, useEffect, useCallback} from 'react'
import { useProducts } from '../contexts/useProducts'

const ProductList = () => {

        const {products} = useProducts()

        return(
                <div className='flex w-full flex-wrap gap-2 justify-center'>
                {
                products.map((item :any, index) => (
                    <ProductCard key={index} item={item}></ProductCard>
                ))
                }
            </div>
        
    )
}

export default ProductList
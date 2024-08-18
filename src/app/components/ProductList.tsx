
import React from 'react'
import { ProductCard } from './ProductCard'
import { useState, useEffect, useCallback} from 'react'
import { useProducts } from '../contexts/useProducts'

const ProductList = () => {

        const {products} = useProducts()

        return(
                <div className='flex  flex-wrap justify-center'>
                {
                products.map((item :any, index) => (
                    <ProductCard key={index} item={item}></ProductCard>
                ))
                }
            </div>
        
    )
}

export default ProductList
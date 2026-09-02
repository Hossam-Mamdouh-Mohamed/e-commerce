import React from 'react'
import { getProducts } from '@/services/productsApi'
import ProductCard from '../../productcard/page'

export default async function Products() {

  const products = await getProducts();

  return (
    <>
      <div className="my-4  ml-4 flex gap-2 items-center">
        <div className="h-8 bg-green-500 w-2 border-1 rounded-sm"></div>
        <h1 className="text-2xl font-bold text-gray-800">Featured Products</h1>
      </div>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}


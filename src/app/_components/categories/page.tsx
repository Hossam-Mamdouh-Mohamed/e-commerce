import React from 'react'
import CategoryCard from '../categorycard/page';
import { getCategories } from '@/services/categoriesApi'
import { Category } from '@/app/types/products';
import { FaArrowRight } from 'react-icons/fa';

export default async function Categories() {

  const categories = await getCategories();
  return (
    <>
      <div className="my-4 flex justify-between items-center">
        <div className='my-4 flex gap-2 items-center'>
          <div className="h-8 bg-green-500 w-2 border rounded-sm"></div>
          <h1 className="text-2xl font-bold text-gray-800">Featured Categories</h1>
        </div>
        <div className='my-4'>
          <a href="/categories" className='flex gap-2 items-center'>
            <p className="text-green-500">View All Categories</p>
            <FaArrowRight className="ml-2 text-green-600" />
          </a>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((Category) => (
          <CategoryCard key={Category._id} Category={Category} />
        ))}
      </div>
    </>
  )
}


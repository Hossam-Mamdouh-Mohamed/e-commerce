import { getCategories } from '@/services/categoriesApi'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import CategoryCardDetail from '../_components/categoryCardDetail/page';

export default async function Categories() {

  const categories = await getCategories();
  return (
    <>
      <div>
        <div className="bg-green-600 py-10">
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <a href="/">Home</a>/ categories
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-5">
          {categories.map((Category) => (
            <CategoryCardDetail key={Category._id} Category={Category} />
          ))}
        </div>
      </div>
    </>
  )
}

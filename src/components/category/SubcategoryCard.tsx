import React from 'react'
import { Subcategory } from '@/types/product';
import { FaArrowRight, FaFolderOpen } from 'react-icons/fa';

export default function SubcategoryCard({ subCategory }: { subCategory: Subcategory }) {

  return (
    <a className="w-full bg-white rounded-lg p-4 group shadow-sm hover:-translate-y-1 transition-transform duration-300 group cursor-pointer hover:text-green-600" href={`/products?subcategory=${subCategory._id}`}>
      <div className="mb-3 w-10 h-10 bg-green-200 flex justify-center items-center rounded-lg">
        <FaFolderOpen className="text-2xl text-green-600" />
      </div>
      <h1 className="font-extrabold ">{subCategory.name}</h1>
      <span className='opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-4 items-center'>Browser Products  <FaArrowRight className=" text-green-600" /> </span>
    </a>
  )
}


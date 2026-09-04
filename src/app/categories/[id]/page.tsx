import CategoryCard from '@/app/_components/categorycard/page';
import SubCategory from '@/app/_components/subCategories/page';
import { getSpecificCategory, getSubCategories } from '@/services/categoriesApi';
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default async function SubCategoies({ params }: { params: { id: string } }) {

  const { id } = await params;
  const subCategoies = await getSubCategories(id);
  const category = await getSpecificCategory(id);
  return (
    <>
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <a className="text-white/40" href="/">Home</a>
            <span className="text-white/40">/</span>
            <span className="text-white/40">Categories</span>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav><div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30"><img src={category.image} alt="" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{category.name}</h1>
              <p className="text-white/80 mt-1">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='my-4'>
          <a href="/categories" className='flex gap-2 items-center'>
            <FaArrowLeft className="text-gray-600" />
            <p className="text-gray-600">Back to Categories</p>
          </a>
        </div>
        <span className='font-bold text-2xl'>{subCategoies.length} Subcategories in {category.name}</span>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 py-5">
          {subCategoies.map((subCategory) => (
            <SubCategory key={subCategory._id} subCategory={subCategory} />
          ))}
        </div>
      </div>
    </>

  )
}

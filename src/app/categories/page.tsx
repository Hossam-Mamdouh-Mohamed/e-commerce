import { getCategories } from '@/services/categoriesApi'
import React from 'react'
import { FaArrowRight, FaLayerGroup, FaTags } from 'react-icons/fa';
import CategoryCardDetail from '../_components/categoryCardDetail/page';

export default async function Categories() {

  const categories = await getCategories();
  return (
    <>
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <a className="hover:text-white transition-colors" href="/">Home</a>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Categories</span>
          </nav><div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">All Categories</h1>
              <p className="text-white/80 mt-1">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-5">
        {categories.map((Category) => (
          <CategoryCardDetail key={Category._id} Category={Category} />
        ))}
      </div>
    </>
  )
}

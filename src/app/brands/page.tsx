import React from 'react'
import { FaTags } from 'react-icons/fa';
import BrandCard from '@/components/brand/BrandCard';
import { getBrands } from '@/services/brandsApi';

export default async function Brands() {

  let brands = await getBrands();
  return (
    <>
      <div className="bg-linear-to-br from-[#7f22fe] via-[#8e51ff] to-purple-400 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <a className="hover:text-white transition-colors" href="/">Home</a>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav><div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
           <FaTags className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-white/80 mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5'>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((b) => (
            <BrandCard key={b._id} Brand={b} />
          ))}
        </div>
      </div>
    </>
  )
}

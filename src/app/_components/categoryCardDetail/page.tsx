import { Category } from '@/app/types/products'
import React from 'react'

export default function CategoryCardDetail({ Category }: { Category: Category }) {
  return (
    <a className="bg-white rounded-lg p-4 group text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:text-green-600" href={'/categories/' + Category._id}>
      <div className="h-40 w-40 overflow-hidden bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
        <img alt="Music" loading="lazy" width={300} height={300} decoding="async" data-nimg={1} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" src={Category.image} style={{ color: 'transparent' }} />
      </div>
      <h3 className="font-medium">{Category.name}</h3>
      <span className='opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>View Subcategories</span>
    </a>
  )
}

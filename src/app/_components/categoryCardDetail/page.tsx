import { Category } from '@/app/types/products'
import React from 'react'

export default function CategoryCardDetail({ Category }: { Category: Category }) {
  return (
    <a className="bg-white rounded-lg p-4 group text-center shadow-sm hover:-translate-y-2 transition-transform duration-300 group cursor-pointer hover:text-green-600 " href={'/categories/' + Category._id}>
      <div className="mb-3 h-48 w-full overflow-hidden rounded-2xl">
        <img alt={Category.name} loading="lazy" width={400} height={400} className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110" src={Category.image} />
      </div>
      <h3 className="font-medium">{Category.name}</h3>
      <span className='opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>View Subcategories</span>
    </a>
  )
}

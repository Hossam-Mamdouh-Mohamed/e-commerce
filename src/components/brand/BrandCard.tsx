import { Brand } from '@/types/product'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export default function BrandCard({ Brand }: { Brand: Brand }) {
    return (
        <a className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl sm:p-5" href={'/products?brand=' + Brand._id}>
            <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4">
                <img alt={Brand.name} loading="lazy" width={300} height={300} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" src={Brand.image}/>
            </div>
            <h3 className="truncate text-center text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
                {Brand.name}
            </h3>
            <div className="mt-1.5 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 text-xs text-violet-600">
                    View Products
                    <FaArrowRight className="text-[10px]" />
                </span>
            </div>
        </a>
    )
}
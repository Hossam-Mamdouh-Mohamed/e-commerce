import Link from 'next/link'
import { Product } from '../../types/products'
import { FaHeart, FaRegEye, FaRegHeart, FaStar } from 'react-icons/fa'
import { FaArrowsRotate } from 'react-icons/fa6'

export default function ProductCard({ product }: { product: Product }) {
    const rating = Math.round(product.ratingsAverage || 0)

    return (
        <div className="flex items-center justify-center">
            <div className="w-80 rounded-lg border border-blue-200 p-4 shadow-md">
                {/* <Link href={`/products/${product._id}`} className="block"> */}
                <div className="relative">
                    {product.priceAfterDiscount != null && (
                        <span className="absolute left-2 top-2 rounded-full bg-orange-400 px-2 py-1 text-xs font-semibold text-white">
                            {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}% OFF
                        </span>
                    )}

                    <button type="button" className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow" aria-label="Add to wishlist" >
                        <FaRegHeart className="text-gray-500 hover:text-red-600" />
                    </button>


                    <button type="button" className="absolute right-2 top-12 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow" aria-label="Add to wishlist" >
                        <FaArrowsRotate className="text-gray-500 hover:text-green-600" />
                    </button>

                    <a href={`/products/${product._id}`} className="absolute right-2 top-22 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow" aria-label="Add to wishlist" >
                        <FaRegEye  className="text-gray-500 hover:text-green-600" />
                    </a>

                    <div>
                        <img src={product.imageCover} alt="Product Image" className="h-67.5 w-full object-contain" />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-xs font-medium text-gray-600">
                        {product.category.name}
                    </p>
                    <h3 className="text-base font-medium text-gray-800 line-clamp-2 h-12">
                        {product.title}
                    </h3>
                    <p className="text-xs font-medium uppercase text-green-600">
                        {product.brand.name}
                    </p>

                    <div className="mt-1 flex items-center space-x-1 text-sm text-orange-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`h-6 w-6 ${star <= rating ? "text-orange-500" : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className="text-sm text-gray-600">
                            {product.ratingsQuantity > 0 ? product.ratingsAverage.toFixed(1) : "No ratings"}
                        </span>
                        <span className="text-sm text-gray-600">({product.ratingsQuantity})</span>
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                        <div className="mt-2 flex items-baseline space-x-2">
                            <span className="text-xl font-semibold text-green-600">
                                {(product.priceAfterDiscount ?? product.price).toFixed(2)}$
                            </span>

                            {product.priceAfterDiscount != null && (
                                <span className="text-sm text-gray-400 line-through">
                                    {product.price.toFixed(2)}$
                                </span>
                            )}
                        </div>
                        <div>
                            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow" aria-label="Add to cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* </Link> */}
            </div>
        </div>
    )
}

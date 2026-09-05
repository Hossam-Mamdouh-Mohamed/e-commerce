import Link from 'next/link'
import { Product } from '../../types/products'

export default function ProductCard({ product }: { product: Product }) {
    const rating = Math.round(product.ratingsAverage || 0)

    return (
        <div className="flex items-center justify-center">
            <div className="w-80 rounded-lg border border-blue-200 p-4 shadow-md">
                <Link href={`/products/${product._id}`} className="block">
                    <div className="relative">
                        {product.priceAfterDiscount != null && (
                            <span className="absolute left-2 top-2 rounded-full bg-orange-400 px-2 py-1 text-xs font-semibold text-white">
                                {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}% OFF
                            </span>
                        )}

                        <button
                            type="button"
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
                            aria-label="Add to wishlist"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                            </svg>
                        </button>

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
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${star <= rating ? "text-orange-500" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                                </svg>
                            ))}
                            <span className="text-sm text-gray-600">
                                {product.ratingsQuantity > 0 ? product.ratingsAverage.toFixed(1) : "No ratings"}
                            </span>
                            <span className="text-sm text-gray-600">({product.ratingsQuantity})</span>
                        </div>

                        <div className="mt-2 flex items-end justify-between">
                            <div className="mt-2 flex items-baseline space-x-2">
                                <span className="text-xl font-semibold text-blue-600">
                                    {(product.priceAfterDiscount ?? product.price).toFixed(2)}$
                                </span>

                                {product.priceAfterDiscount != null && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {product.price.toFixed(2)}$
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow"
                        aria-label="Add to cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

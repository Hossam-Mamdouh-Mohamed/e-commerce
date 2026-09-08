import React from 'react'
import { getProductDetails } from '@/services/productsApi'
import { FaBolt, FaRegHeart, FaShare, FaStar } from 'react-icons/fa';
import { Span } from 'next/dist/trace';
import { FaCartShopping } from 'react-icons/fa6';

export default async function ProductDetails({ params }: { params: { id: string } }) {

    const { id } = await params;
    const product = await getProductDetails(id);
    const rating = Math.round(product.ratingsAverage || 0)

    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15'>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <img src={product.imageCover} alt="Product Image" />
                </div>
                <div className="col-span-12 md:col-span-9 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className='flex gap-2'>
                        <span className='bg-green-200 rounded-2xl p-1'><a href={'/categories/' + product.category._id} >{product.category.name}</a></span>
                        <span className='rounded-2xl p-1 bg-gray-200'>{product.brand.name}</span>
                    </div>
                    <h1 className='text-3xl font-extrabold py-1'>{product.title}</h1>
                    <div className="mt-1 flex items-center space-x-1 text-sm text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`h-6 w-6 ${star <= rating ? "text-yellow-500" : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className="text-sm text-gray-600">
                            {product.ratingsQuantity > 0 ? product.ratingsAverage.toFixed(1) : "No ratings"}
                        </span>
                        <span className="text-sm text-gray-600">({product.ratingsQuantity})</span>
                    </div>
                    <h1 className='text-3xl font-extrabold py-2'>{product.priceAfterDiscount ?? product.price} EGP</h1>

                    {product.quantity > 0 ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 mb-6 py-1.5 text-sm font-medium text-green-700">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-green-600"></span>
                            <span>In Stock</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 mb-6 text-sm font-medium text-red-700">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-red-600"></span>
                            <span>Out of Stock</span>
                        </div>
                    )}
                    <hr />
                    <p className='text-gray-700 py-5'>{product.description}</p>
                    <div className='flex justify-between bg-gray-200 rounded-2xl p-3'>
                        <span>Total Price:</span>
                        <span className='text-2xl text-green-600 font-extrabold'>{product.priceAfterDiscount?.toFixed(2) ?? product.price.toFixed(2)} EGP</span>
                    </div>
                    <div className="flex gap-2 py-5">
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white hover:bg-green-600">
                            <FaCartShopping />
                            Add to Cart
                        </button>

                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 font-medium text-white hover:bg-gray-800">
                            <FaBolt />
                            Buy Now
                        </button>
                    </div>
                    <div className="flex gap-2 py-5">
                        <button className="flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 font-medium text-white hover:bg-green-600">
                            <FaRegHeart />
                            Add to Wishlist
                        </button>

                        <button className="rounded-lg bg-black px-4 py-2.5 font-medium text-white hover:bg-gray-800">
                          <FaShare />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

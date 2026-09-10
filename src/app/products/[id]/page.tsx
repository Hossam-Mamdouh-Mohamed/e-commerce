import React from 'react'
import { getProductDetails } from '@/services/productsApi'
import { FaBolt, FaBox, FaCheck, FaRegHeart, FaShare, FaStar, FaTruck } from 'react-icons/fa';
import { Span } from 'next/dist/trace';
import { FaArrowRotateLeft, FaCartShopping, FaShareNodes, FaShieldHalved, FaTruckFast } from 'react-icons/fa6';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
                    <div className='flex justify-between items-center bg-gray-200 rounded-2xl p-3'>
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
                        <button className="flex flex-1 group items-center justify-center gap-2 rounded-lg border hover:text-green-700 border-gray-400 px-4 py-2.5 font-medium text-gray-800 hover:border-green-300 shadow-sm">
                            <FaRegHeart />
                            Add to Wishlist
                        </button>

                        <button className="rounded-lg group border border-gray-400  px-4 py-2.5 font-medium text-white hover:border-green-500">
                            <FaShareNodes className='text-gray-700 group-hover:text-green-600' />
                        </button>
                    </div>
                    <hr />
                    <div className="border-t border-gray-100 pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                    <FaTruckFast />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm">Free Delivery</h4>
                                    <p className="text-xs text-gray-500">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                    <FaArrowRotateLeft />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm">30 Days Return</h4>
                                    <p className="text-xs text-gray-500">Money back</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                                    <FaShieldHalved />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
                                    <p className="text-xs text-gray-500">100% Protected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rounded-2xl border border-gray-200 shadow-sm my-10'>
                <Tabs defaultValue="description">
                    <TabsList className="h-auto gap-2 bg-gray-100 p-2">
                        <TabsTrigger
                            value="description"
                            className="
                gap-2 rounded-lg px-4 py-2
                data-[state=active]:bg-green-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
            "
                        >
                            <FaBox className="text-sm" />
                            Product Details
                        </TabsTrigger>

                        <TabsTrigger
                            value="reviews"
                            className="
                gap-2 rounded-lg px-4 py-2
                data-[state=active]:bg-green-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
            "
                        >
                            <FaStar className="text-sm" />
                            Reviews
                        </TabsTrigger>

                        <TabsTrigger
                            value="shipping"
                            className="
                gap-2 rounded-lg px-4 py-2
                data-[state=active]:bg-green-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
            "
                        >
                            <FaTruck className="text-sm" />
                            Shipping & Returns
                        </TabsTrigger>
                    </TabsList>
                    <div className='p-5'>
                        <TabsContent value="description">
                            <h3 className='text-2xl font-bold'>About this Product</h3>
                            <p className='py-3 font-bold text-gray-600'>{product.description}</p>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='bg-gray-100 rounded-2xl p-3'>
                                    <p className='font-medium text-gray-900 mb-3'>Product Information</p>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-500'>Category</span>
                                        <span>{product.category.name}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-500'>Subcategory</span>
                                        <span>{product.subcategory.map((subcategory) => subcategory.name).join(', ')}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-500'>Brand</span>
                                        <span>{product.brand.name}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-500'>Items Sold</span>
                                        <span>{product.sold}+ sold</span>
                                    </div>
                                </div>
                                <div className='bg-gray-100 rounded-2xl p-3'>
                                    <p className='font-medium text-gray-900 mb-3'>Key Features</p>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Premium Quality Product</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>100% Authentic Guarantee</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Fast & Secure Packaging</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Quality Tested</span>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="reviews">
                            <div>

                            </div>
                        </TabsContent>
                        <TabsContent value="shipping" >
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] rounded-lg p-5'>
                                    <div className='flex gap-3 py-5 items-center'>
                                        <div className='rounded-full bg-green-600 p-3'>
                                            <FaTruck className="text-xl text-white" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Shipping Information</h4>
                                    </div>
                                    <div className='flex gap-3 items-center my-1'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Free shipping on orders over $50</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Standard delivery: 3-5 business days</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Express delivery available (1-2 business days)</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Track your order in real-time</span>
                                    </div>
                                </div>
                                <div className='bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] rounded-lg p-5'>
                                    <div className='flex gap-3 py-5 items-center'>
                                        <div className='rounded-full bg-green-600 p-3'>
                                            <FaArrowRotateLeft className="text-xl text-white" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Returns & Refunds</h4>
                                    </div>
                                    <div className='flex gap-3 items-center my-1'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>30-day hassle-free returns</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Full refund or exchange available</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Free return shipping on defective items</span>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-green-600'><FaCheck /></span>
                                        <span className='text-gray-600'>Easy online return process</span>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

import React from 'react'
import { FaHeadset, FaTruck } from 'react-icons/fa'
import { FaArrowRotateLeft, FaShieldHalved } from 'react-icons/fa6'

export default function StoreFeatures() {
    return (
        <div className='bg-[#f0fdf4] py-6'>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <FaTruck className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                            <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <FaArrowRotateLeft className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">Easy Returns</h4>
                            <p className="text-gray-500 text-xs">14-day return policy</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <FaShieldHalved className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
                            <p className="text-gray-500 text-xs">100% secure checkout</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                            <FaHeadset className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm">24/7 Support</h4><p className="text-gray-500 text-xs">Contact us anytime</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

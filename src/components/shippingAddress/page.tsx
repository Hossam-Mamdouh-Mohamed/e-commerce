'use client'

import React from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLock, FaStar, FaUsers } from 'react-icons/fa';
import { toast } from '@/components/ui/toast';
import { Checkout, type ShippingAddress } from '@/services/checkoutApi';

const formSchema = z.object({
  details: z.string().min(5, 'Details must be at least 5 characters').max(200, 'Details must be less than 200 characters'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
  city: z.string().min(2, 'City is required').max(50, 'City must be less than 50 characters'),
  postalCode: z.string().min(3, 'Postal code is required').max(10, 'Postal code is too long'),
});

export default function ShippingAddress({ CartId }: { CartId: string }) {
  const [serverErrors, setServerErrors] = React.useState<string[]>([]);

  const {handleSubmit,control,formState: { errors },} = useForm<ShippingAddress>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      postalCode: '',
    },
  });

  async function onSubmit(data: ShippingAddress) {
    setServerErrors([]);

    const result = await Checkout({ data, CartId });

    if (result.success) {
      toast.add({
        type: 'success',
        description: result.message || 'Redirecting to checkout...',
      });
      window.location.href = result.url;
      return;
    }

    setServerErrors([result.message]);
    toast.add({
      type: 'error',
      description: result.message,
    });
  }

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-30">
      <div className="flex justify-center min-h-screen">
        <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-center py-2">
                <span className="text-green-600">Fresh</span>Cart
              </h1>
              <h1 className="text-3xl font-extrabold text-center">Checkout</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {serverErrors.length > 0 && (
                <div
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {serverErrors.map((error, index) => (
                    <p key={`${error}-${index}`}>{error}</p>
                  ))}
                </div>
              )}

              <Controller
                name="details"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                      Details
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter your Details"
                      autoComplete="off"
                      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />

                    {errors.details && <p className="text-sm text-red-500">{errors.details.message}</p>}
                  </div>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="tel"
                      placeholder="Enter your phone"
                      autoComplete="off"
                      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />

                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                  </div>
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter your city"
                      autoComplete="off"
                      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />

                    {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                  </div>
                )}
              />

              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter your postal code"
                      autoComplete="off"
                      className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />

                    {errors.postalCode && (
                      <p className="text-sm text-red-500">{errors.postalCode.message}</p>
                    )}
                  </div>
                )}
              />

              <button
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
              >
                Continue Checkout
              </button>

              <hr />

              <div className="flex justify-center gap-5">
                <div className="flex gap-1 items-center">
                  <FaLock className="text-gray-400" />
                  <p>SSL Secured</p>
                </div>

                <div className="flex gap-1 items-center">
                  <FaUsers className="text-gray-400" />
                  <p>50K+ Users</p>
                </div>

                <div className="flex gap-1 items-center">
                  <FaStar className="text-gray-400" />
                  <p>4.9 Rating</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



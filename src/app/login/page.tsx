'use client'
import React from 'react'
import * as z from "zod"
import Image from 'next/image'
import image1 from '@/assets/images/signin.png'
import { FaClock, FaFacebookF, FaGoogle, FaLock, FaStar, FaTruck, FaUsers } from 'react-icons/fa'
import { FaShieldHalved } from 'react-icons/fa6'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '@base-ui/react/field'
import { toast } from "@/components/ui/toast"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export type UserSignIn = z.infer<typeof formSchema>;

const formSchema = z.object({
    email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email address"),
    password: z.string().min(1, "Please enter your password"),
    rememberMe: z.boolean()
});

export default function Login() {
    const router = useRouter();


    const { control, handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
    })

    async function onSubmit(data: UserSignIn) {
        const result = await signIn('credentials', { ...data, redirect: false });
        if (result?.ok) {
            toast.add({
                type: "success",
                description: "Signed In Successfully",
            });
            router.push('/')
        } else {
            toast.add({
                type: "error",
                description: result?.error ?? "Invalid email or password",
            });
        }

    }
    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-30">
            <div className="flex flex-col md:flex-row min-h-screen">
                <div className=" text-white md:w-1/2 relative overflow-hidden">
                    <div className="mt-12 rounded-3xl bg-white p-4 shadow-xl">
                        <Image src={image1} alt="Sign in" className='w-full rounded-2xl' width={800} height={400} />
                    </div>
                    <div>
                        <h1 className='text-3xl text-center font-extrabold py-3 text-black'>FreshCart - Your One-Stop Shop for Fresh Products</h1>
                        <p className='text-center font-extrabold py-3 text-lg text-gray-600'>Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
                    </div>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 py-3">
                        <div className="flex items-center gap-1">
                            <FaTruck className="text-xl text-green-500" />
                            Free Delivery
                        </div>
                        <div className="flex items-center gap-1">
                            <FaShieldHalved className="text-xl text-green-500" />
                            Secure Payment
                        </div>
                        <div className="flex items-center gap-1">
                            <FaClock className="text-xl text-green-500" />
                            24/7 Support
                        </div>
                    </div>
                </div>
                <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                        <div className="mb-8">
                            <h1 className='text-3xl font-extrabold text-center py-2'><span className='text-green-600'>Fresh</span>Cart</h1>
                            <h1 className='text-3xl font-extrabold text-center '>Welcome Back!</h1>
                            <p className="text-gray-600 mb-1">
                                Sign in to continue your fresh shopping experience
                            </p>
                        </div>
                        <div className="flex flex-col space-y-4 mb-8">
                            <button className="flex justify-center items-center gap-2 h-12 border border-gray-200 hover:border-green-600 rounded-md hover:bg-green-200">
                                <FaGoogle className="text-xl text-red-500" /> Sign in with Google
                            </button>
                            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:border-green-600  hover:bg-green-200">
                                <FaFacebookF className="text-xl text-blue-500" /> Sign in with Facebook
                            </button>
                        </div>
                        <div className="flex items-center gap-4 pb-5">
                            <div className="h-px flex-1 bg-gray-300"></div>
                            <p className="text-sm text-gray-500 whitespace-nowrap">
                                OR CONTINUE WITH EMAIL
                            </p>
                            <div className="h-px flex-1 bg-gray-300"></div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                            {/* Email */}
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">

                                        <label
                                            htmlFor={field.name}
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />

                                        {fieldState.invalid && (
                                            <p className="text-sm text-red-500">
                                                {fieldState.error?.message}
                                            </p>
                                        )}

                                    </div>
                                )}
                            />

                            {/* Password */}
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">

                                        <label
                                            htmlFor={field.name}
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Enter your Password
                                        </label>

                                        <input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />

                                        {fieldState.invalid && (
                                            <p className="text-sm text-red-500">
                                                {fieldState.error?.message}
                                            </p>
                                        )}

                                        <div className="text-right">
                                            <a
                                                href="#"
                                                className="text-green-500 text-sm"
                                            >
                                                Forgot Password
                                            </a>
                                        </div>

                                    </div>
                                )}
                            />

                            {/* Remember Me */}
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">

                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                name={field.name}
                                                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                                            />

                                            <span className="ml-3 text-sm text-gray-700">
                                                Keep me signed in
                                            </span>

                                        </label>
                                    </div>
                                )}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
                            >
                                Sign in
                            </button>

                            <hr />

                            {/* Create Account */}
                            <p className="text-center font-bold">
                                New to FreshCart?

                                <a
                                    href="/signup"
                                    className="text-green-500 hover:text-green-600 font-medium ml-1"
                                >
                                    Create an account
                                </a>
                            </p>

                            {/* Features */}
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

    )
}


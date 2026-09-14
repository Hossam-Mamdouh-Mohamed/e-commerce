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
import { ForgetPassword, SignUp } from '@/services/auth.actions'


export type UserForgetPassword = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
})

export default function Register() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = React.useState<string[]>([]);

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: UserForgetPassword) {
    setServerErrors([]);
    const result = await ForgetPassword(data);
    if (result.success) {
      toast.add({
        type: "success",
        description: "Reset code sent to your email successfully",
      });
      router.push('/login')
    } else {
      const errors = Array.isArray(result.errors)
        ? result.errors.map((error) => {
          if (typeof error === "string") return error;
          if (error && typeof error === "object" && "msg" in error) {
            return String(error.msg);
          }
          return result.message;
        })
        : result.errors && typeof result.errors === "object"
          ? Object.values(result.errors as Record<string, unknown>).map(String)
          : [result.message];

      setServerErrors(errors.length ? errors : [result.message]);
      toast.add({
        type: "error",
        description: result.message,
      });
    }

  }
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-30">
      <div className="flex justify-center min-h-screen">
        <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className='text-3xl font-extrabold text-center py-2'><span className='text-green-600'>Fresh</span>Cart</h1>
              <h1 className='text-3xl font-extrabold text-center '>Forgot Password?</h1>
              <p className="text-gray-600 mb-1">
                No worries, we'll send you a reset code
              </p>
            </div>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
                  <svg data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope text-xs" role="img" viewBox="0 0 512 512" aria-hidden="true">
                    <path fill="currentColor" d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" /></svg>
                </div>
                <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
              </div><div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                  <svg data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key text-xs" role="img" viewBox="0 0 512 512" aria-hidden="true">
                    <path fill="currentColor" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" /></svg>
                </div>
                <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                  <svg data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock text-xs" role="img" viewBox="0 0 384 512" aria-hidden="true">
                    <path fill="currentColor" d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z" />
                  </svg>
                </div>
              </div>
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
              >
                Send Reset Code
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


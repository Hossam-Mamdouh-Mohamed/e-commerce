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
import { SignUp } from '@/services/auth.actions'


export type UserSignUp = z.infer<typeof formSchema>;

const formSchema = z.object({

  name: z.string().min(3, "Name must be at leatest 3 characters").max(20, "Name must be less than 20 characters").regex(/^[A-Za-z\s]+$/i, "Name must be only letters"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().refine((value) => value === "" || value.length >= 6, {
    message: "Password must be at least 6 characters"
  }).refine((value) => value === "" || value.length <= 20, {
    message: "Password must be less than 20 characters"
  }),
  rePassword: z.string().trim().refine((value) => value === "" || value.length >= 6, {
    message: "Password must be at least 6 characters"
  }).refine((value) => value === "" || value.length <= 20, {
    message: "Password must be less than 20 characters"
  }),
  phone: z.string().trim()
    .refine(
      (value) => value === "" || /^01[0125][0-9]{8}$/.test(value),
      {
        message: "Enter a valid Egyptian phone number",
      }
    ),
})
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords don't match"
  });

export default function Register() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = React.useState<string[]>([]);

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
  })

  async function onSubmit(data: UserSignUp) {
    setServerErrors([]);
    const result = await SignUp(data);
    if (result.success) {
      toast.add({
        type: "success",
        description: "Signed Up Successfully",
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
              <h1 className='text-3xl font-extrabold text-center '>Welcome !</h1>
              <p className="text-gray-600 mb-1">
                Sign Up to join us
              </p>
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
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">

                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Enter your name"
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

                  </div>
                )}
              />

              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">

                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Enter rePassword
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="rePassword"
                      placeholder="rePassword"
                      autoComplete="current-password"
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
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">

                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Enter your Phone
                    </label>

                    <input
                      {...field}
                      id={field.name}
                      type="phone"
                      placeholder="Phone"
                      autoComplete="current-Phone"
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
                Sign Up
              </button>

              <hr />


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


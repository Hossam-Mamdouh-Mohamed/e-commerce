'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import { FaArrowAltCircleLeft, FaEnvelope, FaKey, FaLock } from 'react-icons/fa'
import { FaShieldHalved } from 'react-icons/fa6'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { ForgetPassword, ResetCode, ResetPassword as resetPasswordRequest } from '@/services/auth.actions'

export type EmailSchema = z.infer<typeof emailSchema>
export type ResetCodeSchema = z.infer<typeof resetCodeSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type ResetPasswordRequestData = {
  email: string
  newPassword: string
}

const emailSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
})

const resetCodeSchema = z.object({
  resetCode: z.string().trim().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit code'),
})

const resetPasswordSchema = z.object({
  newPassword: z.string().trim().min(6, 'Password must be at least 6 characters'),
})

export default function Register() {
  const router = useRouter()
  const [serverErrors, setServerErrors] = React.useState<string[]>([])
  const [step, setStep] = useState(1)
  const [resetEmail, setResetEmail] = useState('')

  const { control, handleSubmit: handleEmailSubmit } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  })

  const { control: resetControl, handleSubmit: handleResetCodeSubmit } = useForm<ResetCodeSchema>({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: {
      resetCode: '',
    },
  })

  const { control: resetPasswordControl, handleSubmit: handleResetPasswordSubmit } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
    },
  })

  async function onEmailSubmit(data: EmailSchema) {
    setServerErrors([])
    setResetEmail(data.email)
    const result = await ForgetPassword(data)

    if (result.success) {
      toast.add({
        type: 'success',
        description: 'Reset code sent to your email successfully',
      })
      setStep(2)
      return
    }

    const errors = Array.isArray(result.errors)
      ? result.errors.map((error) => {
          if (typeof error === 'string') return error
          if (error && typeof error === 'object' && 'msg' in error) {
            return String(error.msg)
          }
          return result.message
        })
      : result.errors && typeof result.errors === 'object'
        ? Object.values(result.errors as Record<string, unknown>).map(String)
        : [result.message]

    setServerErrors(errors.length ? errors : [result.message])
    toast.add({
      type: 'error',
      description: result.message,
    })
  }

  async function onResetCodeSubmit(data: ResetCodeSchema) {
    setServerErrors([])
    const result = await ResetCode(data)

    if (result.success) {
      toast.add({
        type: 'success',
        description: 'Reset code verified successfully',
      })
      setStep(3)
      return
    }

    const errors = Array.isArray(result.errors)
      ? result.errors.map((error) => {
          if (typeof error === 'string') return error
          if (error && typeof error === 'object' && 'msg' in error) {
            return String(error.msg)
          }
          return result.message
        })
      : result.errors && typeof result.errors === 'object'
        ? Object.values(result.errors as Record<string, unknown>).map(String)
        : [result.message]

    setServerErrors(errors.length ? errors : [result.message])
    toast.add({
      type: 'error',
      description: result.message,
    })
  }

  async function onResetPasswordSubmit(data: ResetPasswordSchema) {
    setServerErrors([])
    const payload: ResetPasswordRequestData = {
      email: resetEmail,
      newPassword: data.newPassword,
    }

    const result = await resetPasswordRequest(payload)

    if (result.success) {
      toast.add({
        type: 'success',
        description: 'Password reset successfully',
      })
      router.push('/login')
      return
    }

    const errors = Array.isArray(result.errors)
      ? result.errors.map((error) => {
          if (typeof error === 'string') return error
          if (error && typeof error === 'object' && 'msg' in error) {
            return String(error.msg)
          }
          return result.message
        })
      : result.errors && typeof result.errors === 'object'
        ? Object.values(result.errors as Record<string, unknown>).map(String)
        : [result.message]

    setServerErrors(errors.length ? errors : [result.message])
    toast.add({
      type: 'error',
      description: result.message,
    })
  }

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-30">
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="text-white md:w-1/2 relative overflow-hidden">
          <div className="mt-12 h-96 bg-green-100 rounded-3xl p-4 shadow-sm relative">
            <div className="flex justify-center gap-2 items-center w-full h-full">
              <div className="p-5 rounded-2xl rotate-350 bg-white text-green-600">
                <FaEnvelope className="text-2xl" />
              </div>
              <div className="p-4 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-300 bg-white text-green-600">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <FaLock className="text-4xl" />
                </div>
              </div>
              <div className="p-5 rounded-2xl rotate-10 bg-white text-green-600">
                <FaShieldHalved />
              </div>
            </div>
            <div className="rounded-full h-22 bg-green-200 w-22 absolute left-10 top-10" />
            <div className="rounded-full h-15 bg-green-200 w-15 absolute right-15 top-22" />
            <div className="rounded-full h-30 bg-green-200 w-30 absolute right-10 bottom-10" />
          </div>
          <div>
            <h1 className="text-3xl text-center font-extrabold py-3 text-black">Reset Your Password</h1>
            <p className="text-center font-extrabold py-3 text-lg text-gray-600">
              Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 py-3">
            <div className="flex items-center gap-1">
              <FaEnvelope className="text-green-600" />
              Email Verification
            </div>
            <div className="flex items-center gap-1">
              <FaShieldHalved className="text-green-600" />
              Secure Reset
            </div>
            <div className="flex items-center gap-1">
              <FaLock className="text-green-600" />
              Encrypted
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-center py-2">
                <span className="text-green-600">Fresh</span>Cart
              </h1>
              <h1 className="text-3xl font-extrabold text-center">Forgot Password?</h1>
              <p className="text-gray-600 mb-1 text-center">No worries, we&apos;ll send you a reset code</p>
            </div>

            {step === 1 && (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white ring-4 ring-primary-100">
                      <FaEnvelope />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                      <FaKey />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                      <FaLock />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
                  {serverErrors.length > 0 && (
                    <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
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

                        {fieldState.invalid && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                      </div>
                    )}
                  />

                  <button
                    type="submit"
                    className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
                  >
                    Send Reset Code
                  </button>

                  <hr />

                  <a href="/signup" className="text-green-500 hover:text-green-600 font-medium ml-1 flex items-center justify-center gap-1">
                    <FaArrowAltCircleLeft /> Back to Sign In
                  </a>

                  <p className="text-center font-bold">
                    Remember your password?
                    <a href="/login" className="text-green-500 hover:text-green-600 font-medium ml-1">
                      Sign In
                    </a>
                  </p>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white ring-4 ring-primary-100">
                      <FaEnvelope />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white">
                      <FaKey />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                      <FaLock />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleResetCodeSubmit(onResetCodeSubmit)} className="space-y-6">
                  {serverErrors.length > 0 && (
                    <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {serverErrors.map((error, index) => (
                        <p key={`${error}-${index}`}>{error}</p>
                      ))}
                    </div>
                  )}

                  <Controller
                    name="resetCode"
                    control={resetControl}
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                          Reset Code
                        </label>

                        <input
                          {...field}
                          id={field.name}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter 6-digit code"
                          autoComplete="one-time-code"
                          className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />

                        {fieldState.invalid && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                      </div>
                    )}
                  />

                  <button
                    type="submit"
                    className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
                  >
                    Verify Code
                  </button>

                  <hr />

                  <a href="/signup" className="text-green-500 hover:text-green-600 font-medium ml-1 flex items-center justify-center gap-1">
                    <FaArrowAltCircleLeft /> Back to Sign In
                  </a>

                  <p className="text-center font-bold">
                    Remember your password?
                    <a href="/login" className="text-green-500 hover:text-green-600 font-medium ml-1">
                      Sign In
                    </a>
                  </p>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white ring-4 ring-primary-100">
                      <FaEnvelope />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-green-600" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white">
                      <FaKey />
                    </div>
                    <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-green-600" />
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white">
                      <FaLock />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleResetPasswordSubmit(onResetPasswordSubmit)} className="space-y-6">
                  {serverErrors.length > 0 && (
                    <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {serverErrors.map((error, index) => (
                        <p key={`${error}-${index}`}>{error}</p>
                      ))}
                    </div>
                  )}

                  <Controller
                    name="newPassword"
                    control={resetPasswordControl}
                    render={({ field, fieldState }) => (
                      <div className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">
                          New Password
                        </label>

                        <input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="Enter your new password"
                          autoComplete="new-password"
                          className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />

                        {fieldState.invalid && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                      </div>
                    )}
                  />

                  <button
                    type="submit"
                    className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
                  >
                    Reset Password
                  </button>

                  <hr />

                  <a href="/signup" className="text-green-500 hover:text-green-600 font-medium ml-1 flex items-center justify-center gap-1">
                    <FaArrowAltCircleLeft /> Back to Sign In
                  </a>

                  <p className="text-center font-bold">
                    Remember your password?
                    <a href="/login" className="text-green-500 hover:text-green-600 font-medium ml-1">
                      Sign In
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



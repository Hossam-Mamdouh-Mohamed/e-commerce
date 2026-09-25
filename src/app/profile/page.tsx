'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session } = useSession()
  const userName = session?.user?.name ?? 'User'
  const userEmail = session?.user?.email ?? 'Not available'
  const userImage = session?.user?.image
  const initials = userName.split(' ').map((part) => part[0])
    .join('').slice(0, 2).toUpperCase()

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl justify-center px-4 py-16 sm:px-6">
      <section className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left">
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-green-100 ring-4 ring-green-50 sm:mb-0 sm:mr-6">
            {userImage ? (
              <img src={userImage} alt={userName} width={96} height={96} className="h-full w-full object-cover" />
            ) : (<span className="text-2xl font-bold text-green-700">{initials || 'U'}</span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">Account</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">My Profile</h1>
          </div>
        </div>

        <div className="mt-8 space-y-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-gray-700">
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-500">Name</span>
            <span className="text-right font-medium text-gray-900">{userName}</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-3">
            <span className="font-semibold text-gray-500">Email</span>
            <span className="text-right font-medium text-gray-900">{userEmail}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/change-password"
            className="inline-flex rounded-md bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:bg-green-600"
          >
            Change Password
          </Link>
        </div>
      </section>
    </main>
  )
}
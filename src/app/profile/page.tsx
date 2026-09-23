'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ProfilePage() {

  const { data: session } = useSession();
  

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl justify-center px-4 py-16 sm:px-6">
      <section className="h-fit w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="mt-6 space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span>{' '}
            {session?.user?.name ?? 'User'}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            {session?.user?.email ?? 'Not available'}
          </p>
        </div>
        <Link
          href="/forget-password"
          className="mt-8 inline-flex rounded-md bg-green-500 px-4 py-3 font-medium text-white transition-colors hover:bg-green-600"
        >
          Change Password
        </Link>
      </section>
    </main>
  )
}
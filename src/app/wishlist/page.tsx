import Link from 'next/link'
import { getLoggedUserWishList } from '@/services/wishlistApi'
import Wishlistcontent from '@/components/wishlist/whishlistcontent'

export default async function Wishlist() {
  try {
    
    const wishlist = await getLoggedUserWishList()
    return <Wishlistcontent initialwishlist={wishlist} />

  } catch {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Your wishlist</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Sign in to see your wishlist</h1>
          <p className="mt-3 text-slate-600">Your saved products will be waiting for you when you return.</p>
          <Link href="/login" className="mt-8 inline-flex rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            Sign in
          </Link>
        </div>
      </main>
    )
  }
}


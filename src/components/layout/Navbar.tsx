"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { getLoggedUserCart } from "@/services/cartApi"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Support", href: "#" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    enabled: status === "authenticated",
  });

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground shadow-sm">
            F
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-tight">FrechCart</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Market
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isItemActive(item.href)

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
             {status === "authenticated" && (
            <Link href="/wishlist" aria-label="WishList">
              <Heart className="size-6"/>
            </Link>
          )}
          {status === "authenticated" && (
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="size-6" />

              <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1
                     flex items-center justify-center
                     rounded-full bg-green-600 text-white text-xs">
                {data?.numOfCartItems ?? 0}
              </span>
            </Link>
          )}
          {status === "loading" ? null : session ? (
            <>
              <details className="group relative hidden sm:block">
                <summary className="cursor-pointer list-none rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  Hi, {session.user?.name ?? "User"}
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-background p-1 shadow-lg">
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/change-password"
                    className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    Change Password
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </button>
                </div>
              </details>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="hidden sm:inline-flex"
                render={<Link href="/login" />}
              >
                <User className="mr-2 size-4" />
                Sign in
              </Button>

              <Button
                className="hidden sm:inline-flex"
                render={<Link href="/signup" />}
              >
                Create account
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}


import Link from "next/link"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Offers", href: "#" },
  { label: "Support", href: "#" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg font-black text-primary-foreground shadow-sm">
            O
          </div>
          <div className="leading-none">
            <div className="text-lg font-black tracking-tight">Ostoli</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Market
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>

          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="size-4" />
          </Button>

          <Button variant="outline" className="hidden sm:inline-flex">
            <User className="mr-2 size-4" />
            <a href="login">Sign in</a>
          </Button>

          <Button className="hidden sm:inline-flex">Create account</Button>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}


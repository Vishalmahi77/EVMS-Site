"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useUIStore } from "@/lib/store/ui"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Calendar,
  LogIn,
  Rocket,
} from "lucide-react"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/events", label: "Events", icon: Calendar },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { mobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore()

  // close drawer on route change
  useEffect(() => {
    closeMobileNav()
  }, [pathname, closeMobileNav])

  // lock body scroll when open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileNavOpen])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="h-8 w-8 rounded-lg bg-primary text-white grid place-items-center">
            <Rocket className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-lg">Evently</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-slate-700 hover:text-primary"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild className="cursor-pointer">
            <Link href="/auth" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Login
            </Link>
          </Button>
          <Button asChild className="bg-primary text-white hover:bg-blue-700">
            <Link href="/events">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200"
          onClick={toggleMobileNav}
          aria-label="Toggle navigation"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-menu"
        >
          {mobileNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-50 transition ${
          mobileNavOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileNavOpen}
      >
        {/* Backdrop with blur effect */}
        <div
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${
            mobileNavOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"
          }`}
          onClick={closeMobileNav}
        />

        {/* Panel */}
        <div
          className={`ml-auto h-full w-60 max-w-[80%] bg-white shadow-xl transition-transform duration-300 ${
            mobileNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-16 items-center justify-between px-4 border-b ">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="h-8 w-8 rounded-lg bg-primary text-white grid place-items-center">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="text-lg">Evently</span>
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200"
              onClick={closeMobileNav}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4 bg-black text-white">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-blue-50 text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
            <div className="mt-auto p-4 border-t flex flex-col items-center gap-3">
              <Button
                variant="outline"
                className="w-full cursor-pointer text-black"
                asChild
              >
                <Link
                  href="/auth"
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button
                className="w-full bg-primary text-white hover:bg-blue-700"
                asChild
              >
                <Link href="/eventss">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

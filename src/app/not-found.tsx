"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"

export default function NotFound() {
  const router = useRouter()
  const [count, setCount] = useState(5)

  useEffect(() => {
    const tick = setInterval(() => {
      setCount((c) => (c > 0 ? c - 1 : 0))
    }, 1000)

    const to = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => {
      clearInterval(tick)
      clearTimeout(to)
    }
  }, [router])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white text-center px-4 overflow-hidden">
      {/* Blurred, low-visibility reverse countdown in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="
            select-none font-black
            text-[18rem] sm:text-[24rem] md:text-[30rem] leading-none
            text-blue-600/25  
            blur-[2px]         
          "
        >
          {count}
        </span>
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold text-black">404</h1>
        <p className="mt-4 text-lg text-slate-700">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Redirecting to the homepage in{" "}
          <span className="font-semibold">{count}</span> second
          {count !== 1 ? "s" : ""}.
        </p>

        <Button asChild className="mt-6 bg-black text-white hover:bg-blue-700">
          <Link href="/">
            <MoveLeft size={20} />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

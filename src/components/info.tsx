"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"
import { Separator } from "./ui/separator"
export default function Info() {
  return (
    <>
      <main className="relative ml-6 mr-auto">
        {/* Hero */}
        <section className="container grid gap-8 py-16 md:py-24 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Plan, Publish & Track Your{" "}
              <span className="text-primary">Events</span>
            </h1>
            <p className="text-slate-600 text-lg">
              A lightweight event management UI built with Next.js, Tailwind,
              Zustand and shadcn/ui. Your data is stored in{" "}
              <strong>localStorage</strong> — no backend needed (yet).
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-primary text-white hover:bg-blue-700"
              >
                <Link href="/get-started">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/events" className="flex items-center gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  View Events
                </Link>
              </Button>
            </div>
          </div>

          {/* Pretty card */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 text-sm font-medium text-primary">
                Why Evently?
              </div>
              <ul className="space-y-3 text-slate-700">
                <li>• Fast, responsive, and clean UI</li>
                <li>• Built with modern React + Tailwind</li>
                <li>• Easy to extend to a real backend later</li>
                <li>• LocalStorage-first persistence</li>
              </ul>
            </div>
            <div className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-tr from-blue-200 to-blue-50 blur-2xl" />
          </div>
        </section>
      </main>
      <Separator />
      <footer className="border-t border-slate-200">
        <div className="mx-auto py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Evently. All rights reserved.
        </div>
      </footer>
    </>
  )
}

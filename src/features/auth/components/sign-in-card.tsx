"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { toast } from "sonner"

interface SignInCardProps {
  onSwitch: () => void
}

export function SignInCard({ onSwitch }: SignInCardProps) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating login
    toast.success("Login successful")
    router.push("/events")
  }

  return (
    <div className="mx-auto w-full max-w-md p-8 bg-white border border-slate-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-slate-900 mt-6">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email or Username
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email or username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          Sign In
        </Button>
      </form>

      <div className="flex justify-between items-center mt-4">
        <div className="w-full border-t border-slate-300"></div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 mt-4">
        <Button
          variant="outline"
          className="text-black w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <FaGithub className="text-black" /> Sign in with GitHub
        </Button>

        <Button
          variant="outline"
          className="text-black w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <FaGoogle className="text-black" /> Sign in with Google
        </Button>
      </div>

      <p className="text-sm text-center text-slate-600 mt-4">
        New user?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  )
}

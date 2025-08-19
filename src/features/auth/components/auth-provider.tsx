"use client"

import { useState } from "react"
import { SignInCard } from "./sign-in-card"
import { SignUpCard } from "./sign-up-card"

export default function AuthProvider() {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className="h-full flex items-center justify-center">
      {isSignIn ? (
        <SignInCard onSwitch={() => setIsSignIn(false)} />
      ) : (
        <SignUpCard onSwitch={() => setIsSignIn(true)} />
      )}
    </div>
  )
}

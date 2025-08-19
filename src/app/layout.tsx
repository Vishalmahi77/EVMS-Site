import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { ConfirmProvider } from "@/hooks/use-confirm"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Evently — Simple Event Manager",
  description: "A simple event management UI (localStorage only).",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-900`}>
        <ConfirmProvider>{children}</ConfirmProvider>
        {/* Global toast */}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}

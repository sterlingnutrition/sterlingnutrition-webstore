import { getBaseURL } from "@lib/util/env"
import LenisProvider from "components/lenis-provider"
import { Barlow, Cormorant_Garamond } from "next/font/google"
import { Metadata } from "next"
import "styles/globals.css"
import { cn } from "@lib/utils"
import QueryProvider from "components/query-provider"
import { Toaster } from "components/ui/sonner"

const elegant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-elegant",
  weight: ["300", "400", "500", "600", "700"],
})

const base = Barlow({
  subsets: ["latin"],
  variable: "--font-base",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      suppressHydrationWarning
      className={cn("scrollbar-thin", elegant.variable, base.variable)}
    >
      <body>
        <QueryProvider>
          <LenisProvider>
            <main className="relative font-base">{props.children}</main>
            <Toaster />
          </LenisProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

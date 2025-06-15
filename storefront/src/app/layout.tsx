import { getBaseURL } from "@lib/util/env"
import LenisProvider from "components/lenis-provider"
import { Marcellus } from "next/font/google"
import { Metadata } from "next"
import "styles/globals.css"
import { cn } from "@lib/utils"
import QueryProvider from "components/query-provider"

const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-marcellus",
  weight: "400",
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
      className={cn("scrollbar-thin", marcellus.variable)}
    >
      <body>
        <QueryProvider>
          <LenisProvider>
            <main className="relative font-roboto">{props.children}</main>
          </LenisProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

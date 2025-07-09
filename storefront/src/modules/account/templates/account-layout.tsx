import React from "react"
import Image from "next/image"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"
import { cn } from "@lib/utils"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="flex-1 small:py-12 relative min-h-screen"
      data-testid="account-page"
    >
      <div className="hidden lg:block absolute inset-0 -z-10 opacity-35">
        <Image
          src="/showcase/showcase-1.webp"
          fill
          style={{ objectFit: "cover" }}
          alt="Contact Image"
        />
      </div>
      <div className="flex-1 content-container h-full lg:max-w-5xl mx-auto bg-white lg:rounded-xl lg:shadow-xl flex flex-col">
        <div
          className={cn(
            "grid grid-cols-1 py-12 gap-6",
            customer && "small:grid-cols-[240px_1fr]"
          )}
        >
          {customer && (
            <div>
              <AccountNav customer={customer} />
            </div>
          )}
          <div className="flex-1 ">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row lg:items-end items-center text-center lg:text-start justify-between small:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-subtitle-sm font-semibold mb-2">
              Got questions?
            </h3>
            <span className="text-body-sm">
              Our team is here to help you with any questions or concerns you
              may have.
            </span>
          </div>
          <div>
            <LocalizedClientLink href="/contact">
              <Button variant="hollow" className="uppercase">
                Contact Us
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout

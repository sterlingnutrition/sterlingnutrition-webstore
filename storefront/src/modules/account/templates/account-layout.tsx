import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-body mb-2">Got questions?</h3>
            <span className="text-body-sm">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <LocalizedClientLink href="/customer-service">
              <Button size="expanded" className="uppercase rounded-full">
                Customer Service
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout

"use client"

import { User, MapPin, Package, LogOut } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs"
import { Button } from "components/ui/button"
import { cn } from "@lib/utils"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const pathname = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const tabs = [
    {
      name: "Overview",
      value: `/${countryCode}/account`,
      icon: User,
      href: `/account`,
      testId: "overview-link",
    },
    {
      name: "Profile",
      value: `/${countryCode}/account/profile`,
      icon: User,
      href: `/account/profile`,
      testId: "profile-link",
    },
    {
      name: "Addresses",
      value: `/${countryCode}/account/addresses`,
      icon: MapPin,
      href: `/account/addresses`,
      testId: "addresses-link",
    },
    {
      name: "Orders",
      value: `/${countryCode}/account/orders`,
      icon: Package,
      href: `/account/orders`,
      testId: "orders-link",
    },
  ]

  // Determine active tab based on exact path match
  const activeTab =
    tabs.find((tab) => pathname === tab.value)?.value ||
    `/${countryCode}/account`

  return (
    <div className="space-y-4">
      {/* Desktop Navigation */}
      <div>
        <Tabs
          orientation="vertical"
          value={activeTab}
          className="w-full space-y-6"
        >
          <div className="space-y-1">
            <h3 className="text-lg font-medium px-4">Account</h3>
            <p className="text-sm text-muted-foreground px-4">
              Manage your account settings
            </p>
          </div>

          <TabsList className="flex flex-col w-full bg-background items-start gap-2 h-auto ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                asChild
                className={cn(
                  "w-full justify-start px-4 py-2 hover:text-muted-foreground",
                  "data-[state=active]:text-blue-500 data-[state=active]:bg-muted/50"
                )}
              >
                <LocalizedClientLink href={tab.href} data-testid={tab.testId}>
                  <div className="flex items-center gap-3">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </div>
                </LocalizedClientLink>
              </TabsTrigger>
            ))}

            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-destructive hover:bg-destructive/5 hover:text-destructive"
              onClick={handleLogout}
              data-testid="logout-button"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </Button>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

export default AccountNav

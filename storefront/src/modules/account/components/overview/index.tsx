"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "components/ui/card"
import { Progress } from "components/ui/progress"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { User, MapPin, Package, Mail } from "lucide-react"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  const addressesCount = customer?.addresses?.length || 0

  return (
    <div className="space-y-6" data-testid="overview-page-wrapper">
      {/* Welcome Card */}
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Hello {customer?.first_name}
          </h2>
          <p className="text-muted-foreground">Welcome back to your account</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{customer?.email}</span>
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Profile Completion */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileCompletion}%</div>
            <Progress value={profileCompletion} className="h-2 mt-3" />
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto" asChild>
              <LocalizedClientLink href="/account/profile">
                Complete your profile
              </LocalizedClientLink>
            </Button>
          </CardFooter>
        </Card>

        {/* Saved Addresses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Addresses
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{addressesCount}</div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="p-0 h-auto" asChild>
              <LocalizedClientLink href="/account/addresses">
                Manage addresses
              </LocalizedClientLink>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span>Recent Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {orders && orders.length > 0 ? (
            <div className="divide-y">
              {orders.slice(0, 5).map((order) => (
                <LocalizedClientLink
                  key={order.id}
                  href={`/account/orders/details/${order.id}`}
                  className="block hover:bg-muted/50 transition-colors"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Date placed
                        </p>
                        <p className="font-medium">
                          {new Date(order.created_at).toDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Order number
                        </p>
                        <p className="font-medium">#{order.display_id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total amount
                        </p>
                        <p className="font-medium">
                          {convertToLocale({
                            amount: order.total,
                            currency_code: order.currency_code,
                          })}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No recent orders</p>
              <Button asChild>
                <LocalizedClientLink href="/">
                  Start shopping
                </LocalizedClientLink>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  if (!customer) return 0

  const checks = [
    customer.email,
    customer.first_name && customer.last_name,
    customer.phone,
    customer.addresses?.some((addr) => addr.is_default_billing),
  ]

  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export default Overview

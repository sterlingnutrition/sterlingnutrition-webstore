import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { Card, CardHeader, CardTitle, CardContent } from "components/ui/card"
import OrderOverview from "@modules/account/components/order-overview"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full " data-testid="orders-page-wrapper">
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <p className="text-muted-foreground mt-2 mb-6">
        View your previous orders and their status. You can also create returns
        or exchanges for your orders if needed.
      </p>
      <OrderOverview orders={orders} />
    </div>
  )
}

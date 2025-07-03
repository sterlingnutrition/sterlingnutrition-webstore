import { Button } from "components/ui/button"
import { useMemo } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "components/ui/card"
import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Badge } from "components/ui/badge"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="w-full" data-testid="order-card">
      <div className="flex flex-row items-center space-y-0">
        <CardTitle className="text-lg font-medium mr-2">
          Order #<span data-testid="order-display-id">{order.display_id}</span>
        </CardTitle>
        <Badge variant="outline" className="text-sm mr-auto">
          <span data-testid="order-amount">
            {convertToLocale({
              amount: order.total,
              currency_code: order.currency_code,
            })}
          </span>
        </Badge>
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button variant="outline" size="sm" data-testid="order-details-link">
            View Details
          </Button>
        </LocalizedClientLink>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span data-testid="order-created-at">
            {new Date(order.created_at).toDateString()}
          </span>
          <span>•</span>
          <span>
            {numberOfLines} {numberOfLines > 1 ? "items" : "item"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3">
          {order.items?.slice(0, 3).map((i) => (
            <div
              key={i.id}
              className="flex flex-col gap-2"
              data-testid="order-item"
            >
              <Thumbnail
                thumbnail={i.thumbnail}
                size="small"
                className="aspect-square"
              />
              <div className="flex items-center text-sm">
                <span className="font-medium" data-testid="item-title">
                  {i.title}
                </span>
                <span className="mx-1">×</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          ))}

          {numberOfProducts > 3 && (
            <div className="flex flex-col items-center justify-center bg-muted/50 rounded-md">
              <span className="text-sm font-medium">
                +{numberOfProducts - 3}
              </span>
              <span className="text-xs text-muted-foreground">more items</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderCard

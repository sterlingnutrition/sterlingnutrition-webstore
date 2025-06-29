import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div>
      <h1 className="text-body-playfair font-medium my-6">Delivery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col" data-testid="shipping-address-summary">
          <Text className="font-medium mb-1">Shipping Address</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div className="flex flex-col" data-testid="shipping-contact-summary">
          <Text className="font-medium mb-1">Contact</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">{order.email}</Text>
        </div>

        <div className="flex flex-col" data-testid="shipping-method-summary">
          <Text className="font-medium mb-1">Method</Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {(order as any).shipping_methods[0]?.name} (
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })
              .replace(/,/g, "")
              .replace(/\./g, ",")}
            )
          </Text>
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default ShippingDetails

"use client"

import { CheckCircleSolid } from "@medusajs/icons"
import { Text } from "@medusajs/ui"

import Divider from "@modules/common/components/divider"
import * as RadioGroup from "@radix-ui/react-radio-group"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "components/ui/button"
import { cn } from "@lib/utils"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const selectedShippingMethod = availableShippingMethods?.find(
    // To do: remove the previously selected shipping method instead of using the last one
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={cn(
            "text-body-playfair font-medium flex flex-row gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid />
          )}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Button
              onClick={handleEdit}
              className="text-body-sm"
              data-testid="edit-delivery-button"
              variant="link"
            >
              Edit
            </Button>
          )}
      </div>
      {isOpen ? (
        <div data-testid="delivery-options-container">
          <div className="pb-8">
            <RadioGroup.Root
              value={selectedShippingMethod?.id}
              onValueChange={set}
              className="w-full"
            >
              {availableShippingMethods?.map((option) => {
                return (
                  <RadioGroup.Item
                    key={option.id}
                    value={option.id}
                    className="ring-[1px] w-full ring-border rounded p-4 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                  >
                    <div className="flex items-center w-full gap-x-4">
                      <div
                        className={cn(
                          "size-2 bg-muted-foreground rounded-full",
                          option.id === selectedShippingMethod?.id &&
                            "bg-blue-500"
                        )}
                      />
                      <span className="font-medium mr-auto">{option.name}</span>
                      <span className="justify-self-end text-ui-fg-base">
                        {convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code,
                        })}
                      </span>
                    </div>
                  </RadioGroup.Item>
                )
              })}
            </RadioGroup.Root>
          </div>

          <ErrorMessage
            error={error}
            data-testid="delivery-option-error-message"
          />

          <Button
            size="expanded"
            className="mt-6"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!cart.shipping_methods?.[0]}
            data-testid="submit-delivery-option-button"
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
              <div className="flex flex-col w-1/3">
                <Text className="font-medium  mb-1">Method</Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {selectedShippingMethod?.name}{" "}
                  {convertToLocale({
                    amount: selectedShippingMethod?.amount!,
                    currency_code: cart?.currency_code,
                  })}
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Shipping

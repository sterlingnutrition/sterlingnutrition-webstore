"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ShoppingCart, X } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet"
import { Button } from "components/ui/button"
import { ScrollArea } from "components/ui/scroll-area"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex gap-1 cursor-pointer"
          data-testid="nav-cart-link"
        >
          <ShoppingCart />
          <span className="font-medium text-body-sm">{totalItems}</span>
        </button>
      </SheetTrigger>
      <SheetContent
        data-testid="nav-cart-dropdown"
        showCloseButton={false}
        className="rounded-l-3xl"
      >
        <SheetTitle className="flex items-center justify-between px-4 pt-4">
          <h3 className="font-medium text-body">Cart</h3>
          <SheetClose>
            <X />
          </SheetClose>
        </SheetTitle>
        {cartState && cartState.items?.length ? (
          <>
            <ScrollArea className="h-[calc(100vh_-_15rem)] gap-y-4 ">
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
            </ScrollArea>

            <SheetFooter className="flex flex-col p-4 border-t gap-y-4 text-small-regular">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ui-fg-base">
                  Subtotal <span className="font-normal">(excl. taxes)</span>
                </span>
                <span
                  className="text-large-semi"
                  data-testid="cart-subtotal"
                  data-value={subtotal}
                >
                  {convertToLocale({
                    amount: subtotal,
                    currency_code: cartState.currency_code,
                  })}
                </span>
              </div>
              <LocalizedClientLink href="/cart" passHref>
                <Button
                  className="w-full rounded-sm"
                  data-testid="go-to-cart-button"
                >
                  Go to cart
                </Button>
              </LocalizedClientLink>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-y-6">
            <ShoppingCart className="size-20" />
            <span className="font-medium text-body">
              Your shopping bag is empty.
            </span>
            <div>
              <LocalizedClientLink href="/store">
                <>
                  <span className="sr-only">Go to all products page</span>
                  <Button onClick={close}>Explore products</Button>
                </>
              </LocalizedClientLink>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default CartDropdown

interface CartItemProps {
  item: HttpTypes.StoreCartLineItem
}

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="grid grid-cols-[122px_1fr] p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <LocalizedClientLink
        href={`/products/${item.variant?.product?.handle}`}
        className="w-24"
      >
        <Thumbnail
          thumbnail={item.variant?.product?.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          className="border rounded-md"
        />
      </LocalizedClientLink>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              <LocalizedClientLink
                href={`/products/${item.variant?.product?.handle}`}
              >
                {item.title}
              </LocalizedClientLink>
            </h3>

            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600">
                Qty: {item.quantity}
              </span>
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              <LineItemPrice item={item} />
            </div>
          </div>
        </div>

        <DeleteButton
          id={item.id}
          className="self-start mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Remove
        </DeleteButton>
      </div>
    </div>
  )
}

"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
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
import { useState } from "react"
import { Separator } from "components/ui/separator"
import LineItemOptions from "@modules/common/components/line-item-options"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [open, setOpen] = useState(false)
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        className="rounded-l-3xl flex flex-col sm:max-w-xl"
      >
        <SheetTitle className="flex items-center justify-between px-4 pt-4 lg:pt-6 lg:px-6">
          {Boolean(cartState && cartState.items?.length) ? (
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-body-playfair">Cart</h3>
              <div className="font-medium items-center justify-center flex text-sm bg-foreground text-background rounded-full size-6">
                <span>{totalItems}</span>
              </div>
            </div>
          ) : (
            <div />
          )}
          <SheetClose>
            <X />
          </SheetClose>
        </SheetTitle>

        {cartState && cartState.items?.length ? (
          <>
            <div className="flex flex-col h-[calc(100vh-3.8rem)] gap-4">
              <ScrollArea className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="space-y-4 ">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                </div>
              </ScrollArea>

              <SheetFooter className="flex flex-col border-t gap-y-4 mt-auto lg:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-body">Total</span>
                    <span
                      className="font-semibold text-body"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Taxes and shipping calculated at checkout
                  </span>
                </div>
                <div className="flex gap-2 w-full">
                  <LocalizedClientLink href="/cart" passHref className="w-full">
                    <Button
                      className="w-full flex-1 rounded-full"
                      size="expanded"
                      data-testid="go-to-cart-button"
                      onClick={() => setOpen(false)}
                    >
                      View Cart
                    </Button>
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/checkout?step=address"
                    passHref
                    className="w-full "
                  >
                    <Button
                      className="w-full flex-1 rounded-full"
                      size="expanded"
                      data-testid="go-to-cart-button"
                      onClick={() => setOpen(false)}
                    >
                      Checkout
                    </Button>
                  </LocalizedClientLink>
                </div>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-y-6">
            <ShoppingCart className="size-16" />
            <span className="font-semibold text-body-playfair">
              Your cart is empty.
            </span>
            <div>
              <LocalizedClientLink href="/store">
                <>
                  <span className="sr-only">Go to all products page</span>
                  <Button
                    onClick={close}
                    className="uppercase rounded-full"
                    size="expanded"
                  >
                    Continue Shopping
                  </Button>
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

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="flex gap-3 items-start transition-colors">
      <LocalizedClientLink
        href={`/products/${item.variant?.product?.handle}`}
        className="flex-shrink-0"
      >
        <Thumbnail
          thumbnail={item.variant?.product?.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          className="size-16 md:size-20 lg:size-24 rounded-sm border"
        />
      </LocalizedClientLink>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium flex-wrap">
          <LocalizedClientLink
            href={`/products/${item.variant?.product?.handle}`}
            className="hover:underline"
          >
            {item.title}
          </LocalizedClientLink>
        </h3>
        <LineItemOptions
          variant={item.variant}
          data-testid="product-variant"
          className="text-sm text-muted-foreground"
        />
        <div className="text-sm text-muted-foreground">
          Qty: {item.quantity}
        </div>
        <div className="font-medium">
          <LineItemPrice item={item} />
        </div>
      </div>

      <DeleteButton
        id={item.id}
        className="text-muted-foreground text-sm hover:text-destructive transition-colors"
      >
        Remove
      </DeleteButton>
    </div>
  )
}

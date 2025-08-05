"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink, {
  LocalizedClientLinkButton,
} from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ShoppingBag, ShoppingCart, X } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet"
import { Button } from "components/ui/button"
import { ScrollArea } from "components/ui/scroll-area"
import { useState } from "react"
import LineItemOptions from "@modules/common/components/line-item-options"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import { updateLineItem } from "@lib/data/cart"
import Spinner from "@modules/common/icons/spinner"

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
          className="flex gap-1 relative cursor-pointer bg-cm-primary size-10 rounded-full justify-center items-center"
          data-testid="nav-cart-link"
        >
          <ShoppingBag className="stroke-[1.5] size-5" />
          {totalItems > 0 && (
            <span className="font-medium text-[10px] bg-red-500 text-white size-4 rounded-full p-1 absolute top-0.5 right-0.5  inline-flex justify-center items-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        data-testid="nav-cart-dropdown"
        showCloseButton={false}
        className="sm:rounded-l-3xl flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <h3 className="text-subtitle-sm font-normal inline-flex gap-2">
              Cart <span className="text-body-sm">({totalItems})</span>
            </h3>

            <SheetClose>
              <button
                data-testid="close-menu-button"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                <X className="size-10 stroke-1" />
              </button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        {cartState && cartState.items?.length ? (
          <>
            <div className="flex flex-col h-[calc(100vh-3.8rem)] gap-4">
              <ScrollArea className="flex-1 overflow-y-auto px-4 lg:px-6">
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

              <SheetFooter className="flex flex-col border-t gap-y-1 mt-auto lg:p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-body-sm">Total</span>
                    <span
                      className="font-medium text-body-sm"
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
                    Shipping, taxes, and discount codes are calculated at
                    checkout
                  </span>
                </div>
                <div className="flex gap-2 mt-3 w-full">
                  <LocalizedClientLink href="/cart" className="w-full">
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
          <div className="flex flex-col items-center justify-center w-full text-subtitle-sm h-full">
            <span className="">Your cart is</span>
            <span className="font-elegant italic text-subtitle !font-semibold mb-6">
              empty
            </span>
            <div>
              <LocalizedClientLink href="/store">
                <>
                  <span className="sr-only">Go to all products page</span>
                  <Button
                    onClick={() => setOpen(false)}
                    className="uppercase"
                    variant="stack"
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
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <div className="grid grid-cols-5 gap-6 transition-colors">
      <div>
        <Thumbnail
          thumbnail={item.variant?.product?.thumbnail}
          images={item.variant?.product?.images}
          size="square"
          className="size-16 lg:size-20 rounded-sm"
        />
      </div>

      <div className="col-span-3 ml-6 flex flex-col py-0.5">
        <h3 className="font-medium flex-wrap">
          <LocalizedClientLinkButton
            href={`/products/${item.variant?.product?.handle}`}
            className="!text-sm"
          >
            {item.title}
          </LocalizedClientLinkButton>
        </h3>
        <LineItemOptions
          variant={item.variant}
          data-testid="product-variant"
          className="text-sm text-muted-foreground"
        />
        <div className="text-sm mt-auto">
          <LineItemPrice item={item} />
        </div>
      </div>
      <div className="flex items-end flex-col justify-between">
        <DeleteButton
          id={item.id}
          className="text-muted-foreground text-sm hover:text-destructive transition-colors"
        />
        <div className="flex items-center gap-2">
          {updating && <Spinner />}
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="w-14 h-6 p-4 text-xs"
            data-testid="product-select-button"
          >
            {/* TODO: Update this with the v2 way of managing inventory */}
            {Array.from(
              {
                length: Math.min(maxQuantity, 10),
              },
              (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              )
            )}

            <option value={1} key={1}>
              1
            </option>
          </CartItemSelect>
        </div>
      </div>
    </div>
  )
}

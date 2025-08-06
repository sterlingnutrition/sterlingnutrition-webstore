"use client"
import { useAddToCart } from "@lib/hooks/use-add-to-cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "components/ui/button"
import { Loader, ShoppingBag } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React from "react"

const ProductCardActions = ({
  product,
}: {
  product: HttpTypes.StoreProduct
}) => {
  const { isAdding, handleAddToCart } = useAddToCart()
  const router = useRouter()
  const countryCode = useParams().countryCode as string

  const handleClick = async () => {
    if (product.variants && product.variants.length > 1) {
      router.push(`/products/${product.handle}`)
      return
    }

    // If no variants → return
    const variantId = product.variants?.[0]?.id
    if (!variantId) return

    await handleAddToCart({
      variantId,
      quantity: 1,
      countryCode,
    })
  }

  return (
    <Button
      className="w-full p-4 !px-10 flex items-center justify-between rounded-none bg-cm-primary text-foreground hover:text-background text-body-sm font-semibold"
      onClick={handleClick}
    >
      {product.variants && product.variants.length > 1
        ? "View Products"
        : isAdding
        ? "Adding..."
        : "Add to Cart"}
      {isAdding ? <Loader className="animate-spin" /> : <ShoppingBag />}
    </Button>

    /* <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded-full">Wishlist</button>
            <button className="p-2 bg-gray-100 rounded-full">Compare</button>
            <button className="p-2 bg-gray-100 rounded-full">View</button>
          </div> */
  )
}

export default ProductCardActions

// hooks/use-add-to-cart.ts
import { useState } from "react"
import { addToCart } from "@lib/data/cart"
import { toast } from "sonner"

export const useAddToCart = () => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async ({
    variantId,
    quantity,
    countryCode,
  }: {
    variantId: string
    quantity?: number
    countryCode: string
  }) => {
    if (!variantId) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId,
        quantity: quantity ?? 1,
        countryCode,
      })
      toast.success("Product added to cart")
    } catch (err) {
      toast.error("Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  return {
    isAdding,
    handleAddToCart,
  }
}

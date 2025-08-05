import { cn } from "@lib/utils"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <>
      {price.price_type === "sale" && (
        <p className="text-center text-body" data-testid="original-price">
          {price.original_price}
        </p>
      )}
      <p
        className={cn("text-center text-body", {
          "text-ui-fg-interactive": price.price_type === "sale",
        })}
        data-testid="price"
      >
        {price.calculated_price}
      </p>
    </>
  )
}

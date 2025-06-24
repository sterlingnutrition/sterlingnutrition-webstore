import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { Button } from "components/ui/button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  variant = "default",
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  variant?: "minimal" | "default"
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <div className="relative w-full overflow-hidden rounded-lg aspect-square">
          <Image
            src={product.thumbnail || "/placeholder.png"}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="object-cover w-full h-auto transition-opacity duration-200 rounded-lg group-hover:opacity-90"
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <p
            className="mb-2 font-semibold text-center text-body"
            data-testid="product-title"
          >
            {product.title}
          </p>
          <div className="flex items-center text-foreground/90 gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          {variant === "minimal" ? null : (
            <Button variant="stack" className="mt-4">
              SHOP
            </Button>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}

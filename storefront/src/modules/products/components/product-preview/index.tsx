import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
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
        <div className="relative w-full overflow-hidden rounded-3xl aspect-square">
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
            className="mb-2 text-center md:mb-4 text-subtitle-sm"
            data-testid="product-title"
          >
            {product.title}
          </p>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

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
      <div data-testid="group" className="border-2 rounded-3xl">
        <div className="flex flex-col p-4">
          <p className=" font-semibold  text-body" data-testid="product-title">
            {product.title}
          </p>
          <p
            className="mb-2 font-semibold  text-body-sm text-muted-foreground"
            data-testid="product-category"
          >
            {product.categories?.[0].name || product.collection?.title || ""}
          </p>
        </div>
        <div className="relative w-full overflow-hidden aspect-square">
          <Image
            src={product.thumbnail || "/placeholder.png"}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="object-cover w-full h-auto transition-opacity duration-200 "
          />
        </div>
        <div className="flex items-center p-4">
          <div className="font-semibold  text-body">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

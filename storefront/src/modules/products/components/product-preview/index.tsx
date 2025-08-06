import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import ProductCardActions from "./product-card-actions"

export default async function ProductPreview({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
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
    <div
      data-testid="group"
      className="group relative border-2 rounded-3xl h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg"
    >
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className=" absolute inset-0 z-10"
      ></LocalizedClientLink>
      {/* Top Section */}
      <div className="flex flex-col p-4 z-10 relative">
        <p className="font-semibold text-body" data-testid="product-title">
          {product.title}
        </p>
        <p
          className="mb-2 font-semibold text-body-sm text-muted-foreground"
          data-testid="product-category"
        >
          {product.categories?.[0].name || product.collection?.title || ""}
        </p>
      </div>

      {/* Image */}
      <div className="relative w-full overflow-hidden aspect-square transform transition-transform duration-300 group-hover:-translate-y-6">
        <Image
          src={product.thumbnail || "/placeholder.png"}
          alt={product.title}
          fill
          style={{ objectFit: "cover" }}
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Price & Add To Cart */}
      <div className="relative p-4 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-6">
        <div className="font-semibold text-body">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>

      {/* Hidden Buttons that appear on hover */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t transition-all duration-300 translate-y-full group-hover:translate-y-0 flex flex-col items-center space-y-2 z-20">
        <ProductCardActions product={product} />
      </div>
    </div>
  )
}

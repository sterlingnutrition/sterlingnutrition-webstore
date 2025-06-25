import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col">
        {/* {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-body text-muted-foreground"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )} */}
        <h2
          className="mt-2 mb-4 font-semibold text-subtitle-sm"
          data-testid="product-title"
        >
          {product.title}
        </h2>

        <p className="text-body-sm" data-testid="product-description">
          {product.description}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo

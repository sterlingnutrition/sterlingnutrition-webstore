import { Container } from "@medusajs/ui"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: HttpTypes.StoreProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink
      href={`/products/${hit.handle}`}
      data-testid="search-result"
    >
      <div
        key={hit.id}
        className="flex items-center w-full gap-2 p-2 transition-all rounded-md shadow-elevation-card-rest hover:bg-muted "
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="size-12 md:size-20 group "
        />
        <div className="flex flex-col justify-between group">
          <div className="flex flex-col">
            <p className="font-medium " data-testid="search-result-title">
              {hit.title}
            </p>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default Hit

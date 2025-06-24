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
      <Container
        key={hit.id}
        className="flex items-center w-full gap-2 p-4 sm:p-2 sm:flex-col shadow-elevation-card-rest hover:shadow-elevation-card-hover sm:justify-center"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="w-12 h-12 group sm:h-full sm:w-full"
        />
        <div className="flex flex-col justify-between group">
          <div className="flex flex-col">
            <p
              className="font-semibold text-center font-elegant text-body-playfair"
              data-testid="search-result-title"
            >
              {hit.title}
            </p>
          </div>
        </div>
      </Container>
    </LocalizedClientLink>
  )
}

export default Hit

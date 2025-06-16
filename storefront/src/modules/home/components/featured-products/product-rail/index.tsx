import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import Carousel, {
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderDotButton,
  SliderNextButton,
} from "components/ui/carousel"
import TextReveal from "components/ui/text-reveal"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="px-4 py-16 mx-auto sm:px-10 ">
      <TextReveal>
        <h1 className="mb-10 text-center lg:mb-16 text-title font-marcellus">
          {collection.title}
        </h1>
      </TextReveal>
      <Carousel options={{ loop: true }} activeSlider>
        <SliderContainer className="gap-4">
          {products &&
            products.map((product) => (
              <Slider
                key={product.id}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 embla__slide"
              >
                <ProductPreview product={product} region={region} isFeatured />
              </Slider>
            ))}
        </SliderContainer>

        <div className="flex items-center justify-center gap-4 py-4 pt-10">
          <SliderPrevButton className="p-2 rounded-full left-4 bg-white/25 dark:-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronLeft className="w-8 h-8" />
          </SliderPrevButton>
          <SliderDotButton />
          <SliderNextButton className="p-2 rounded-full top-[50%] bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronRight className="w-8 h-8" />
          </SliderNextButton>
        </div>
      </Carousel>
    </div>
  )
}

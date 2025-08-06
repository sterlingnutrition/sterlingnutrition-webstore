import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import TextReveal from "components/ui/text-reveal"
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
} from "components/ui/carousel"
import ProductPreview from "../product-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    // @ts-expect-error : no types
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    // @ts-expect-error : no types
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  // @ts-expect-error : no types
  queryParams.is_giftcard = false

  const products = await getProductsList({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container py-16">
      <TextReveal>
        <h1 className="mb-10 text-center uppercase lg:mb-16 text-title-sm font-elegant">
          Related Products
        </h1>
      </TextReveal>
      <Carousel options={{ loop: true, align: "start" }} activeSlider>
        <SliderContainer className="gap-4">
          {products &&
            products.map((product) => (
              <Slider
                key={product.id}
                className="w-8/10 sm:w-6/10 md:w-1/2 lg:w-1/3 2xl:w-1/4 pr-2 sm:pr-5 embla__slide"
              >
                <ProductPreview product={product} region={region} />
              </Slider>
            ))}
        </SliderContainer>

        <div className="flex items-center justify-center gap-4 py-4 pt-10">
          <SliderPrevButton className="p-2 rounded-full left-4 bg-white/25 dark:-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronLeft className="size-5 md:size-8" />
          </SliderPrevButton>
          <SliderDotButton />
          <SliderNextButton className="p-2 rounded-full top-[50%] bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronRight className="size-5 md:size-8" />
          </SliderNextButton>
        </div>
      </Carousel>
    </div>
  )
}

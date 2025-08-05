import Carousel, {
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderDotButton,
  SliderNextButton,
} from "components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React from "react"
import CategoryItem from "./category-item"

const CATEGORIES = [
  {
    name: "Sterling",
    handle: "sterling",
    image: "/categories/beard-oil.webp",
    bgColor: "bg-gradient-to-l from-green-950 to-green-800",
  },
  {
    name: "Haila Wellness",
    handle: "sterling",
    image: "/categories/beard-butter.webp",
    bgColor: "bg-gradient-to-l from-yellow-950 to-yellow-800",
  },
  {
    name: "Colla White",
    handle: "sterling",
    image: "/categories/face-oil.webp",
    bgColor: "bg-gradient-to-l from-green-950 to-green-800",
  },
  {
    name: "Electrolytes",
    handle: "sterling",
    image: "/categories/lip-balm-earl-grey.webp",
    bgColor: "bg-gradient-to-l from-yellow-950 to-yellow-800",
  },
  {
    name: "Apple Cider Vinegar",
    handle: "sterling",
    image: "/categories/soap-bar-mud-men.webp",
    bgColor: "bg-gradient-to-l from-amber-950 to-amber-800",
  },
]

const Categories = async () => {
  //   const { product_categories } = await getCategoriesList(0, 6)

  return (
    <div className="px-4 py-10 sm:py-16 mx-auto sm:px-10 ">
      <Carousel options={{ align: "start" }} activeSlider>
        <SliderContainer className="gap-4">
          {CATEGORIES.map((category, index) => (
            <Slider
              key={index}
              className="w-9/10 sm:w-8/10 md:w-7/10 lg:w-1/2 3xl:w-2/5 embla__slide"
            >
              <CategoryItem {...category} />
            </Slider>
          ))}
        </SliderContainer>

        <div className="flex items-center justify-center gap-4 py-4 pt-10">
          <SliderPrevButton className="p-2 rounded-full left-4 bg-white/25 dark:-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronLeft className="size-5 md:size-8 stroke-[1.5]" />
          </SliderPrevButton>
          <SliderDotButton />
          <SliderNextButton className="p-2 rounded-full top-[50%] bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronRight className="size-5 md:size-8 stroke-[1.5]" />
          </SliderNextButton>
        </div>
      </Carousel>
    </div>
  )
}

export default Categories

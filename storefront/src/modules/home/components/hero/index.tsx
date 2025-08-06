import Button from "components/ui/ui-button"
import Carousel, {
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderDotButton,
  SliderNextButton,
} from "components/ui/carousel"
import TextReveal from "components/ui/text-reveal"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import React from "react"

const BANNERS = [
  {
    title: "Empower your health",
    subtitle: "Authentic Products",
    description:
      "From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed Oil—backed by ",
    href: "/store",
    bgImage: "/showcase/showcase-1.webp",
    itemImage: "/sample-kit.webp",
  },
  {
    title: "Elevate your gains",
    subtitle: "science, delivered with care.",
    description:
      "From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed Oil—backed by ",
    href: "/store",
    bgImage: "/showcase/showcase-2.webp",
    itemImage: "/sample-kit.webp",
  },
  {
    title: "Your health, our mission",
    subtitle: "science, delivered with care.",
    description:
      "From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed Oil—backed by ",
    href: "/store",
    bgImage: "/showcase/showcase-2.webp",
    itemImage: "/sample-kit.webp",
  },
]

const Hero = () => {
  return (
    <div className="content-container content-section !pt-10 relative">
      <Carousel
        options={{ align: "center", loop: true }}
        activeSlider
        isAutoPlay
        className="relative"
      >
        <SliderContainer className="gap-4">
          {BANNERS.map((banner, index) => (
            <Slider key={index} className="w-full embla__slide">
              <div className="w-full h-full md:aspect-video rounded-3xl">
                <BannerCard key={index} {...banner} />
              </div>
            </Slider>
          ))}
        </SliderContainer>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 py-4 pt-10">
          {/* <SliderPrevButton className="p-2 rounded-full left-4 bg-white/25 dark:-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronLeft className="size-5 md:size-8 stroke-[1.5]" />
          </SliderPrevButton> */}
          <SliderDotButton className="" activeclass="bg-white" />
          {/* <SliderNextButton className="p-2 rounded-full top-[50%] bg-white/25 dark:bg-black/25 dark:border-white backdrop-blur-sm text-primary disabled:opacity-20">
            <ChevronRight className="size-5 md:size-8 stroke-[1.5]" />
          </SliderNextButton> */}
        </div>
      </Carousel>
    </div>
  )
}

export default Hero

export const BannerCard = ({
  title,
  subtitle,
  description,
  href,
  bgImage,
  itemImage,
}: {
  title: string
  subtitle?: string
  description?: string
  href: string
  bgImage: string
  itemImage: string
}) => {
  return (
    <div className="relative w-full h-full ">
      <div
        className="absolute  inset-0 bg-cover bg-center rounded-3xl"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="bg-gradient-to-r from-black via-black/60 to-transparent absolute inset-0 rounded-3xl"></div>
      <div className="relative flex flex-col md:flex-row md:items-center z-10 p-6 text-white">
        <div className="w-full">
          <h1 className="mb-4 text-body uppercase">{subtitle}</h1>
          <h1 className=" mb-10  !font-bold text-title-sm uppercase !text-white">
            {title}
          </h1>
          <h1 className=" mb-6 text-body font-base max-w-lg">{description}</h1>
          <Button>Shop Now</Button>
        </div>
        <div className="relative w-full aspect-square">
          <Image
            src={itemImage}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  )
}

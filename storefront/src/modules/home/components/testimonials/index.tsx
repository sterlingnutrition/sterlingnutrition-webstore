import Carousel, {
  SliderContainer,
  Slider,
  SliderPrevButton,
  SliderDotButton,
  SliderNextButton,
} from "components/ui/carousel"
import { ChevronLeft, ChevronRight, SquareDot } from "lucide-react"
import React from "react"
import TestimonialCard from "./components/testimonial-card"
import TextReveal from "components/ui/text-reveal"

export type Testimonial = (typeof TESTIMONIALS)[number]

const TESTIMONIALS = [
  {
    title: "Smooth & Subtle",
    description: `Finally found a legit source for Goli gummies in SG! Sterling Nutrition delivered fast, and the Black Seed Oil is pure gold.`,
    name: "Garrett D.",
  },
  {
    title: "Fast Delivery",
    description: `Order arrived quicker than expected. The packaging was secure and the supplements are authentic. Will buy again!`,
    name: "Melissa T.",
  },
  {
    title: "Great Customer Service",
    description: `Had a question about dosage and the team responded promptly. Really appreciate the support and care.`,
    name: "Ravi S.",
  },
  {
    title: "Quality Products",
    description: `I've tried many brands, but Sterling Nutrition's vitamins are top-notch. Feeling more energetic already!`,
    name: "Jasmine L.",
  },
  {
    title: "Highly Recommended",
    description: `Easy to order, great prices, and trustworthy. I recommend Sterling Nutrition to all my friends.`,
    name: "Daniel K.",
  },
  {
    title: "Impressive Range",
    description: `Love the variety of health products available. Found everything I needed in one place.`,
    name: "Siti N.",
  },
]

const Testimonials = () => {
  return (
    <>
      <div className="flex justify-center w-full bg-foreground">
        <h2 className="text-body py-4 inline-flex capitalize items-center font-elegant text-center !text-background">
          <SquareDot className="mr-2 size-4" />
          <TextReveal>
            <span>Client Reviews</span>
          </TextReveal>
          <SquareDot className="ml-2 size-4" />
        </h2>
      </div>
      <div className="px-4 py-16 mx-auto sm:px-10 bg-gradient-to-tr from-green-950 to-green-800">
        <Carousel
          options={{ align: "start", loop: true }}
          activeSlider
          isAutoPlay
        >
          <SliderContainer className="gap-4">
            {TESTIMONIALS.map((testimonial, index) => (
              <Slider key={index} className="w-full embla__slide">
                <TestimonialCard {...testimonial} />
              </Slider>
            ))}
          </SliderContainer>

          <div className="flex items-center justify-center gap-4 py-4 pt-10">
            <SliderPrevButton className="p-2 rounded-full left-4 backdrop-blur-sm text-muted-foreground disabled:opacity-20">
              <ChevronLeft className="text-body-playfair md:size-8" />
            </SliderPrevButton>
            <SliderDotButton activeclass="bg-muted" />
            <SliderNextButton className="p-2 rounded-full top-[50%]   backdrop-blur-sm text-muted-foreground disabled:opacity-20">
              <ChevronRight className="size-5 md:size-8" />
            </SliderNextButton>
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default Testimonials

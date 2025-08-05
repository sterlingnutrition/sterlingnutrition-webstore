import Button from "components/ui/ui-button"
import TextReveal from "components/ui/text-reveal"
import Image from "next/image"
import React from "react"

const CTA = () => {
  return (
    <div className="relative flex flex-col items-center justify-center content-container py-16 lg:py-32">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <TextReveal>
          <h1 className="mb-2 italic font-semibold text-subtitle-sm md:mb-6 font-elegant">
            {"Trial Kit"}
          </h1>
          <h2 className="mb-10 text-subtitle font-elegant">
            {"Experience the Best of Natural Supplements"}
          </h2>
          <p className="mb-10 text-body-sm">
            {`Discover the power of natural supplements. Join us in embracing holistic health with our premium range of products.`}
          </p>
        </TextReveal>
        <Button className="text-primary">Shop Now</Button>
      </div>

      {/* Product Image - Right-aligned on larger screens */}
      <div className="relative w-full max-w-xs mt-10 md:absolute md:right-10 lg:max-w-md 2xl:max-w-lg md:bottom-0 md:translate-y-1/2 aspect-square">
        <Image
          src="/sample-kit.webp"
          alt="Trial Kit"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Leaves - Now positioned closer to text and responsive */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {/* Top Left Leaf */}
        <div className="absolute size-40 lg:size-60 2xl:size-72 opacity-20 md:opacity-30 top-[15%] left-[10%]">
          <Image
            src="/categories/leaf-1.webp"
            alt="Leaf Decoration"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Bottom Right Leaf */}
        <div className="absolute size-40 lg:size-60 2xl:size-72 opacity-20 md:opacity-30  bottom-[15%] right-[10%] -rotate-12">
          <Image
            src="/categories/leaf-2.webp"
            alt="Leaf Decoration"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Bottom Left Leaf */}
        <div className="absolute size-40 lg:size-60 2xl:size-72 bottom-[15%] opacity-20 md:opacity-30 md:-bottom-[15%] left-[10%] rotate-[225deg]">
          <Image
            src="/categories/leaf-2.webp"
            alt="Leaf Decoration"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  )
}

export default CTA

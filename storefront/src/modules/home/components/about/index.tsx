"use client"
import { Button } from "components/ui/button"
import TextReveal from "components/ui/text-reveal"
import React, { useRef } from "react"
import { useTransform, useScroll, motion } from "framer-motion"
import Image from "next/image"
import { Leaf, Search } from "lucide-react"

const FeatureCard = ({
  icon: Icon,
  title,
  content,
  y,
  disableParallax = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  content: string
  y?: any
  disableParallax?: boolean
}) => (
  <motion.div
    className="w-full aspect-[12/16] h-full max-w-xs bg-gradient-to-tr  from-green-300 to-green-100 p-6 flex justify-center items-center flex-col bg-muted lg:rounded-lg gap-4 lg:gap-10 lg:shadow-xl"
    style={disableParallax ? {} : { y }}
  >
    <div className="aspect-square w-full max-w-[7rem]  mx-auto rounded-full flex justify-center items-center bg-white">
      <Icon className="size-8 text-foreground stroke-1" />
    </div>

    <h3 className=" text-center text-base sm:text-lg md:text-xl font-medium">
      {title}
    </h3>
    <p className="hidden lg:block text-body-sm text-center">{content}</p>
  </motion.div>
)

const About = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 75])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"])

  const features = [
    {
      icon: Search,
      title: "Radical Transparency",
      content:
        "No black boxes, nothing to hide, we disclose our full formulas, so you will never have to guess what's in it and how much.",
    },
    {
      icon: Leaf,
      title: "Clean, Beyond Reproach",
      content:
        "Fully clean with only verified ingredients; and free from over 1800 questionable ingredients. Because what you put on your skin matters.",
    },
    {
      icon: Search,
      title: "Science-Backed Formulas",
      content:
        "Every ingredient is selected based on clinical research to ensure efficacy and safety.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      content:
        "We're committed to eco-friendly packaging and ethical sourcing throughout our supply chain.",
    },
  ]

  return (
    <div className="relative overflow-hidden mb-12 lg:mb-24" ref={container}>
      {/* SVG clip path definition */}
      <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
        <defs>
          <clipPath id="clip-pattern4" clipPathUnits={"objectBoundingBox"}>
            <path
              d="M0.997417 0.541807C1.02854 0.316235 0.773628 -0.00919936 0.492039 0.000199072C0.249199 0.00830422 0 0.217547 0 0.539457C0.0251948 0.836695 0.248984 1 0.492039 1C0.745469 1 0.982596 0.83787 0.997417 0.541807Z"
              fill="#D9D9D9"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Header section */}
      <div className="relative z-10 flex flex-col items-center justify-center content-container pt-16 lg:pt-32">
        <TextReveal>
          <h1 className="max-w-4xl mb-10 text-center text-subtitle font-elegant">
            {"High Performance Natural Men's Care"}
            <span className="italic"> Trusted By Leaders</span>
          </h1>
          <p className="max-w-4xl mx-auto mb-10 text-center text-body font-base">
            {`We believe in holistic wellness—combining the best of nature and science to deliver supplements that work. Starting with a single product (Black Seed Oil), we've grown into a trusted name, now distributing Goli, Hab Shifa, and Immuneti across Singapore.`}
          </p>
        </TextReveal>
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {/* Top Left Leaf */}
          <div className="absolute size-40 lg:size-60 2xl:size-72 opacity-20 top-[15%] left-[10%]">
            <Image
              src="/categories/leaf-1.webp"
              alt="Leaf Decoration"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Bottom Right Leaf */}
          <div className="absolute size-40 lg:size-60 2xl:size-72 opacity-20 bottom-[15%] right-[10%] -rotate-12">
            <Image
              src="/categories/leaf-2.webp"
              alt="Leaf Decoration"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* Desktop layout - image surrounded by cards */}
      <div className="relative hidden lg:block min-h-screen">
        {/* Clip-path container (normal scroll) with parallax image inside */}
        <div className="relative z-0 w-full flex justify-center my-12 lg:my-24 min-h-screen">
          <figure
            style={{ clipPath: "url(#clip-pattern4)" }}
            className="size-[800px] mt-6"
          >
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 w-full h-[150vh]"
            >
              <Image
                src="/showcase/showcase-1.webp"
                alt="Product showcase"
                fill
                className="transition-all duration-300 object-cover -translate-y-1/4"
              />
            </motion.div>
          </figure>
        </div>

        {/* Floating cards in initial surrounding positions */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-100 h-[500px]">
          <div className="absolute -bottom-[80%] left-[5%] 2xl:left-[15%]">
            <FeatureCard {...features[0]} y={y1} />
          </div>
          <div className="absolute  -bottom-[80%] right-[5%] 2xl:right-[15%]">
            <FeatureCard {...features[1]} y={y2} />
          </div>
          <div className="absolute -top-[20%] left-[5%] 2xl:left-[15%]">
            <FeatureCard {...features[2]} y={y3} />
          </div>
          <div className="absolute -top-[30%] right-[5%] 2xl:right-[15%]">
            <FeatureCard {...features[3]} y={y1} />
          </div>
        </div>
      </div>

      {/* Mobile layout - no parallax */}
      <div className="lg:hidden content-container">
        {/* Image section - no parallax */}
        <div className="relative z-0 w-full flex justify-center ">
          <div className="w-full max-w-xl ">
            <figure
              style={{ clipPath: "url(#clip-pattern4)" }}
              className="relative aspect-square"
            >
              <Image
                src="/showcase/showcase-1.webp"
                alt="Product showcase"
                fill
                className="transition-all duration-300 aspect-[4/5] min-h-full align-bottom object-cover hover:scale-110 w-full"
              />
            </figure>
          </div>
        </div>

        {/* Grid cards - no parallax */}
        <div className="grid grid-cols-2 mt-10 w-full ">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} disableParallax />
          ))}
        </div>
      </div>

      {/* Button - centered */}
      <div className="relative flex justify-center mt-16 z-[20] lg:mt-32 content-container">
        <Button className="uppercase" variant="hollow">
          Read Our Story
        </Button>
      </div>
    </div>
  )
}

export default About

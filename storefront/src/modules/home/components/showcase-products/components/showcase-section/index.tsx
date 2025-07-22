"use client"
import React from "react"
import { cn } from "@lib/utils"
import Image from "next/image"
import { Button } from "components/ui/button"
import TextReveal from "components/ui/text-reveal"
import { motion, useScroll, useTransform } from "motion/react"
import { ShowcaseProduct } from "../.."
import { useMedia } from "react-use"

const ShowcaseSection = ({
  id,
  name,
  description,
  features,
  url,
  image,
}: ShowcaseProduct) => {
  // Create a ref for the container
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Use the useScroll hook to track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const isMobile = useMedia("(max-width: 769px)")

  // Always call useTransform unconditionally
  const yTransform = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

  // Then conditionally apply the transform
  const y = !isMobile ? yTransform : undefined

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col lg:min-h-screen",
        id % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div className="flex flex-col justify-center w-full p-10 lg:px-16 text-background bg-gradient-to-tr from-green-950 to-green-800 lg:w-1/2 min-h-96">
        <TextReveal>
          <h2 className="mb-2 italic md:mb-4 text-subtitle-sm font-elegant !text-background">
            {name}
          </h2>
          <h1 className="mb-10 text-subtitle font-elegant !text-background">
            {description}
          </h1>
        </TextReveal>
        <ul className="pl-5 mb-10 list-disc text-body-sm">
          <TextReveal>
            {features.map((feature, index) => (
              <li key={index} className="mb-1">
                {feature}
              </li>
            ))}
          </TextReveal>
        </ul>

        <div>
          <Button variant="hollow" className="uppercase border-background">
            Shop Now
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2  overflow-hidden relative">
        <motion.div
          className="relative w-full h-full aspect-square lg:aspect-auto"
          style={y ? { y } : {}}
        >
          <Image fill src={image} alt={name} style={{ objectFit: "cover" }} />
        </motion.div>
      </div>
    </div>
  )
}

export default ShowcaseSection

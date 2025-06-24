import React from "react"
import { ShowcaseProduct } from "../.."
import { cn } from "@lib/utils"
import Image from "next/image"
import { Button } from "components/ui/button"
import TextReveal from "components/ui/text-reveal"

const ShowcaseSection = ({
  id,
  name,
  description,
  features,
  url,
  image,
}: ShowcaseProduct) => {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen",
        id % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div className="flex flex-col justify-center w-full p-10 lg:px-16 text-background bg-gradient-to-tr from-slate-950 to-slate-800 lg:w-1/2 min-h-96">
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
      <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto">
        <Image fill src={image} alt={name} style={{ objectFit: "cover" }} />
      </div>
    </div>
  )
}

export default ShowcaseSection

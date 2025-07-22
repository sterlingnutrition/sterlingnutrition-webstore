import { cn } from "@lib/utils"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"
import Image from "next/image"
import React from "react"

const CategoryItem = ({
  name,
  handle,
  image,
  bgColor,
}: {
  name: string
  handle: string
  image: string
  bgColor: string
}) => {
  return (
    <div
      className={cn(
        "w-full h-full p-4 group flex items-center aspect-video rounded-[50px] text-background relative",
        bgColor
      )}
    >
      <div className="w-full px-4 ">
        <div className="transition-all duration-500 ease-in-out md:translate-y-1/2 md:group-hover:translate-y-0">
          <h1 className="w-full text-xl tracking-tight md:text-3xl lg:text-5xl 3xl:text-6xl font-elegant !text-background">
            {name}
          </h1>
          <div className="w-full group-hover:via-transparent h-[1px] bg-gradient-to-r from-background to-transparent" />
        </div>
        <LocalizedClientLink href={`/store/categories/${handle}`}>
          <Button
            className="!p-4 md:!p-6 mt-4 uppercase md:mt-6 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 border-background"
            variant="hollow"
          >
            Shop Now
          </Button>
        </LocalizedClientLink>
      </div>
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={name}
          fill
          className="z-10 object-cover transition-transform duration-500 ease-in-out group-hover:rotate-12 rounded-3xl group-hover:scale-125"
        />
        <Image
          src={"/categories/leaf-1.webp"}
          alt={name}
          width={180}
          height={180}
          objectFit="contain"
          className="absolute top-0 left-0 hidden transition-opacity duration-500 ease-in-out opacity-0 md:block group-hover:opacity-100"
        />
        <Image
          src={"/categories/leaf-2.webp"}
          alt={name}
          width={180}
          height={180}
          objectFit="contain"
          className="absolute right-0 hidden transition-opacity duration-500 ease-in-out opacity-0 md:block bottom-10 -rotate-12 group-hover:opacity-100"
        />
        <Image
          src={"/categories/leaf-2.webp"}
          alt={name}
          width={180}
          height={180}
          objectFit="contain"
          className="absolute bottom-0 hidden transition-opacity duration-500 ease-in-out opacity-0 md:block -left-10 rotate-225 group-hover:opacity-100"
        />
      </div>
    </div>
  )
}

export default CategoryItem

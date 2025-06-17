import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import About from "@modules/home/components/about"
import ShowcaseProducts from "@modules/home/components/showcase-products"
import Categories from "@modules/home/components/categories"

export const metadata: Metadata = {
  title: "Home - Sterling Nutrition",
  description:
    "The one stop online shop for the best health supplements in Singapore! The official distributor of Goli, Immuneti, and Hab Shifa in Singapore. Shop Now!",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <Categories />
      <About />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
      <ShowcaseProducts />
    </>
  )
}

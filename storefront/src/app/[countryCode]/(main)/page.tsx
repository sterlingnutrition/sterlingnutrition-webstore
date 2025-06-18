import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import About from "@modules/home/components/about"
import ShowcaseProducts from "@modules/home/components/showcase-products"
import Categories from "@modules/home/components/categories"
import Testimonials from "@modules/home/components/testimonials"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { getCategoryByHandle } from "@lib/data/categories"

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

  const bestSelling = collections.find(
    (collection) => collection.handle === "best-sellers"
  )

  return (
    <>
      <Hero />
      <Categories />
      <About />
      {bestSelling && <ProductRail collection={bestSelling} region={region} />}
      <ShowcaseProducts />
      {bestSelling && <ProductRail collection={bestSelling} region={region} />}
      <Testimonials />
      <CTA />
      <TrustSection />
    </>
  )
}

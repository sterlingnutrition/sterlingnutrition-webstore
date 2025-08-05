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

  return (
    <>
      <Hero />
      {collections[1] && (
        <ProductRail collection={collections[1]} region={region} />
      )}
      <Categories />
      {collections[0] && (
        <ProductRail collection={collections[0]} region={region} />
      )}
      <About />
      <ShowcaseProducts />
      <Testimonials />
      <CTA />
      <TrustSection />
    </>
  )
}

import { Metadata } from "next"
import { Suspense } from "react"

import SortProducts, {
  SortOptions,
} from "@modules/store/components/refinement-list/sort-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList, {
  FilterItem,
} from "@modules/store/components/refinement-list"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"

export const metadata: Metadata = {
  title: "All Products | Sterling Nutrition",
  description:
    "Explore our wide range of health supplements, including Goli, Immuneti, and Hab Shifa. Shop now for the best health products in Singapore!",
}

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
    categories: FilterItem[]
    collections: FilterItem[]
  }
}

export default async function AllProductsPage({
  searchParams,
  params,
}: Params) {
  const { sortBy, page } = searchParams
  const { countryCode } = params
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const [{ product_categories }, { collections }] = await Promise.all([
    getCategoriesList(),
    getCollectionsList(),
  ])

  const formattedCategories =
    product_categories
      ?.filter((c) => !c.parent_category) // Only top-level categories
      .map((c) => ({
        value: c.handle,
        label: c.name,
        type: "category" as const,
      })) || []

  // Format collections
  const formattedCollections =
    collections?.map((c) => ({
      value: c.handle,
      label: c.title,
      type: "collection" as const,
    })) || []

  return (
    <>
      <div
        className="flex flex-col small:flex-row small:items-start gap-10 content-section content-container"
        data-testid="all-products-container"
      >
        <RefinementList
          collections={formattedCollections}
          categories={formattedCategories}
          countryCode={countryCode}
        />
        <div className="w-full">
          <div className="mb-8 flex justify-between">
            <h1 className="text-subtitle font-elegant">All Products</h1>
            <SortProducts />
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={params.countryCode}
            />
          </Suspense>
        </div>
      </div>
      <CTA />
      <TrustSection />
    </>
  )
}

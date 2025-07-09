import { notFound } from "next/navigation"
import { Suspense } from "react"

import {
  getCategoriesList,
  getCategoryByHandle,
  listCategories,
} from "@lib/data/categories"
import {
  getCollectionByHandle,
  getCollectionsList,
} from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import {
  StoreCollection,
  StoreProductCategory,
  StoreRegion,
} from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import InteractiveLink from "@modules/common/components/interactive-link"
import RefinementList, {
  FilterItem,
} from "@modules/store/components/refinement-list"
import SortProducts, {
  SortOptions,
} from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"
import { Metadata } from "next"

type Props = {
  params: {
    handle: string[]
    countryCode: string
    categories: FilterItem[]
    collections: FilterItem[]
  }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateStaticParams() {
  const [{ product_categories }, { collections }, regions] = await Promise.all([
    getCategoriesList(),
    getCollectionsList(),
    listRegions(),
  ])

  const countryCodes = regions
    ?.map((r) => r.countries?.map((c) => c.iso_2))
    .flat()
    .filter(Boolean) as string[]

  const categoryHandles =
    product_categories?.map((category) => [category.handle]) || []
  const collectionHandles =
    collections?.map((collection) => ["collections", collection.handle]) || []

  const staticParams = countryCodes.flatMap((countryCode) => [
    ...categoryHandles.map((handle) => ({
      countryCode,
      handle,
    })),
    ...collectionHandles.map((handle) => ({
      countryCode,
      handle,
    })),
  ])

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isCollection = params.handle[0] === "collections"

  if (isCollection && params.handle.length === 2) {
    const collection = await getCollectionByHandle(params.handle[1])

    if (!collection) {
      notFound()
    }

    return {
      title: `${collection.title} | Sterling Nutrition`,
      description: `${collection.title} collection`,
      alternates: {
        canonical: `collections/${params.handle[1]}`,
      },
    }
  } else {
    // Handle category metadata
    const { product_categories } = await getCategoryByHandle(params.handle)

    if (!product_categories || product_categories.length === 0) {
      notFound()
    }

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(" | ")

    const description =
      product_categories[product_categories.length - 1].description ??
      `${title} category.`

    return {
      title: `${title} | Sterling Nutrition`,
      description,
      alternates: {
        canonical: params.handle.join("/"),
      },
    }
  }
}

export default async function StorePage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams
  const { handle, countryCode } = params

  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch filter data here instead of in generateStaticParams
  const [{ product_categories }, { collections }] = await Promise.all([
    getCategoriesList(),
    getCollectionsList(),
  ])

  const formattedCategories =
    product_categories
      ?.filter((c) => !c.parent_category)
      .map((c) => ({
        value: c.handle,
        label: c.name,
        type: "category" as const,
      })) || []

  const formattedCollections =
    collections?.map((c) => ({
      value: c.handle,
      label: c.title,
      type: "collection" as const,
    })) || []

  // Determine if this is a collection or category request
  const isCollection = handle[0] === "collections"
  const isCategory = !isCollection

  let content = null
  let title = "All Products"
  let description = ""
  let parentLinks = null
  let children = null
  let notFoundError = false

  try {
    if (isCollection && handle.length === 2) {
      // Collection page
      const collection = await getCollectionByHandle(handle[1])
      if (!collection) {
        notFoundError = true
      } else {
        title = collection.title
        content = (
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        )
      }
    } else if (isCategory) {
      // Category page
      const { product_categories } = await getCategoryByHandle(handle)
      if (!product_categories) {
        notFoundError = true
      } else {
        const category = product_categories[product_categories.length - 1]
        const parents = product_categories.slice(
          0,
          product_categories.length - 1
        )

        title = category.name
        description = category.description || ""

        if (parents.length > 0) {
          parentLinks = parents.map((parent) => (
            <span key={parent.id} className="text-ui-fg-subtle">
              <LocalizedClientLink
                className="mr-4 hover:text-black"
                href={`/store/${parent.handle}`}
              >
                {parent.name}
              </LocalizedClientLink>
              /
            </span>
          ))
        }

        if (category.category_children) {
          children = (
            <div className="mb-8 text-base-large">
              <ul className="grid grid-cols-1 gap-2">
                {category.category_children?.map((c) => (
                  <li key={c.id}>
                    <InteractiveLink href={`/store/${c.handle}`}>
                      {c.name}
                    </InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        content = (
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        )
      }
    }
  } catch (error) {
    notFoundError = true
  }

  // Handle not found cases
  if (notFoundError) {
    // You could redirect to /store/all or show a 404
    // Option 1: Redirect to all products
    // redirect(`/store/all`)

    // Option 2: Show a 404 page
    notFound()
  }

  // Fallback to all products if no specific content
  if (!content) {
    content = (
      <PaginatedProducts
        sortBy={sort}
        page={pageNumber}
        countryCode={countryCode}
      />
    )
  }

  return (
    <>
      <div
        className="flex flex-col small:flex-row small:items-start py-6 gap-10 small:gap-20 md:py-10 lg:py-16 content-container"
        data-testid="store-container"
      >
        <RefinementList
          collections={formattedCollections}
          categories={formattedCategories}
          countryCode={countryCode}
        />
        <div className="w-full">
          <div className="flex flex-row mb-8 gap-4">
            {parentLinks}
            <h1 className="text-subtitle font-elegant mr-auto">{title}</h1>
            <SortProducts />
          </div>
          {description && (
            <div className="mb-8 text-body-sm">
              <p>{description}</p>
            </div>
          )}
          {children}
          <Suspense fallback={<SkeletonProductGrid />}>{content}</Suspense>
        </div>
      </div>
      <CTA />
      <TrustSection />
    </>
  )
}

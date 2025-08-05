import React, { Suspense } from "react"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"
import FAQ from "@modules/home/components/faq"
import ImageCarousel from "components/ui/image-carousel"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { BreadcrumbItemProps } from "@modules/common/components/breadcrumbs/use-breadcrumbs"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const crumbs: BreadcrumbItemProps[] = [
    {
      label:
        product.collection?.title ||
        product.categories?.[0].name ||
        "Collections",
      href: `/collections/${
        product.collection?.handle ||
        `/categories/${product.categories?.[0].handle}` ||
        "/"
      }`,
    },
    {
      label: product.title,
      href: `/products/${product.handle}`,
    },
  ]

  return (
    <div className="content-container py-16 space-y-10">
      <div
        className="flex flex-col gap-10 md:flex-row "
        data-testid="product-container"
      >
        <div className="flex flex-col w-full">
          <ImageCarousel
            images={product?.images || []}
            className="md:mt-4"
            data-testid="product-image-carousel"
            imageFit="cover"
            aspectRatio="square"
            thumbPosition="left"
          />
        </div>
        <div className="flex flex-col w-full space-y-2">
          <Breadcrumbs breadcrumbs={crumbs} />
          <ProductInfo product={product} />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          <ProductTabs product={product} />
        </div>
      </div>
      {/* <FAQ /> */}
      <div data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
      <CTA />
      <TrustSection />
    </div>
  )
}

export default ProductTemplate

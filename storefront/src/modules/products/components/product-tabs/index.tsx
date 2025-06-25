"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import { HttpTypes } from "@medusajs/types"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "components/ui/accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Description",
      component: <DescriptionTab product={product} />,
    },
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full mt-16">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <AccordionItem
            key={i}
            title={tab.label}
            value={tab.label}
            className="px-4 border-t border-b-0 last:border-b border-foreground/90"
          >
            <AccordionTrigger className="font-medium text-body-sm">
              {tab.label}
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              {tab.component}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

const DescriptionTab = ({ product }: ProductTabsProps) => {
  return <p>{product.description}</p>
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-8">
      <div className="flex flex-col gap-y-4">
        <div>
          <span className="font-medium">Material</span>
          <p>{product.material ? product.material : "-"}</p>
        </div>
        <div>
          <span className="font-medium">Country of origin</span>
          <p>{product.origin_country ? product.origin_country : "-"}</p>
        </div>
        <div>
          <span className="font-medium">Type</span>
          <p>{product.type ? product.type.value : "-"}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div>
          <span className="font-medium">Weight</span>
          <p>{product.weight ? `${product.weight} g` : "-"}</p>
        </div>
        <div>
          <span className="font-medium">Dimensions</span>
          <p>
            {product.length && product.width && product.height
              ? `${product.length}L x ${product.width}W x ${product.height}H`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="grid grid-cols-1 gap-y-8">
      <div className="flex items-start gap-x-2">
        <FastDelivery className="mt-1" />
        <div>
          <span className="font-medium">Fast delivery</span>
          <p className="">
            Your package will arrive in 3-5 business days at your pick up
            location or in the comfort of your home.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-2">
        <Refresh className="mt-1" />
        <div>
          <span className="font-medium">Simple exchanges</span>
          <p className="">
            Is the fit not quite right? No worries - we&apos;ll exchange your
            product for a new one.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-x-2">
        <Back className="mt-1" />
        <div>
          <span className="font-medium">Easy returns</span>
          <p className="">
            Just return your product and we&apos;ll refund your money. No
            questions asked – we&apos;ll do our best to make sure your return is
            hassle-free.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs

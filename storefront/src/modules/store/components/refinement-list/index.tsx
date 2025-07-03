"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Label } from "components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"

export type FilterItem = {
  value: string
  label: string
  type: "category" | "collection"
}

type RefinementListProps = {
  categories?: FilterItem[]
  collections?: FilterItem[]
  countryCode: string
  "data-testid"?: string
}

export default function RefinementList({
  categories = [],
  collections = [],
  countryCode,
  "data-testid": dataTestId,
}: RefinementListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Extract current filter type and value from pathname
  const parts = pathname.split("/")
  const storeIndex = parts.indexOf("store")
  let currentType = "all"
  let currentValue = ""

  if (storeIndex > -1 && parts.length > storeIndex + 1) {
    const filterPart = parts[storeIndex + 1]
    if (filterPart === "categories" || filterPart === "collections") {
      currentType = filterPart
      if (parts.length > storeIndex + 2) {
        currentValue = parts[storeIndex + 2]
      }
    }
  }

  const handleValueChange = (value: string) => {
    if (value === "all") {
      // Navigate to just /store
      router.push(
        `/${countryCode}/store${
          searchParams ? `?${searchParams.toString()}` : ""
        }`
      )
    } else {
      const [type, val] = value.split("---")
      // Navigate to /store/[type]/[value]
      router.push(
        `/${countryCode}/store/${type}/${val}${
          searchParams ? `?${searchParams.toString()}` : ""
        }`
      )
    }
  }

  // Determine radio group value
  const radioValue =
    currentType === "all" ? "all" : `${currentType}---${currentValue}`

  return (
    <div className="small:sticky small:top-[10vh] flex small:flex-col gap-12 py-4 mb-8 small:px-0 small:min-w-[300px]">
      <div className="space-y-6 text-muted-foreground w-full">
        <Label className="uppercase text-body font-bold tracking-wider">
          Filters
        </Label>
        <RadioGroup.Root
          defaultValue="all"
          value={radioValue}
          onValueChange={handleValueChange}
          className="w-full"
        >
          <RadioGroup.Item
            value="all"
            id="all"
            className="text-muted-foreground data-[state=checked]:text-primary/90 data-[state=checked]:font-semibold cursor-pointer"
          >
            All Products
          </RadioGroup.Item>
          <Accordion
            type="multiple"
            defaultValue={["collections", "categories"]}
            className="w-full flex-1"
          >
            {collections.length > 0 && (
              <AccordionItem
                key="collections"
                value={`collections`}
                className="w-full"
              >
                <AccordionTrigger className="w-full uppercase text-body-sm font-bold tracking-wider">
                  Collections
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-start gap-2">
                    {collections.map((collection) => (
                      <RadioGroup.Item
                        key={`collections---${collection.value}`}
                        value={`collections---${collection.value}`}
                        id={`collections---${collection.value}`}
                        className="text-muted-foreground data-[state=checked]:text-primary/90 data-[state=checked]:font-semibold cursor-pointer"
                      >
                        {collection.label}
                      </RadioGroup.Item>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
            {categories.length > 0 && (
              <AccordionItem
                key="categories"
                value={`categories`}
                className="w-full"
              >
                <AccordionTrigger className="w-full uppercase text-body-sm font-bold tracking-wider">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-start gap-2">
                    {categories.map((category) => (
                      <RadioGroup.Item
                        key={`categories---${category.value}`}
                        value={`categories---${category.value}`}
                        id={`categories---${category.value}`}
                        className="text-muted-foreground data-[state=checked]:text-primary/90 data-[state=checked]:font-semibold cursor-pointer"
                      >
                        {category.label}
                      </RadioGroup.Item>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </RadioGroup.Root>
      </div>
    </div>
  )
}

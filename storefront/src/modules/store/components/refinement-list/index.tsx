"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { Label } from "components/ui/label"

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
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <div className="space-y-6">
        <RadioGroup value={radioValue} onValueChange={handleValueChange}>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Filter By</Label>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Products</Label>
            </div>
            {collections.length > 0 && (
              <>
                <p className="text-xs font-medium text-gray-500 mt-4 mb-2">
                  Collections
                </p>
                {collections.map((collection) => (
                  <div
                    key={`collections-${collection.value}`}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={`collections---${collection.value}`}
                      id={`collections---${collection.value}`}
                    />
                    <Label htmlFor={`collections---${collection.value}`}>
                      {collection.label}
                    </Label>
                  </div>
                ))}
              </>
            )}
            {categories.length > 0 && (
              <>
                <p className="text-xs font-medium text-gray-500 mt-4 mb-2">
                  Categories
                </p>
                {categories.map((category) => (
                  <div
                    key={`categories---${category.value}`}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={`categories---${category.value}`}
                      id={`categories-${category.value}`}
                    />
                    <Label htmlFor={`categories---${category.value}`}>
                      {category.label}
                    </Label>
                  </div>
                ))}
              </>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

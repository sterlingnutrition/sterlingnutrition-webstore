"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low to High",
  },
  {
    value: "price_desc",
    label: "Price: High to Low",
  },
]

const SortProducts = ({ "data-testid": dataTestId }: SortProductsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortBy = searchParams.get("sortBy") || "created_at"

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
  const handleChange = (value: SortOptions) => {
    setQueryParam("sortBy", value)
  }

  const setQueryParam = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`)
  }

  return (
    <FilterRadioGroup
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts

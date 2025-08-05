"use client"

import { useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { cn } from "@lib/utils"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  onOpenChange?: (state: boolean) => void
  regions: HttpTypes.StoreRegion[]
  variant?: "default" | "inline"
  className?: string
}

const CountrySelect = ({
  onOpenChange,
  regions,
  variant,
  className,
}: CountrySelectProps) => {
  const [current, setCurrent] = useState<CountryOption | undefined>(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1] || ""

  const options: CountryOption[] = useMemo(() => {
    return (
      regions
        ?.map((r) => {
          return r.countries?.map((c) => ({
            country: c.iso_2,
            region: r.id,
            label: c.display_name,
          }))
        })
        .flat()
        .filter((o): o is CountryOption => o !== undefined)
        .sort((a, b) => a.label.localeCompare(b.label)) || []
    )
  }, [regions])

  useEffect(() => {
    if (countryCode && options.length > 0) {
      const option = options.find((o) => o.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (value: string) => {
    const option = options.find((o) => o.country === value)
    if (option) {
      updateRegion(option.country, currentPath)
    }
  }

  return (
    <div className={cn("flex items-center text-body-sm gap-x-2", className)}>
      {variant !== "inline" && <span>Shipping to:</span>}
      <Select value={current?.country} onValueChange={handleChange}>
        <SelectTrigger
          className={cn(
            "flex-1 border-t-0 rounded-none shadow-none border-x-0 gap-x-2 focus:ring-offset-0 focus:ring-0",
            variant === "inline"
              ? "text-body-sm border-transparent"
              : "border-b"
          )}
        >
          {current && <SelectValue placeholder={current.label} />}
        </SelectTrigger>
        <SelectContent className="max-h-[442px] text-body-sm overflow-y-auto">
          {options.map((o, index) => (
            <SelectItem
              key={index}
              value={o.country}
              className="cursor-pointer"
            >
              <div
                className={cn(
                  "flex  items-center gap-x-2",
                  variant === "inline" ? "text-body-sm" : "text-body"
                )}
              >
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={o.country}
                />
                {o.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountrySelect

"use client"

import { usePathname } from "next/navigation"
import React from "react"

export type BreadcrumbItemProps = {
  label: string
  href: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export function useBreadCrumbs() {
  const pathname = usePathname()

  const segments = React.useMemo(
    () =>
      pathname ? pathname.split("/").filter((segment) => segment !== "") : [],
    [pathname]
  )

  const items = React.useMemo<BreadcrumbItemProps[]>(
    () =>
      segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`
        const decodedSegment = decodeURIComponent(segment)
        return {
          label: convertBreadcrumbTitle(decodedSegment),
          href: path,
        }
      }),
    [segments]
  )

  return React.useMemo(
    () => ({
      breadcrumbs: items,
    }),
    [items]
  )
}

export function convertBreadcrumbTitle(string: string) {
  return decodeURIComponent(string)
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toLowerCase()
}

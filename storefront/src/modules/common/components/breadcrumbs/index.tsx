"use client"
import { BreadcrumbItemProps, useBreadCrumbs } from "./use-breadcrumbs"
import { ChevronRight } from "lucide-react"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import LocalizedClientLink from "../localized-client-link"

const Breadcrumbs = ({
  breadcrumbs: crumbs,
}: {
  breadcrumbs?: BreadcrumbItemProps[]
}) => {
  const { breadcrumbs } = useBreadCrumbs()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <LocalizedClientLink
            href="/"
            className="capitalize transition-colors hover:text-foreground"
          >
            Home
          </LocalizedClientLink>
        </BreadcrumbItem>
        {(crumbs ?? breadcrumbs).map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <LocalizedClientLink
                href={breadcrumb.href}
                className="capitalize transition-colors hover:text-foreground"
              >
                {breadcrumb.label}
              </LocalizedClientLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default Breadcrumbs

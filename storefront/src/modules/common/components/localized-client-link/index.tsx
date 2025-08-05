"use client"

import { cn } from "@lib/utils"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string
  target?: string
  underlineColor?: string
}

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: any
}) => {
  const { countryCode } = useParams()

  return (
    <Link href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink

export const LocalizedClientLinkButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, href, target, underlineColor, ...props }, ref) => {
  const { countryCode } = useParams()

  return (
    <Link href={`/${countryCode}${href}`} passHref target={target}>
      <button
        {...props}
        ref={ref}
        className={cn(
          "relative after:absolute text-body-sm cursor-pointer after:bottom-0 after:left-0 after:h-[2px] after:bg-cm-primary after:w-full after:origin-bottom-right after:scale-x-0  after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100",
          className,
          underlineColor
        )}
      >
        {children}
      </button>
    </Link>
  )
})

LocalizedClientLinkButton.displayName = "LocalizedClientLinkButton"

"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { Menu, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet"
import { Button } from "components/ui/button"
import { useState } from "react"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="!p-0 !m-0">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="border-none rounded-r-3xl bg-foreground/60 backdrop-blur-xl text-background"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Side Menu</SheetTitle>
          <div className="flex justify-end" id="xmark">
            <button
              data-testid="close-menu-button"
              onClick={close}
              className="cursor-pointer"
            >
              <X />
            </button>
          </div>
        </SheetHeader>
        <div data-testid="nav-menu-popup" className="flex flex-col h-full">
          <ul className="flex flex-col items-start justify-start gap-6 p-6">
            {Object.entries(SideMenuItems).map(([name, href]) => {
              return (
                <li key={name}>
                  <LocalizedClientLink
                    href={href}
                    className="text-3xl leading-10 hover:text-muted/80"
                    onClick={close}
                    data-testid={`${name.toLowerCase()}-link`}
                  >
                    {name}
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
          <SheetFooter className="flex flex-col gap-y-6">
            {regions && (
              <CountrySelect onOpenChange={setOpen} regions={regions} />
            )}
            <p className="flex justify-between text-xs font-base">
              © {new Date().getFullYear()} Sterling Nutrition. All rights
              reserved.
            </p>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SideMenu

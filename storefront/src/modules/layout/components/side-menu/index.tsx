"use client"

import LocalizedClientLink, {
  LocalizedClientLinkButton,
} from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet"
import { useState } from "react"
import { SideMenuBtn } from "./side-menu-btn"

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
        <SideMenuBtn open={open} setOpen={setOpen} />
      </SheetTrigger>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="border-none sm:rounded-r-3xl"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Side Menu</SheetTitle>
          <div className="flex justify-end" id="xmark">
            <button
              data-testid="close-menu-button"
              onClick={close}
              className="cursor-pointer"
            >
              <X className="size-10 stroke-1" />
            </button>
          </div>
        </SheetHeader>
        <div data-testid="nav-menu-popup" className="flex flex-col h-full">
          <ul className="flex flex-col items-start justify-start gap-6 p-6">
            {Object.entries(SideMenuItems).map(([name, href]) => {
              return (
                <li key={name}>
                  <LocalizedClientLinkButton
                    href={href}
                    className="text-subtitle "
                    onClick={close}
                    data-testid={`${name.toLowerCase()}-link`}
                  >
                    {name}
                  </LocalizedClientLinkButton>
                </li>
              )
            })}
          </ul>
          <SheetFooter className="flex flex-col gap-y-6">
            {regions && (
              <CountrySelect onOpenChange={setOpen} regions={regions} />
            )}
            <p className="flex justify-between text-body">
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

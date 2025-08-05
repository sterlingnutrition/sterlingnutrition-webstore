import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink, {
  LocalizedClientLinkButton,
} from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Search, ShoppingCart, UserRound } from "lucide-react"
import Image from "next/image"
import CountrySelect from "@modules/layout/components/country-select"
import Marquee from "components/ui/marquee"

export const SideMenuItems = {
  Home: "/",
  Store: "/store",
  "About Us": "/about",
  Contact: "/contact",
}

const marqueeItems = [
  "Great products",
  "-",
  "Fast shipping",
  "-",
  "Excellent customer service",
  "-",
]

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <>
      <div className="w-full bg-cm-primary py-1">
        <div className=" content-container items-center grid grid-cols-2 md:grid-cols-4">
          <LocalizedClientLinkButton href="tel:+94771234567">
            Contact <span className="font-semibold">+94 77 123 4567</span>
          </LocalizedClientLinkButton>
          <div className="hidden md:block md:col-span-2">
            <Marquee pauseOnHover className="[--duration:20s]">
              {marqueeItems.map((item, index) => (
                <span key={index} className="text-body-sm font-medium">
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
          <div className="flex items-center justify-end">
            {regions && <CountrySelect variant="inline" regions={regions} />}
          </div>
        </div>
      </div>
      <div className="sticky inset-x-0 top-0 z-50 group">
        <header className="relative mx-auto duration-200 bg-white border-b border-ui-border-base">
          <nav className="grid grid-cols-2 lg:grid-cols-5 w-full content-container ">
            <div className="flex items-center h-full gap-4">
              <div className="lg:hidden">
                <SideMenu regions={regions} />
              </div>

              <LocalizedClientLink
                href="/"
                className="relative uppercase h-14 md:h-16 aspect-video"
                data-testid="nav-store-link"
              >
                <Image
                  src={"/sterling-logo.png"}
                  alt={"Sterling Logo"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </LocalizedClientLink>
            </div>
            <ul className="hidden lg:flex items-center  lg:col-span-3 justify-center gap-8">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <li key={name}>
                    <LocalizedClientLinkButton
                      href={href}
                      className="text-body font-semibold text-foreground"
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {name}
                    </LocalizedClientLinkButton>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-end flex-1 h-full gap-x-4 sm:gap-x-6 basis-0 font-base">
              <LocalizedClientLink
                className=""
                href="/search"
                data-testid="nav-search-link"
              >
                <Search className="stroke-[1.5]" />
              </LocalizedClientLink>
              <LocalizedClientLink
                className=""
                href="/account"
                data-testid="nav-account-link"
              >
                <UserRound className="stroke-[1.5]" />
              </LocalizedClientLink>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex gap-2 "
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <ShoppingCart className="stroke-[1.5]" />0
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}

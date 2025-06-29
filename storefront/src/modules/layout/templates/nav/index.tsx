import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Search, ShoppingCart, UserRound } from "lucide-react"
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky inset-x-0 top-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-white border-b border-ui-border-base">
        <nav className="flex items-center justify-between w-full h-full content-container">
          <div className="flex items-center flex-1 h-full gap-4 basis-0">
            <SideMenu regions={regions} />

            <LocalizedClientLink
              href="/"
              className="relative uppercase h-14 sm:h-18 aspect-video "
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

          <div className="flex items-center justify-end flex-1 h-full gap-x-4 sm:gap-x-6 basis-0 font-base">
            <LocalizedClientLink
              className=""
              href="/search"
              scroll={false}
              data-testid="nav-search-link"
            >
              <Search />
            </LocalizedClientLink>
            <LocalizedClientLink
              className=""
              href="/account"
              data-testid="nav-account-link"
            >
              <UserRound />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 "
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart />0
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

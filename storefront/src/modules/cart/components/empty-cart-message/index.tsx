import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-center"
      data-testid="empty-cart-message"
    >
      <h1 className="text-subtitle-sm font-medium">Cart</h1>

      <p className="text-body my-6 max-w-2xl text-center">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </p>
      <div>
        <LocalizedClientLink href="/store">
          <Button size="expanded" className="uppercase rounded-full">
            Explore products
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage

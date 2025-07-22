import { Separator } from "components/ui/separator"
import TextReveal from "components/ui/text-reveal"
import React from "react"

const TRUST_ITEMS = [
  {
    title: "COD & Contactless Delivery",
    content:
      "Enjoy the convenience of cash on delivery and contactless delivery options. We ensure a safe and secure shopping experience, so you can focus on what matters most.",
    key: "delivery",
  },
  {
    title: "Secured Online Payment",
    content:
      "Shop with confidence! Our website is secured with the latest encryption technology, ensuring your personal and payment information is safe and protected at all times.",
    key: "payment",
  },
  {
    title: "100% Authentic Products",
    content:
      "We guarantee that all our products are 100% authentic and sourced directly from trusted manufacturers. Your health and safety are our top priorities, so you can shop with peace of mind.",
    key: "authenticity",
  },
]

const TrustSection = () => {
  return (
    <div className=" md:py-16 lg:py-32">
      <Separator className="hidden md:block bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
      <div className="grid grid-cols-1 content-container md:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item.key} className="flex min-h-48 md:min-h-80">
            <Separator
              orientation="vertical"
              className="bg-gradient-to-t from-transparent via-muted-foreground to-transparent"
            />
            <div className="w-full">
              <h1 className="p-6 md:p-10 2xl:py-16 text-subtitle-sm font-medium font-elegant">
                {item.title}
              </h1>
              <Separator className="bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
              <TextReveal>
                <p className="flex-1 h-full p-6 md:p-10 text-body-sm">
                  {item.content}
                </p>
              </TextReveal>
            </div>
            <Separator
              orientation="vertical"
              className="bg-gradient-to-t from-transparent via-muted-foreground to-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustSection

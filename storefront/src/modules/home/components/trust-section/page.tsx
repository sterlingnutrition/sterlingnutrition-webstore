import { Separator } from "components/ui/separator"
import TextReveal from "components/ui/text-reveal"
import { DollarSign, Gift, Truck, Users } from "lucide-react"
import React from "react"

const TRUST_ITEMS = [
  {
    title: "fast delivery",
    content: "West & East coast dispatch",
    key: "delivery",
    icon: Truck,
  },
  {
    title: "free gift with order $150+",
    content: "Multiple gift options available",
    key: "payment",
    icon: Gift,
  },
  {
    title: "click & collect",
    content: "Check your local stores now",
    key: "authenticity",
    icon: DollarSign,
  },
  {
    title: "2m+ happy customers",
    content: "Here to support your journey",
    key: "customers",
    icon: Users,
  },
]

const TrustSection = () => {
  return (
    <div className="section-container md:!pt-20">
      <Separator className="hidden md:block bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
      <div className="grid grid-cols-2 content-container md:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item.key} className="flex min-h-48 md:min-h-80">
            <Separator
              orientation="vertical"
              className="bg-gradient-to-t from-transparent via-muted-foreground to-transparent"
            />
            <div className="w-full">
              <div className="flex justify-center items-center py-10">
                <item.icon className="size-12 lg:size-16 text-primary stroke-[1.5]" />
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />
              <div className="p-6 lg:px-10 ">
                <TextReveal>
                  <h1 className=" text-body-playfair mb-4 uppercase font-bold font-elegant">
                    {item.title}
                  </h1>
                  <p className="flex-1 h-full text-body-sm">{item.content}</p>
                </TextReveal>
              </div>
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

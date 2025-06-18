import TextReveal from "components/ui/text-reveal"
import React from "react"

const TRUST_ITEMS = [
  {
    title: "Free shipping on orders over $70!*",
    content: "*Excludes Alaska and Hawaii. Sorry guys, one day soon!!",
    key: "shipping",
  },
  {
    title: "Client Support",
    content:
      "Elevate your routine, hassle-free. No questions asked. Reach us at hello@lumbazzi.com with any concern. We will take care of you.",
    key: "support",
  },
  {
    title: "Become a Partner",
    content:
      "Get paid to help others feel and look their best! Join our ambassador program to unlock exclusive benefits with your personal affiliate link. Click 'Partnership' below to learn more.",
    key: "partner",
  },
]

const TrustSection = () => {
  return (
    <div className="grid grid-cols-1 px-4 mx-auto md:py-16 md:grid-cols-3 sm:px-10 lg:py-32">
      {TRUST_ITEMS.map((item) => (
        <div key={item.key} className="min-h-48 md:min-h-80">
          <h1 className="p-6 font-light border border-b-0 md:border-b md:p-10 text-subtitle-sm font-playfair">
            {item.title}
          </h1>
          <TextReveal>
            <p className="flex-1 h-full px-6 border border-t-0 md:border-b-0 md:p-10 text-body-sm">
              {item.content}
            </p>
          </TextReveal>
        </div>
      ))}
    </div>
  )
}

export default TrustSection

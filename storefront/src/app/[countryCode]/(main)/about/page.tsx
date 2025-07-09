import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"
import Image from "next/image"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"

const AboutPage = () => {
  return (
    <>
      <div className="flex" data-testid="account-page">
        <div className="relative w-full hidden small:block small:w-1/2 aspect-square">
          <Image
            src="/showcase/showcase-1.webp"
            fill
            style={{ objectFit: "cover" }}
            alt="Contact Image"
          />
        </div>
        <div className="relative w-full small:w-1/2 h-full content-container  bg-white flex flex-col items-center justify-center">
          <div className="flex flex-col small:flex-row items-center text-center small:text-start justify-between small:border-t border-gray-200 py-12 gap-8">
            <div>
              <h3 className="text-subtitle-sm mb-2">Got questions?</h3>
              <span className="text-body-sm">
                Our team is here to help you with any questions or concerns you
                may have.
              </span>
            </div>
            <div>
              <LocalizedClientLink href="/contact">
                <Button variant="hollow" className="uppercase">
                  Contact Us
                </Button>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
      <CTA />
      <TrustSection />
    </>
  )
}

export default AboutPage

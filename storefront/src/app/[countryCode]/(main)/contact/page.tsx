import React from "react"
import Image from "next/image"
import CTA from "@modules/home/components/cta"
import TrustSection from "@modules/home/components/trust-section/page"
import ContactForm from "@modules/contact/components/contact-form"
import ContactInfo from "@modules/contact/components/contact-info"
import TextReveal from "components/ui/text-reveal"

const ContactPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/showcase/showcase-1.webp"
          fill
          style={{ objectFit: "cover" }}
          alt="Contact Image"
          className="z-0"
        />
        <div className="relative z-20 text-center text-white px-4">
          <TextReveal>
            <h1 className="text-title-sm !text-white mb-4 font-elegant">
              Contact Us
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              We're here to help and answer any questions you might have.
            </p>
          </TextReveal>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <h2 className="text-subtitle-sm font-medium font-elegant mb-8">
              Send us a message
            </h2>
            <ContactForm />
          </div>
          {/* Contact Information */}
          <div>
            <h2 className="text-subtitle-sm font-medium font-elegant mb-2">
              Other ways to reach us
            </h2>
            <p className="text-gray-600 mb-8">
              Choose the method that works best for you.
            </p>
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.158170978971!2d-122.4194155846823!3d37.77492997975922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <CTA />
      <TrustSection />
    </>
  )
}

export default ContactPage

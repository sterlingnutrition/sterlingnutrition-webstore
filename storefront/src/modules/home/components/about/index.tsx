import { Button } from "components/ui/button"
import TextReveal from "components/ui/text-reveal"
import React from "react"

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto sm:px-10 lg:py-32">
      <TextReveal>
        <h1 className="max-w-4xl mb-10 text-center text-subtitle font-playfair">
          {"High Performance Natural Men's Care"}
          <span className="italic">Trusted By Leaders</span>
        </h1>
        <p className="max-w-4xl mx-auto mb-10 text-center text-body font-roboto">
          {`We believe in holistic wellness—combining the best of nature and science to deliver supplements that work. Starting with a single product (Black Seed Oil), we’ve grown into a trusted name, now distributing Goli, Hab Shifa, and Immuneti across Singapore.`}
        </p>
      </TextReveal>
      <Button className="uppercase" variant="hollow">
        Learn More
      </Button>
    </div>
  )
}

export default About

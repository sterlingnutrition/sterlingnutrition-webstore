import { Button } from "components/ui/button"
import TextReveal from "components/ui/text-reveal"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative w-full flex flex-col  border-b bg-gradient-to-tr from-green-950 to-green-800 text-background border-ui-border-base">
      <div className="z-10 flex flex-col items-center gap-6 px-4 py-16 text-center font-elegant small:pt-24">
        <TextReveal>
          <h1 className="mb-4 text-body">
            Holistic Wellness • Authentic Products • Trusted in Singapore
          </h1>
          <h1 className="max-w-5xl mx-auto mb-10 text-4xl tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
            Your Trusted Source for Premium Wellness Supplements
          </h1>
          <h1 className="max-w-xl mx-auto mb-6 text-body font-base">
            From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed
            Oil—backed by science, delivered with care.
          </h1>
        </TextReveal>
        <Button className="uppercase border-background" variant="hollow">
          Experience Excellence
        </Button>
      </div>
      <div className="absolute bottom-0 ">
        <Image
          src="/grass-background.webp"
          alt="Grass Background"
          height={1080}
          width={1920}
        />
      </div>
      <div className=" flex justify-center w-full z-[1]  mt-auto">
        <Image
          src="/hero-products.webp"
          alt="Hero Background"
          height={720}
          width={1280}
        />
      </div>
    </div>
  )
}

export default Hero

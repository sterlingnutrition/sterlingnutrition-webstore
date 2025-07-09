import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import LocalizedClientLink, {
  LocalizedClientLinkButton,
} from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

interface FooterProps {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  description?: string
  socialLinks?: Array<{
    icon: React.ReactElement
    href: string
    label: string
  }>
  legalLinks?: Array<{
    name: string
    href: string
  }>
}

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
]

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
]

export default async function Footer({
  description = "From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed Oil—backed by science, delivered with care.",
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
}: FooterProps) {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="relative pt-16 lg:pt-32">
      <div className="absolute bottom-0 -z-10">
        <Image
          src="/footer-bg.webp"
          alt="Grass Background"
          height={1080}
          width={1920}
          className="opacity-20"
        />
      </div>
      <div className="content-container">
        <div className="flex flex-col justify-between w-full gap-10 pb-6 lg:pb-16 lg:flex-row lg:items-start lg:text-left">
          <div className="flex flex-col justify-between w-full gap-6 lg:items-start">
            <div className="flex items-center gap-2 lg:justify-start">
              <LocalizedClientLink
                href="/"
                className="relative uppercase h-14 sm:h-18 aspect-video txt-compact-xlarge-plus hover:text-ui-fg-base"
              >
                <Image
                  src={"/sterling-logo.png"}
                  alt={"Sterling Logo"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </LocalizedClientLink>
            </div>
            <p className="max-w-[70%] text-body-sm text-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {product_categories && product_categories?.length > 0 && (
              <div>
                <h3 className="mb-4 font-semibold text-body-sm">Categories</h3>
                <ul className="space-y-3 text-body-sm font-normal text-foreground">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        key={c.id}
                        className=" text-body-sm hover:text-primary"
                      >
                        <LocalizedClientLinkButton
                          href={`/store/categories/${c.handle}`}
                          className={clx("hover:text-ui-fg-base font-normal")}
                        >
                          {c.name}
                        </LocalizedClientLinkButton>
                        {children && (
                          <ul className="mt-2 ml-3 space-y-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLinkButton
                                  className="hover:text-ui-fg-base"
                                  href={`/store/categories/${child.handle}`}
                                >
                                  {child.name}
                                </LocalizedClientLinkButton>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {collections && collections.length > 0 && (
              <div>
                <h3 className="mb-4 font-semibold text-body-sm">Collections</h3>
                <ul className="space-y-3 text-body-sm text-foreground">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id} className="font-normal hover:text-primary">
                      <LocalizedClientLinkButton
                        href={`/store/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLinkButton>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-4 font-semibold text-body-sm">Company</h3>
              <ul className="space-y-3 text-body-sm text-foreground">
                <li className="font-normal hover:text-primary">
                  <LocalizedClientLinkButton href="/about">
                    Our Story
                  </LocalizedClientLinkButton>
                </li>
                <li className="font-normal hover:text-primary">
                  <LocalizedClientLinkButton href="/about">
                    Why Sterling
                  </LocalizedClientLinkButton>
                </li>
                <li className="font-normal hover:text-primary">
                  <LocalizedClientLinkButton href="/contact">
                    Contact Us
                  </LocalizedClientLinkButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 py-8 mt-8 border-t md:gap-4 text-body-sm text-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">
            © {new Date().getFullYear()} Sterling Nutrition. All rights
            reserved.
          </p>
          <ul className="flex order-1 gap-2 md:gap-4 md:order-2 ">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <LocalizedClientLinkButton href={link.href}>
                  {link.name}
                </LocalizedClientLinkButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

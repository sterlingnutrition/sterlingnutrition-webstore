import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
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
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  description = "From Goli Ashwagandha Gummies to 100% Cold-Pressed Black Seed Oil—backed by science, delivered with care.",
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
}: FooterProps) {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="pt-32">
      <div className="px-4 mx-auto 2xl:container sm:px-10">
        <div className="flex flex-col justify-between w-full gap-10 pb-16 lg:flex-row lg:items-start lg:text-left">
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
            <p className="max-w-[70%] text-base text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
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
                <h3 className="mb-4 font-bold">Categories</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
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
                      <li key={c.id} className="font-medium hover:text-primary">
                        <LocalizedClientLink
                          href={`/categories/${c.handle}`}
                          className={clx("hover:text-ui-fg-base")}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="mt-2 ml-3 space-y-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-ui-fg-base"
                                  href={`/categories/${child.handle}`}
                                >
                                  {child.name}
                                </LocalizedClientLink>
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
                <h3 className="mb-4 font-bold">Collections</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id} className="font-medium hover:text-primary">
                      <LocalizedClientLink href={`/collections/${c.handle}`}>
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <LocalizedClientLink href="/about">
                    Our Story
                  </LocalizedClientLink>
                </li>
                <li className="font-medium hover:text-primary">
                  <LocalizedClientLink href="/about">
                    Why Sterling
                  </LocalizedClientLink>
                </li>
                <li className="font-medium hover:text-primary">
                  <LocalizedClientLink href="/contact">
                    Contact Us
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 py-8 mt-8 text-xs font-medium border-t text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">
            © {new Date().getFullYear()} Sterling Nutrition. All rights
            reserved.
          </p>
          <ul className="flex flex-col order-1 gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

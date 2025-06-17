import React from "react"
import ShowcaseSection from "./components/showcase-section"

export type ShowcaseProduct = (typeof SHOWCASE_PRODUCTS)[number]

const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    name: "Face Oil",
    description: "Ageless Moisture",
    features: [
      "Reduces appearance of fine lines and wrinkles.",
      "Helps soothe and calm the look of irritated skin.",
      "Lightweight and fast-absorbing for a balanced complexion, ideal for all skin types.",
    ],
    url: "/products/colla-white-plus",
    image: "/showcase/showcase-1.webp",
  },
  {
    id: 2,
    name: "Beard Oil",
    description: "Conditioned for Confidence.",
    features: [
      "Hydrates and nourishes both beard and skin to help prevent dryness and flakes.",
      "Softens beard with each use.",
      "Adds a natural, healthy-looking shine without feeling greasy or heavy.",
    ],
    url: "/products/colla-white-plus",
    image: "/showcase/showcase-2.webp",
  },
  {
    id: 3,
    name: "Beard Butter",
    description: "Soft To The Touch Feel",
    features: [
      "Deeply conditions and nourishes to promote a soft, healthy looking beard.",
      "Provides lasting moisture while maintaining a lightweight, non-greasy feel.",
      "Smooths and tames unruly hairs, enhancing manageability and style.",
    ],
    url: "/products/colla-white-plus",
    image: "/showcase/showcase-3.webp",
  },
]

const ShowcaseProducts = () => {
  return SHOWCASE_PRODUCTS.map((product, index) => (
    <ShowcaseSection {...product} key={index} />
  ))
}

export default ShowcaseProducts

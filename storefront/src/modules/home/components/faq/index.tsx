import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"
import TextReveal from "components/ui/text-reveal"
import React from "react"

const FAQ_ITEMS = [
  {
    question: "What is Beard Butter used for?",
    answer:
      "Deeply conditioning the beard hair and hydrating the skin. This is best for medium to long length beards where the skin is further from the ends of the beard and more prone to drying, flakes and a coarse feeling.",
  },
  {
    question: "What is Beard Oil used for?",
    answer:
      "Hydrating the skin and softening the beard hair. This is best for short to medium length beards where the skin is closer to the ends of the beard and more prone to drying, flakes and a coarse feeling.",
  },
  {
    question: "How do I use Beard Butter?",
    answer:
      "Scoop a small amount of butter into your palm, rub your hands together to warm it up, then apply it evenly throughout your beard, focusing on the ends and the skin underneath.",
  },
  {
    question: "How do I use Beard Oil?",
    answer:
      "Apply a few drops of oil into your palm, rub your hands together, and massage it into your beard and skin, ensuring even distribution.",
  },
  {
    question: "Can I use both Beard Butter and Beard Oil?",
    answer:
      "Yes, you can use both products. Use Beard Oil daily for hydration and Beard Butter a few times a week for deep conditioning.",
  },
]

const FAQ = () => {
  return (
    <div className="py-16 content-container">
      <TextReveal>
        <h1 className="mb-10 text-center uppercase lg:mb-16 text-title-sm font-elegant">
          FAQs
        </h1>
      </TextReveal>
      <Accordion type="single" collapsible className="w-full max-w-6xl mx-auto">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="px-4 border-t border-b-0 last:border-b border-foreground/90"
          >
            <AccordionTrigger className="font-semibold text-body-sm">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-body text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ

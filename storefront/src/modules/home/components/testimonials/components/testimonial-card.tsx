import React from "react"
import { Quote } from "lucide-react"

interface Testimonial {
  title: string
  description: string
  name: string
}

const TestimonialCard = ({ title, description, name }: Testimonial) => {
  return (
    <div className="flex flex-col items-center w-full text-center text-background">
      {/* Quote icon at top */}
      <div className="flex items-center gap-2">
        <Quote className="size-5 md:size-8 mb-4 rotate-180" />
        <Quote className="size-5 md:size-8 mb-4 " />
      </div>

      {/* Testimonial content */}
      <div className="flex-1">
        <h3 className="mb-6 italic text-subtitle font-elegant !text-background">
          {title}
        </h3>
        <p className="max-w-4xl mb-6 text-body-sm">{description}</p>
      </div>

      {/* Author info */}
      <div className="mt-auto">
        <p className="text-body-sm text-muted">{name}</p>
      </div>
    </div>
  )
}

export default TestimonialCard

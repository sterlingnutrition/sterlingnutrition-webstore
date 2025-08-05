import { cn } from "@lib/utils"
import React from "react"

const Button = ({
  className,
  loading,
  children,
  disabled,
  loadingText = "Loading...",
  ...props
}: React.ComponentProps<"button"> & {
  loading?: boolean
  loadingText?: string
}) => {
  return (
    <button
      {...props}
      className={cn(
        "group group-hover:before:duration-500 group-hover:after:duration-1000 uppercase after:duration-500 hover:border-cm-primary  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-cm-primary hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative h-16 w-64 border text-left p-3 px-6 text-gray-50 text-base font-bold rounded-full  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur",
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button

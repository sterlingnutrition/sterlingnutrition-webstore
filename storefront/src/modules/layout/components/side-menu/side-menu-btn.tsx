"use client"

import { cn } from "@lib/utils"
import { motion } from "motion/react"

export const SideMenuBtn = ({
  open,
  setOpen,
  className,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  className?: string
}) => {
  return (
    <button
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex aspect-square h-fit select-none flex-col items-center justify-center rounded-full",
        className
      )}
    >
      <motion.div
        style={{
          width: "20px",
          borderTop: "2px solid #000",
          transformOrigin: "center",
        }}
        initial={{ translateY: "-3px" }}
        animate={
          open
            ? { rotate: "45deg", translateY: "1px" }
            : { translateY: "-3px", rotate: "0deg" }
        }
        transition={{ bounce: 0, duration: 0.1 }}
      />
      <motion.div
        transition={{ bounce: 0, duration: 0.1 }}
        style={{
          width: "20px",
          borderTop: "2px solid #000",
          transformOrigin: "center",
        }}
        initial={{ translateY: "3px" }}
        animate={
          open
            ? { rotate: "-45deg", translateY: "-1px" }
            : { translateY: "3px", rotate: "0deg", scaleX: 1 }
        }
      />
    </button>
  )
}

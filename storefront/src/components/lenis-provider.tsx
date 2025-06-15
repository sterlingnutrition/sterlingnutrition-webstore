"use client"
import React from "react"
import { ReactLenis } from "lenis/dist/lenis-react"

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>
}

export default LenisProvider

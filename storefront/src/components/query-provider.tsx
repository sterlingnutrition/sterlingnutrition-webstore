"use client"
import React, { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { getQueryClient } from "@lib/query-client"

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider

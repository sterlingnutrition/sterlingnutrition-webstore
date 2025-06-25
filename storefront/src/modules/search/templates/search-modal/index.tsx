"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { useRef } from "react"
import { Search } from "lucide-react"
import { ScrollArea } from "components/ui/scroll-area"
import { useClickAway, useKeyPressEvent } from "react-use"

export default function SearchModal() {
  const router = useRouter()
  const searchRef = useRef(null)

  useClickAway(searchRef, () => {
    router.back()
  })

  return (
    <div className="relative z-75">
      <div className="fixed inset-0 w-screen h-screen bg-foreground/40 backdrop-blur-md" />
      <div className="fixed inset-0 ">
        <div className="flex items-center justify-center w-full h-full">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div
              className="absolute flex flex-col w-full px-4 max-w-[800px]"
              data-testid="search-modal-container"
              ref={searchRef}
            >
              <div className="w-full flex items-center gap-x-2 p-4 border-[rgba(3,7,18,0.5)] bg-white border  backdrop-blur-2xl rounded-md">
                <Search />
                <SearchBox />
              </div>
              <ScrollArea className="w-full p-4 mt-4 rounded-md h-[calc(100vh_-_8rem)] bg-background">
                <Hits hitComponent={Hit} />
              </ScrollArea>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}

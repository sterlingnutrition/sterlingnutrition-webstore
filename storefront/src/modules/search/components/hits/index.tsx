import { clx } from "@medusajs/ui"
import React, { Fragment } from "react"
import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web"

import { ProductHit } from "../hit"
import ShowAll from "../show-all"
import { Separator } from "components/ui/separator"

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const Hits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { hits } = useHits(props)

  return (
    <div
      className={clx(
        "transition-[height,max-height,opacity] duration-300 ease-in-out sm:overflow-hidden w-full max-w-[800px]",
        className,
        {
          "max-h-full opacity-100": !!query,
          "max-h-0 opacity-0": !query && !hits.length,
        }
      )}
    >
      <div className="grid grid-cols-1 gap-1 mb-4" data-testid="search-results">
        {hits.map((hit, index) => (
          <Fragment key={index}>
            <li className={clx("list-none")}>
              <Hit hit={hit as unknown as ProductHit} />
            </li>
            <Separator />
          </Fragment>
        ))}
      </div>
      <ShowAll />
    </div>
  )
}

export default Hits

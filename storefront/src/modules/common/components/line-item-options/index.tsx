import { cn } from "@lib/utils"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  className?: string
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  className,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className={cn(
        "inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis",
        className
      )}
    >
      Variant: {variant?.title}
    </Text>
  )
}

export default LineItemOptions

import { Label } from "components/ui/label"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-3">
      <p className="txt-compact-small-plus text-ui-fg-muted">{title}</p>
      <RadioGroup
        value={value}
        data-testid={dataTestId}
        onValueChange={handleChange}
      >
        {items?.map((i) => (
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={i.value} id={i.value} />
            <Label htmlFor={i.value}>{i.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup

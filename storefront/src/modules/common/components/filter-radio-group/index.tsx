import { Label } from "components/ui/label"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"

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
    <div className="flex items-center gap-3">
      <Select
        value={value}
        onValueChange={handleChange}
        data-testid={dataTestId}
      >
        <SelectTrigger className="w-[180px] border-x-0 border-t-0 border-foreground/80 shadow-none rounded-none">
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {items?.map((i) => (
            <SelectItem key={i.value} value={i.value}>
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterRadioGroup

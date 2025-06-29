import { cn } from "@lib/utils"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <span className={cn("text-sm ", className)}>
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </span>
  )
}

export default PaymentTest

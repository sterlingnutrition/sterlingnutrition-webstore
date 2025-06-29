import * as RadioGroup from "@radix-ui/react-radio-group"
import React from "react"
import PaymentTest from "../payment-test"
import { isManual } from "@lib/constants"
import { cn } from "@lib/utils"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <>
      <RadioGroup.Item
        key={paymentProviderId}
        value={paymentProviderId}
        disabled={disabled}
        className="ring-[1px] w-full ring-border rounded p-4 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
      >
        <div className="flex items-center w-full gap-x-4">
          <div
            className={cn(
              "size-2 bg-muted-foreground rounded-full",
              selectedPaymentOptionId === paymentProviderId && "bg-blue-500"
            )}
          />
          <span className="font-medium mr-auto">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </span>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="hidden small:block" />
          )}
          <span className="justify-self-end text-ui-fg-base">
            {paymentInfoMap[paymentProviderId]?.icon}
          </span>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="small:hidden text-[10px]" />
          )}
        </div>
      </RadioGroup.Item>
    </>
  )
}

export default PaymentContainer

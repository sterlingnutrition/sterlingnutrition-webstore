"use client"

import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "components/ui/card"
import { Label } from "components/ui/label"
import { Collapsible, CollapsibleContent } from "components/ui/collapsible"
import { Alert, AlertDescription } from "components/ui/alert"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => setIsOpen(!isOpen), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess])

  return (
    <Card className="w-full" data-testid={dataTestid}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <Label className="text-sm uppercase text-muted-foreground">
            {label}
          </Label>
          <div className="text-sm font-medium" data-testid="current-info">
            {typeof currentInfo === "string" ? currentInfo : currentInfo}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggle}
          type="button"
          data-testid="edit-button"
          data-active={isOpen}
        >
          {isOpen ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>

      {/* Success state */}
      <Collapsible open={isSuccess}>
        <CollapsibleContent className="overflow-hidden">
          <Alert className="mx-4 mb-4" data-testid="success-message">
            <AlertDescription>{label} updated successfully</AlertDescription>
          </Alert>
        </CollapsibleContent>
      </Collapsible>

      {/* Error state */}
      <Collapsible open={isError}>
        <CollapsibleContent className="overflow-hidden">
          <Alert
            variant="destructive"
            className="mx-4 mb-4"
            data-testid="error-message"
          >
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </CollapsibleContent>
      </Collapsible>

      {/* Edit form */}
      <Collapsible open={isOpen}>
        <CollapsibleContent className="overflow-hidden">
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">{children}</div>
          </CardContent>
          <CardFooter className="flex justify-end p-4 pt-0">
            <Button
              loading={pending}
              size="expanded"
              type="submit"
              data-testid="save-button"
            >
              Save changes
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

export default AccountInfo

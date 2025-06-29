import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"
import { Card, CardContent } from "components/ui/card"

const SignInPrompt = () => {
  return (
    <Card className="p-0 m-0 shadow-none border-none">
      <CardContent className=" flex items-center justify-between p-0">
        <div>
          <h1 className="text-body">Already have an account?</h1>
          <p className="text-sm mt-1">Sign in for a better experience.</p>
        </div>
        <LocalizedClientLink href="/account">
          <Button data-testid="sign-in-button" size="expanded">
            Sign in
          </Button>
        </LocalizedClientLink>
      </CardContent>
    </Card>
  )
}

export default SignInPrompt

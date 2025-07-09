"use client"

import { useFormState } from "react-dom"

import { FloatingLabelInput as Input } from "components/ui/floating-input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { LocalizedClientLinkButton } from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signup, null)

  return (
    <div className="flex flex-col items-center" data-testid="register-page">
      <h1 className="text-subtitle-sm text-center uppercase mb-6">
        Join the Sterling Nutrition Family
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Create an account to enjoy exclusive benefits, personalized offers, and
        a seamless shopping experience.
      </p>
      <form className="w-full max-w-sm flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLinkButton
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLinkButton>{" "}
          and{" "}
          <LocalizedClientLinkButton
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLinkButton>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register

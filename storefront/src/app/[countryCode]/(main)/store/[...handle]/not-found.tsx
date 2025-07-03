import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "components/ui/button"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Error icon/illustration */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-rose-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-rose-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The category or collection you're looking for doesn't exist or may
          have been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LocalizedClientLink href="/store">
            <Button size="expanded">Browse All Products</Button>
          </LocalizedClientLink>

          <Link href="/" passHref>
            <Button variant="outline" size="expanded">
              Return Home
            </Button>
          </Link>
        </div>

        {/* Additional help */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Can't find what you're looking for?{" "}
          <Link
            href="/contact"
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            Contact us
          </Link>{" "}
          for assistance.
        </p>
      </div>
    </div>
  )
}

export default NotFound

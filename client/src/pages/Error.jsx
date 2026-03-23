import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import error  from "../assets/error.svg"

const Error = () => {
  return (
    <main className="page-container section-spacing flex-1">
      <div className="surface grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <div className="w-full">
          <img src={error} alt="Not found" />
        </div>

        <div className="w-full space-y-4">
          <span className="inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            404 Not Found
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            This page is not available right now.
          </h1>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            The content you are looking for may have been moved, removed, or the link might be incorrect.
          </p>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            Head back to the homepage to continue your trip planning.
          </p>
          <Link to="/" className="inline-flex">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Error
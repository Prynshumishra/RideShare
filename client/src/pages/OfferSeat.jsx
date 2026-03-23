import PublishCard from "@/components/PublishCard"

const OfferSeat = () => {
  const steps = [
    {
      step: 1,
      title: "Create your account",
      description: "Add your profile picture, a few words about you and your phone number to increase trust between members."
    },
    {
      step: 2,
      title: "Publish a ride",
      description: "Indicate departure and arrival points, the date of the ride and check our recommended price to increase your chances of getting your first passengers and ratings."
    },
    {
      step: 3,
      title: "Enjoy the ride",
      description: "That's how easy it is to start saving on travel costs!"
    },
  ]
  return (
    <main className="page-container section-spacing">
      <header className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
          Publish a ride in
          <span className="text-gradient"> just minutes</span>
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Share your route details once and let matching passengers discover your ride.
        </p>
      </header>

      <section className="grid items-start gap-8 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-10">
        <div>
          <PublishCard />
        </div>

        <div className="surface p-5 sm:p-6">
          <h2 className="font-display text-2xl font-semibold">How it works</h2>
          <div className="mt-6 space-y-4">
            {steps.map((step) =>
              <div key={step.step} className="surface-muted p-4">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default OfferSeat
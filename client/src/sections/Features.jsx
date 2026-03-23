import { HandCoins, ShieldCheck, Rocket } from "lucide-react"

const Features = () => {
  const features = [
    {
      icon: <HandCoins />,
      title: "Save on travel costs",
      desc: "Share the cost of your journey with other passengers, significantly reducing your travel expenses compared to solo travelling."
    },
    {
      icon: <ShieldCheck />,
      title: "Join a trustworthy community",
      desc: "Connect with like-minded people. Meet new people who share your interest and destination through carpooling."
    },
    {
      icon: <Rocket />,
      title: "Carpooling made simple",
      desc: "Find rides with ease. Search for rides that match your destination, schedule, and preference with just a few taps."
    }
  ]
  return (
    <section className="page-container section-spacing text-foreground">
      <div className="mb-10 space-y-3 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Why commuters choose RideShare</h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          Built for everyday reliability with transparent pricing, trusted community signals, and fast booking.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {features.map((f) =>
          <article key={f.title} className="surface fade-in-up flex h-full flex-col gap-4 p-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {f.icon}
                </div>
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{f.desc}</p>
          </article>
        )}
      </div>
    </section>
  )
}

export default Features
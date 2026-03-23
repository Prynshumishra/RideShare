import bg from "@/assets/hero.svg"
import Search from "@/components/Search"

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-blue-50/80 via-cyan-50/40 to-transparent">
      <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="page-container section-spacing relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div className="space-y-6 fade-in-up">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Smart Commute Network
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Share rides,
            <span className="text-gradient"> save money</span>,
            and travel better.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Find trusted rides for your route, split travel costs, and reduce empty seats with a cleaner, faster carpool experience.
          </p>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md md:block">
          <img src={bg} className="h-full w-full" alt="Ride sharing illustration" />
        </div>
      </div>

      <div className="page-container relative -mt-3 pb-12 sm:pb-14 lg:pb-16">
        <Search />
      </div>
    </section>
  )
}

export default Hero
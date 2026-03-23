import about from "../assets/about.jpg"
const About = () => {
  return (
    <section className="page-container section-spacing">
      <div className="surface grid gap-6 overflow-hidden p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative min-h-64 overflow-hidden rounded-xl sm:min-h-80 lg:order-last">
          <img alt="People sharing a ride" src={about} className="absolute inset-0 h-full w-full object-cover"/>
        </div>

        <div className="flex flex-col justify-center gap-4 lg:pr-8">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Built for everyday travel</span>
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
            Make your commute
            <span className="text-gradient"> smarter</span> and more sustainable.
          </h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            Effortlessly connect with fellow commuters heading in the same direction, whether it is a daily office route or weekend trip.
          </p>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            RideShare helps reduce congestion and travel costs while building a trusted community around shared journeys.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
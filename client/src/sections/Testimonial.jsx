import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Testimonial = () => {
  const feedback = [
    {
      id: 1,
      desc: "RideShare made my daily commute a breeze! The app is user-friendly, and I've most some wonderfuli people through carpooling. Thank you RideShare for providing such a fantastic service.",
      img: "https://dummyimage.com/106x106",
      user: "John",
      prof: "UI Developer"
    },
    {
      id: 2,
      desc: "Ever since I started using RideShare, my daily commute has transformed into a seamless and enjoyable experience. The convenience and reliability of this app have truly exceeded my expectations. The user-friendly interface makes booking a ride a breeze.",
      img: "https://dummyimage.com/106x106",
      user: "Murphy",
      prof: "Backend Developer"
    },
    {
      id: 3,
      desc: "I just had to share my recent experience with RideShare because it has truly been a game-changer for me! From the easy sign-up process to the consistently reliable service, this app has quickly become my go-to for hassle-free transportation.",
      img: "https://dummyimage.com/106x106",
      user: "Murphy",
      prof: "Backend Developer"
    }
  ]
  return (
    <section className="page-container section-spacing text-muted-foreground">
      <div className="mb-10 space-y-3 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">What people say about RideShare</h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base">
          Real stories from members who use RideShare to cut travel costs and commute with confidence.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {feedback.map((t) =>
          <article key={t.id} className="surface flex h-full flex-col gap-4 p-6 transition-transform duration-200 hover:-translate-y-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 text-primary" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="text-sm leading-7 text-muted-foreground">{t.desc}</p>
            <div className="mt-auto inline-flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={t.img} />
              </Avatar>
              <span className="flex flex-col">
                <span className="font-semibold text-foreground">{t.user}</span>
                <span className="text-xs text-muted-foreground">{t.prof}</span>
              </span>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default Testimonial
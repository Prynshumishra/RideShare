import About from "@/sections/About"
import Features from "@/sections/Features"
import Hero from "@/sections/Hero"
import Testimonial from "@/sections/Testimonial"

const Home = () => {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <About />
      <Testimonial />
    </main>
  )
}

export default Home
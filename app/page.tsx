import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AutoScrollProjects } from "@/components/auto-scroll-projects"
import { ImageCarousel } from "@/components/image-carousel"
import { getProjects } from "@/lib/projects"

export default async function Home() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <Hero />
      <AutoScrollProjects projects={projects} />
      <ImageCarousel />
    </main>
  )
}


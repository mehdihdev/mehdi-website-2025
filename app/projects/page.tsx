import { Navbar } from '@/components/navbar'
import { ProjectsClient } from '@/components/projects-client'
import { getProjects, getAllProjectTags } from '@/lib/projects'

export default function ProjectsPage() {
  const projects = getProjects()
  const allTags = getAllProjectTags(projects)

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto">
            <ProjectsClient projects={projects} allTags={allTags} />
      </div>
      
    </div>
  )
}

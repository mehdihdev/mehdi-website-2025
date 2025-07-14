import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  image?: string
  github?: string
  website?: string
  paper?: string
  tags: string[]
  date: string
  content: string
}

export function getProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'projects')
  
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(projectsDirectory)
  const projects = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(projectsDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: name.replace(/\.md$/, ''),
        title: data.title || name.replace(/\.md$/, ''),
        description: data.description || '',
        image: data.image,
        github: data.github,
        website: data.website,
        paper: data.paper,
        tags: data.tags || [],
        date: data.date || '',
        content
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

export function getAllProjectTags(projects: Project[]): string[] {
  const tags = new Set<string>()
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getProject(slug: string): Project | null {
  const projectsDirectory = path.join(process.cwd(), 'projects')
  const filePath = path.join(projectsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    image: data.image,
    github: data.github,
    website: data.website,
    paper: data.paper,
    tags: data.tags || [],
    date: data.date || '',
    content
  }
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
  excerpt: string
}

export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts')
  
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: name.replace('.md', ''),
        title: data.title || name.replace('.md', ''),
        date: data.date || '',
        tags: data.tags || (data.category ? [data.category] : []),
        excerpt: data.excerpt || ''
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag))
  })
  return ['All', ...Array.from(tagSet).sort()]
}

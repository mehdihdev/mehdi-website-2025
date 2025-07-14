import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import ReactMarkdown from 'react-markdown'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filePath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    title: data.title || slug,
    date: data.date || '',
    tags: data.tags || (data.category ? [data.category] : []),
    excerpt: data.excerpt || '',
    content
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPost(slug)
  
  if (!post) {
    notFound()
  }

  const BackLink = () => (
    <Link 
      href="/posts" 
      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
    >
      ← Back to all posts
    </Link>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <article className="w-full px-6 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackLink />
          </div>
          
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="text-gray-600 dark:text-gray-400 italic">
                {post.excerpt || 'A detailed look into my experience'}
              </span>
            </div>
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-blue-600 dark:prose-headings:text-blue-400 prose-a:text-green-600 dark:prose-a:text-green-400 prose-strong:text-black dark:prose-strong:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <span className="text-black dark:text-white font-semibold">
                    {children}
                  </span>
                ),
                em: ({ children }) => (
                  <span className="text-blue-600 dark:text-blue-400 italic">
                    {children}
                  </span>
                ),
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 mt-8">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4 mt-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 mt-6">
                    {children}
                  </h3>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href}
                    className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 underline transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <BackLink />
          </div>
        </div>
      </article>
    </div>
  )
}

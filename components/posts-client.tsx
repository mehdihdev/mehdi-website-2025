"use client"

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Post } from '@/lib/posts'

interface PostsClientProps {
  posts: Post[]
  allTags: string[]
}

export function PostsClient({ posts, allTags }: PostsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All')

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'All') return posts
    return posts.filter(post => post.tags?.includes(selectedTag))
  }, [posts, selectedTag])

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 pt-32">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300">Posts</h1>
        
        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter:</span>
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found for "{selectedTag}"</p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <article 
              key={post.slug} 
              className="border-b border-gray-300 dark:border-gray-700 pb-12 opacity-0 animate-fadeIn"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <time className="text-gray-600 dark:text-gray-400 text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <Link href={`/posts/${post.slug}`} className="group">
                <h2 className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors mb-4">
                  {post.title}
                </h2>
              </Link>
              
              {post.tags && post.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`text-xs uppercase tracking-wider font-medium px-2 py-1 rounded transition-all duration-300 ${
                        selectedTag === tag
                          ? 'text-blue-300 bg-blue-400/20 ring-1 ring-blue-400/30'
                          : 'text-blue-400 bg-blue-400/10 hover:bg-blue-400/20'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {post.excerpt && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  )
}

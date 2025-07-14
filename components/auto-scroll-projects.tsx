'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Project } from '@/lib/projects'

interface AutoScrollProjectsProps {
  projects: Project[]
}

const cardColors = [
  'bg-orange-200 dark:bg-orange-900/30 text-orange-900 dark:text-orange-200',
  'bg-blue-200 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200',
  'bg-green-200 dark:bg-green-900/30 text-green-900 dark:text-green-200',
  'bg-purple-200 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200',
  'bg-red-200 dark:bg-red-900/30 text-red-900 dark:text-red-200',
  'bg-yellow-200 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200',
  'bg-pink-200 dark:bg-pink-900/30 text-pink-900 dark:text-pink-200',
  'bg-indigo-200 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200',
]

export function AutoScrollProjects({ projects }: AutoScrollProjectsProps) {
  const [mounted, setMounted] = useState(false)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let touchTimeout: NodeJS.Timeout

    const handleTouchStart = () => {
      setIsUserScrolling(true)
      clearTimeout(touchTimeout)
    }

    const handleTouchEnd = () => {
      touchTimeout = setTimeout(() => {
        setIsUserScrolling(false)
      }, 3000) // Resume auto-scroll 3 seconds after touch ends
    }

    const handleScroll = () => {
      setIsUserScrolling(true)
      clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        setIsUserScrolling(false)
      }, 2000)
    }

    scrollContainer.addEventListener('touchstart', handleTouchStart)
    scrollContainer.addEventListener('touchend', handleTouchEnd)
    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchend', handleTouchEnd)
      scrollContainer.removeEventListener('scroll', handleScroll)
      clearTimeout(touchTimeout)
    }
  }, [])

  if (!mounted) return null

  // Triple the projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects]

  return (
    <section className="pt-5 pb-16 overflow-hidden">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
          Some projects I've worked on:
        </h2>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          className={`flex space-x-6 ${!isUserScrolling ? 'animate-scroll' : ''}`}
          style={{
            width: 'max-content',
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <Link 
              key={`${project.slug}-${index}`}
              href={`/projects/${project.slug}`}
              className="flex-shrink-0 w-80 group"
            >
              <div className={`${cardColors[index % cardColors.length]} rounded-2xl p-6 h-64 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}>
                {/* Project Icon/Image */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                    ) : (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs opacity-60">
                    {project.tags.slice(0, 2).join(' • ')}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold mb-3 truncate">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm opacity-80 line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Bottom section */}
                <div className="mt-4 pt-4 border-t border-current/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium opacity-60">
                      Click to explore →
                    </span>
                    <div className="flex space-x-1">
                      {project.github && (
                        <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {project.website && (
                        <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


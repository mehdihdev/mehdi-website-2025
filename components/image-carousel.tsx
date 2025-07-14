"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CarouselImage {
  src: string
  caption: string
  alt: string
}

const images: CarouselImage[] = [
  {
    src: "/images/dayatberkeley.jpg",
    caption: "Beautiful day at Berkeley!",
    alt: "A Picture of a Beautiful day at Berkeley!"
  },
    {
    src: "/images/secretsanta.jpg",
    caption: "Trying to figure out Secret Santa at 4AM",
    alt: "Mehdi with his team"
  },
    {
    src: "/images/haribo.jpg",
    caption: "Crazy Candy Store in SF",
    alt: "Mehdi and Friends at a Candy Store in SF"
  },
    {
    src: "/images/eecs16bfinal.jpg",
    caption: "EECS16B Final Project",
    alt: "Mehdi working on his EECS16B final project"
  },
  {
    src: "/images/doelibrary.jpg",
    caption: "Doe Library",
    alt: "Image of Doe Library"
  },
    {
    src: "/images/workingonisefproject.jpg", 
    caption: "ISEF 2023 - Working on my project",
    alt: "Mehdi working on his ISEF project"
  }
]

export function ImageCarousel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4"
          >
            A few moments from my journey
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div 
              key={image.alt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium drop-shadow-lg leading-tight">
                    {image.caption}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
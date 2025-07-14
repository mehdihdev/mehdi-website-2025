"use client"

import { Button } from "@/components/ui/button"
import { TypedText } from "@/components/ui/typed-text"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Hero() {
  const [emailRevealed, setEmailRevealed] = useState(false)
  const [displayEmail, setDisplayEmail] = useState("hdemi [ta] deimh [otd] su")
  const scrambledEmail = "hdemi [ta] deimh [otd] su"
  const realEmail = "mehdi [at] mehdi [dot] us"
  
  const characters = "abcdefghijklmnopqrstuvwxyz[]()@."
  
  const unscrambleEmail = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayEmail(prev => 
        realEmail
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return realEmail[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )
      
      if (iteration >= realEmail.length) {
        clearInterval(interval)
        setEmailRevealed(true)
      }
      
      iteration += 1 / 3
    }, 30)
  }

  return (
    <section className="w-full px-8 py-12 pt-32 flex justify-center">
      <div className="text-left max-w-6xl">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
          <TypedText
            strings={['Mehdi Hussain', 'Welcome!']}
            typeSpeed={50}
            backSpeed={25}
            backDelay={1500}
            loop={false}
            className="text-gray-900 dark:text-white"
          />
        </h1>
        
        {/* Email Section */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-lg text-gray-600 dark:text-gray-400 font-mono">
            {displayEmail}
          </span>
          {!emailRevealed && (
            <button
              onClick={unscrambleEmail}
              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-md font-medium transition-colors"
            >
              Unscramble
            </button>
          )}
        </div>

        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-0">
          I'm Mehdi, a current sophomore @{" "}
          <a 
            href="https://www.berkeley.edu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 font-medium transition-colors"
          >
            UC Berkeley
          </a>
          {" "}studying{" "}
          <a 
            href="https://eecs.berkeley.edu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 underline decoration-2 underline-offset-2 font-medium transition-colors"
          >
            Electrical Engineering and Computer Science (EECS)
          </a>.
          <br /><br />
           I've spent the better part of the last half-decade solving problems through code, everything from building{" "}
          <a 
            href="/projects/iabatapp" 
            className="inline px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 rounded-md font-medium transition-colors"
          >
            apps to help muslims in my community
          </a>
          {" "}to creating{" "}
          <a 
            href="/projects/isef2023" 
            className="inline px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md font-medium transition-colors"
          >
            AI-powered glasses to help the blind see.
          </a>
        </p>
      </div>
    </section>
  )
}

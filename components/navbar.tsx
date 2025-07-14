"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Github, FileText, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-bold text-xl text-left font-[family-name:var(--font-mono)] text-blue-600 dark:text-blue-400" onClick={closeMobileMenu}>
              Mehdi
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link href="/projects" className="text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 transition-colors text-left">
                ~/projects.swift
              </Link>
              <Link href="/posts" className="text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 transition-colors text-left">
                ~/posts.js
              </Link>
              <Link href="/life" className="text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 transition-colors text-left">
                ~/life.log
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <Link href="https://github.com/mehdihdev" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-6 w-6" />
                <span className="sr-only">Resume</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
            <div className="px-2 py-4 space-y-2">
              <Link 
                href="/projects" 
                className="block px-3 py-2 rounded-md text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onClick={closeMobileMenu}
              >
                ~/projects.swift
              </Link>
              <Link 
                href="/posts" 
                className="block px-3 py-2 rounded-md text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onClick={closeMobileMenu}
              >
                ~/posts.js
              </Link>
              <Link 
                href="/life" 
                className="block px-3 py-2 rounded-md text-blue-500/80 hover:text-blue-600 dark:text-blue-400/80 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onClick={closeMobileMenu}
              >
                ~/life.log
              </Link>
              
              {/* Mobile External Links */}
              <div className="pt-4 border-t border-border/40 flex space-x-4">
                <Link 
                  href="https://github.com/mehdihdev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 rounded-md text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Link>
                <Link 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 rounded-md text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Resume
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


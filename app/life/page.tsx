import { Navbar } from '@/components/navbar'

export default function LifePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Coming Soon :0
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            This page is under construction
          </p>
        </div>
      </div>
    </div>
  )
}

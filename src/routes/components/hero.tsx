import { createFileRoute } from '@tanstack/react-router'
import AnimatedGridHero from '../../components/AnimatedGridHero.tsx'
import TerrainHero from '../../components/TerrainHero.tsx'

export const Route = createFileRoute('/components/hero')({
  component: HeroComponentsPage,
})

function HeroComponentsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hero Components</h1>
        <p className="text-lg text-gray-600">
          A collection of hero sections with different styles and animations.
        </p>
      </div>

      {/* Simple Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simple Hero</h2>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <SimpleHero />
        </div>
      </section>

      {/* Gradient Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gradient Hero</h2>
        <div className="rounded-lg shadow-sm border overflow-hidden">
          <GradientHero />
        </div>
      </section>

      {/* Animated Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Animated Hero</h2>
        <div className="rounded-lg shadow-sm border overflow-hidden">
          <AnimatedHero />
        </div>
      </section>

      {/* Animated Grid Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Animated Grid Hero</h2>
        <div className="rounded-lg shadow-sm border overflow-hidden">
          <AnimatedGridHero>
            <div className="text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Grid Animation
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Experience the power of animated grids with flowing light effects and dynamic patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  Explore Grid
                </button>
                <button className="px-8 py-4 bg-blue-900 bg-opacity-80 border border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </AnimatedGridHero>
        </div>
      </section>

      {/* 3D Terrain Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3D Terrain Hero</h2>
        <div className="rounded-lg shadow-sm border overflow-hidden">
          <TerrainHero />
        </div>
      </section>

      {/* Split Hero */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Split Layout Hero</h2>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <SplitHero />
        </div>
      </section>
    </div>
  )
}

// Simple Hero Component
function SimpleHero() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Build Amazing Things
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Create beautiful, responsive applications with modern tools and best practices.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  )
}

// Gradient Hero Component
function GradientHero() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Beautiful Design
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Stunning gradients and modern typography create an unforgettable experience.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Explore Now
        </button>
      </div>
    </div>
  )
}

// Animated Hero Component
function AnimatedHero() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-white opacity-5 rounded-full animate-spin"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center px-6">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            <span className="animate-gradient bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Animated
            </span>
            <br />
            Hero Section
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up-delay">
            Watch as elements come to life with smooth animations and engaging interactions.
          </p>
          <div className="animate-fade-in-up-delay-2">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Animation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Split Hero Component
function SplitHero() {
  return (
    <div className="grid md:grid-cols-2 min-h-[500px]">
      <div className="bg-gray-900 text-white p-12 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Split Layout Hero
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          A modern hero section with split content layout for maximum visual impact.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit">
          Get Started
        </button>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <p className="text-lg font-semibold">Visual Element</p>
        </div>
      </div>
    </div>
  )
}


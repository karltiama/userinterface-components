import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import LandingNav from '../components/LandingNav'
import TerrainHero from '../components/TerrainHero'

export const Route = createFileRoute('/landing')({
  component: LandingPage,
})

function useHeroFade() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const vh = window.innerHeight
        const fadeStart = vh * 0.15
        const fadeEnd = vh * 0.55
        const scrollY = window.scrollY

        if (scrollY <= fadeStart) {
          setOpacity(1)
        } else if (scrollY >= fadeEnd) {
          setOpacity(0)
        } else {
          setOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return opacity
}

function LandingPage() {
  const heroContentOpacity = useHeroFade()

  return (
    <main>
      <LandingNav />
      <div className="relative">
        {/* Sticky hero — stays pinned while content scrolls over it */}
        <div className="sticky top-0 z-0 h-screen">
          <TerrainHero fullHeight>
            <div
              style={{ opacity: heroContentOpacity }}
              className="transition-opacity duration-100"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Hi I'm Karl
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto">
                I'm a software engineer with a passion for building scalable and
                efficient systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="/components/hero"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </TerrainHero>
        </div>

        {/* Content — scrolls over the sticky hero */}
        <div className="relative z-10">
          {/* Gradient bridge: transparent → section bg, blends hero into content */}
          <div
            className="h-40 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)',
            }}
          />

          {/* About section */}
          <AboutSection />
        </div>
      </div>
    </main>
  )
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true)
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

const STAGGER_MS = 80

function AboutSection() {
  const { ref, inView } = useInView(0.1)

  const stagger = (i: number, baseClassName: string) => ({
    className: `${baseClassName} ${inView ? 'animate-[fade-in-up_0.6s_ease-out_both]' : 'opacity-0'}`,
    style: inView ? { animationDelay: `${i * STAGGER_MS}ms` } : undefined,
  })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-[#0a0a0f] px-6 py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto">
        <p {...stagger(0, 'text-sm font-medium tracking-widest uppercase text-blue-400 mb-4')}>
          About
        </p>
        <h2 {...stagger(1, 'text-3xl md:text-5xl font-bold text-white mb-8')}>
          Building things that matter.
        </h2>
        <p {...stagger(2, 'text-lg md:text-xl text-gray-400 leading-relaxed mb-6')}>
          I'm a software engineer who cares deeply about craft — from the
          architecture that holds a system together to the interface that makes
          it feel effortless. I focus on building scalable, well-tested software
          that solves real problems.
        </p>
        <p {...stagger(3, 'text-lg md:text-xl text-gray-400 leading-relaxed mb-12')}>
          Whether it's designing APIs, shipping production frontends, or
          exploring new tools and frameworks, I bring curiosity and rigor to
          everything I build.
        </p>
        <div className="border-t border-white/10 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div {...stagger(4, '')}>
            <p className="text-3xl font-bold text-white mb-1">5+</p>
            <p className="text-sm text-gray-500">Years of experience</p>
          </div>
          <div {...stagger(5, '')}>
            <p className="text-3xl font-bold text-white mb-1">Full-Stack</p>
            <p className="text-sm text-gray-500">End-to-end delivery</p>
          </div>
          <div {...stagger(6, '')}>
            <p className="text-3xl font-bold text-white mb-1">Open Source</p>
            <p className="text-sm text-gray-500">Community contributor</p>
          </div>
        </div>
      </div>
    </section>
  )
}

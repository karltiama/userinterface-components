import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
              <h1 className="text-5xl md:text-7xl font-bold text-blue-400 mb-6 drop-shadow-lg">
                Hi I'm Karl
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-3xl mx-auto">
                I build scalable systems and share what I learn through technical writing and mental models.
              </p>
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

          {/* Work section */}
          <section id="work" className="bg-[#0a0a0f] px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium tracking-widest uppercase text-blue-400 mb-4">
                Work
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Selected projects
              </h2>
              <p className="text-lg text-gray-400">
                Coming soon — case studies and highlights.
              </p>
            </div>
          </section>

          {/* Blog section */}
          <section id="blog" className="bg-[#0a0a0f] px-6 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium tracking-widest uppercase text-blue-400 mb-4">
                Blog
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                Writing
              </h2>
              <p className="text-lg text-gray-400">
                Coming soon — articles and notes.
              </p>
            </div>
          </section>
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

const ABOUT_HEADLINE_SUFFIXES = [
  'solve real-world problems.',
  'scale with users.',
  'actually get used.',
] as const

const ABOUT_HEADLINE_INTERVAL_MS = 3800

function AboutHeadline({
  inView,
  headlineProps,
}: {
  inView: boolean
  headlineProps: { className: string; style?: React.CSSProperties }
}) {
  const [suffixIndex, setSuffixIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView || reduceMotion) return
    const id = window.setInterval(() => {
      setSuffixIndex((i) => (i + 1) % ABOUT_HEADLINE_SUFFIXES.length)
    }, ABOUT_HEADLINE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [inView, reduceMotion])

  const suffix =
    ABOUT_HEADLINE_SUFFIXES[reduceMotion ? 0 : suffixIndex]

  return (
    <h2 {...headlineProps}>
      <span className="block text-white leading-tight">Building things that</span>
      {reduceMotion ? (
        <span className="mt-1 block min-h-[2lh] text-blue-400 leading-tight md:mt-2">
          {suffix}
        </span>
      ) : (
        <span
          className="mt-1 block min-h-[2lh] text-blue-400 leading-tight md:mt-2"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={suffix}
              className="block"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {suffix}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </h2>
  )
}

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
      className="relative overflow-hidden bg-[#0a0a0f] px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative max-w-4xl mx-auto">
        <p {...stagger(0, 'text-sm font-medium tracking-widest uppercase text-blue-400 mb-4')}>
          About
        </p>
        <AboutHeadline
          inView={inView}
          headlineProps={stagger(
            1,
            'flex flex-col items-start text-3xl md:text-5xl font-bold mb-8'
          )}
        />
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

import { useEffect, useRef, useState } from 'react'
import './App.css'

type ThemeMode = 'light' | 'dark'

type FeaturedProject = {
  name: string
  url: string
  context: string
  logoUrl: string
  logoAlt: string
  primaryCtaLabel?: string
  appStoreUrl?: string
  playStoreUrl?: string
  widgetbookUrl?: string
  impact: string[]
}

type ExperienceItem = {
  company: string
  companyUrl?: string
  viaLabel?: string
  viaUrl?: string
  engagement: string
  role: string
  period: string
  products: { name: string; url?: string; note?: string; ctaLabel?: string; appStoreUrl?: string }[]
  highlights: string[]
}

const featuredProjects: FeaturedProject[] = [
  {
    name: 'PayByPhone',
    url: 'https://www.paybyphone.com/',
    context: 'Corpay (via RiTech International AG)',
    logoUrl: '/logos/paybyphone-logo.svg',
    logoAlt: 'PayByPhone logo',
    appStoreUrl: 'https://apps.apple.com/us/app/paybyphone-parking/id448474183',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.paybyphone&hl=en',
    widgetbookUrl:
      'http://fleetcor-cvp-component-library.s3-website.eu-central-1.amazonaws.com/#/?path=widgets/badge/fluxusbadge/fluxusbadge-examples',
    impact: [
      'Rewrote the app in Flutter using the Fluxus design system, serving as one of the main developers maintaining design components through Widgetbook.',
      'Contributed features such as Google Pay, Apple Pay, remote session extensions, and EV charging flows.',
      'Helped evolve the app into a full parking and vehicle management experience used in 1,200+ cities.',
    ],
  },
  {
    name: 'Honeygrow Mobile App',
    url: 'https://www.honeygrow.com/',
    context: 'Moxie Labs (Remote)',
    logoUrl: '/logos/honeygrow-logo.svg',
    logoAlt: 'Honeygrow logo',
    appStoreUrl: 'https://apps.apple.com/us/app/honeygrow/id1391932075',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.honeygrow.hgmg.android.app&hl=en',
    impact: [
      'Contributed to an already-built Honeygrow mobile app across App Store and Google Play.',
      'Implemented menu browsing, customization, secure checkout, rewards, and push notifications.',
      'Added live activity support for real-time order status updates.',
    ],
  },
  {
    name: "Hattie B's Mobile Work",
    url: 'http://hattieb.com/',
    context: 'Moxie Labs (Remote)',
    logoUrl: '/logos/hattieb-logo.svg',
    logoAlt: "Hattie B's logo",
    appStoreUrl: 'https://apps.apple.com/us/app/hattie-bs-hot-chicken/id1550059818',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.thanx.hattieb&hl=en',
    impact: [
      "Contributed to Hattie B's mobile app from start to finish (end-to-end).",
      'Delivered mobile features aligned with brand consistency and high performance.',
      'Focused on reliable, production-ready app behavior and smooth user flows.',
    ],
  },
  {
    name: 'Fleet Rewards',
    url: 'https://fleet-rewards.web.app/login',
    context: 'Pichler Automobile',
    logoUrl: '/logos/pichler-automobile-logo.svg',
    logoAlt: 'Pichler Automobile logo',
    primaryCtaLabel: 'Visit App',
    impact: [
      'Built with Flutter for the web experience and aligned mobile app delivery.',
      'Delivered cross-platform support for iOS and Android alongside the web app.',
      'Focused on secure login flow, consistent UI, and production-ready performance.',
    ],
  },
]

const experiences: ExperienceItem[] = [
  {
    company: 'Corpay',
    companyUrl: 'https://www.corpay.com/',
    viaLabel: 'via RiTech International AG',
    viaUrl: 'https://www.ritech.co/',
    engagement: 'via RiTech International AG',
    role: 'Senior Flutter Developer',
    period: 'Jun 2024 - Present',
    products: [{ name: 'PayByPhone', url: 'https://www.paybyphone.com/', note: 'Powered by Corpay' }],
    highlights: [
      'Rewrote the app in Flutter using the Fluxus design system, acting as one of the main developers maintaining design components via Widgetbook.',
      'Built secure payment features including Google Pay and Apple Pay, plus remote session and EV charging capabilities.',
      'Supported the migration from native stack toward Flutter for a globally used parking platform.',
    ],
  },
  {
    company: 'Moxie Labs',
    companyUrl: 'https://www.moxielabs.co/#team',
    engagement: 'Remote | Digital Product & Marketing Agency',
    role: 'Senior Flutter Developer (Freelance)',
    period: 'Jun 2025 - Present',
    products: [
      {
        name: 'Honeygrow',
        url: 'https://www.honeygrow.com/',
        note: 'Contributed to an already-built app',
        appStoreUrl: 'https://apps.apple.com/us/app/honeygrow/id1391932075',
      },
      {
        name: "Hattie B's",
        url: 'http://hattieb.com/',
        note: 'Worked end-to-end from start to finish',
        appStoreUrl: 'https://apps.apple.com/us/app/hattie-bs-hot-chicken/id1550059818',
      },
    ],
    highlights: [
      'Working on food-ordering mobile experiences with support for pickup and delivery.',
      'Implemented secure checkout, rewards, notifications, and live activity updates.',
      'Collaborating closely with product and engineering teams to keep apps fast and reliable.',
    ],
  },
  {
    company: 'Artichoke Holding GmbH',
    companyUrl: 'https://artichoke.eu/',
    engagement: 'Remote',
    role: 'Flutter Developer',
    period: 'Sep 2023 - Jun 2024',
    products: [{ name: 'Clubjam' }, { name: 'Corluna' }],
    highlights: [
      'Built pet-health and subscription-focused mobile features.',
      'Developed cross-platform capabilities for orchestra and music ensemble workflows.',
      'Delivered consistent user experience across mobile and web surfaces.',
    ],
  },
  {
    company: 'Quantix L.L.C.',
    companyUrl: 'https://thequantix.com/about',
    engagement: 'Prishtine, Kosovo',
    role: 'Flutter Developer',
    period: 'Feb 2021 - Sep 2023',
    products: [
      { name: 'BKS App', url: 'https://apps.apple.com/us/app/bks-app/id1660764520', ctaLabel: 'View on App Store' },
      {
        name: 'InsureX SIP',
        url: 'https://apps.apple.com/us/app/insurex-sip/id1610541826',
        ctaLabel: 'View on App Store',
      },
      { name: 'Ambra App', url: 'https://apps.apple.com/us/app/ambra-app/id1617982829', ctaLabel: 'View on App Store' },
      { name: 'TrackerX' },
      { name: 'QHealth' },
    ],
    highlights: [
      'Shipped multiple cross-platform apps across insurance, health, and operations domains.',
      'Implemented real-world workflows such as claims, reporting, room/session management, and task tracking.',
      'Released production builds on both App Store and Play Store while maintaining high quality standards.',
    ],
  },
]

function App() {
  const [showTop, setShowTop] = useState(false)
  const [activeNav, setActiveNav] = useState('projects')
  const [navLockTarget, setNavLockTarget] = useState<string | null>(null)
  const navLockStartedAtRef = useRef<number | null>(null)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme-mode')
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme-mode', theme)
  }, [theme])

  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const navSectionIds = ['projects', 'experience', 'education', 'cv', 'contact']

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.18 },
    )

    revealElements.forEach((el) => observer.observe(el))

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && navSectionIds.includes(hash)) {
        setActiveNav(hash)
      }
    }

    const getCurrentSection = () => {
      const offset = 170
      const scrollAnchor = window.scrollY + offset
      let currentSection = navSectionIds[0]

      navSectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && scrollAnchor >= section.offsetTop) {
          currentSection = id
        }
      })

      return currentSection
    }

    const onScroll = () => {
      setShowTop(window.scrollY > 600)

      if (navLockTarget) {
        const lockAge = navLockStartedAtRef.current ? Date.now() - navLockStartedAtRef.current : 0
        if (lockAge > 1200) {
          setNavLockTarget(null)
          navLockStartedAtRef.current = null
          setActiveNav(getCurrentSection())
          return
        }

        const targetSection = document.getElementById(navLockTarget)
        if (!targetSection) {
          setNavLockTarget(null)
          navLockStartedAtRef.current = null
          setActiveNav(getCurrentSection())
          return
        }

        if (targetSection) {
          const rect = targetSection.getBoundingClientRect()
          const reachOffset = 130
          const reached = rect.top <= reachOffset && rect.bottom > reachOffset
          if (reached) {
            setActiveNav(navLockTarget)
            setNavLockTarget(null)
            navLockStartedAtRef.current = null
          }
        }
        return
      }

      setActiveNav(getCurrentSection())
    }

    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('scroll', onScroll)
    syncFromHash()
    onScroll()

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('scroll', onScroll)
    }
  }, [navLockTarget])

  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId)
    setNavLockTarget(sectionId)
    navLockStartedAtRef.current = Date.now()

    const section = document.getElementById(sectionId)
    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const navOffset = 96
    const targetY = Math.max(0, section.getBoundingClientRect().top + window.scrollY - navOffset)

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY)
      window.history.replaceState(null, '', `#${sectionId}`)
      return
    }

    window.scrollTo({ top: targetY, behavior: 'smooth' })
    window.history.replaceState(null, '', `#${sectionId}`)
  }

  return (
    <div className="site-shell">
      <header className="top-nav">
        <a className="brand" href="#top">
          Ardit Konjuhi
        </a>
        <nav>
          <a
            className={activeNav === 'projects' ? 'active' : ''}
            href="#projects"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('projects')
            }}
          >
            Projects
          </a>
          <a
            className={activeNav === 'experience' ? 'active' : ''}
            href="#experience"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('experience')
            }}
          >
            Experience
          </a>
          <a
            className={activeNav === 'education' ? 'active' : ''}
            href="#education"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('education')
            }}
          >
            Education
          </a>
          <a
            className={activeNav === 'cv' ? 'active' : ''}
            href="#cv"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('cv')
            }}
          >
            CV
          </a>
          <a
            className={activeNav === 'contact' ? 'active' : ''}
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('contact')
            }}
          >
            Contact
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero reveal">
          <div className="hero-content">
            <p className="eyebrow">Flutter Engineer</p>
            <h1>Building reliable mobile products that people use every day.</h1>
            <p className="intro">
              Experienced Flutter Developer with 5+ years of professional experience and a Computer Engineering
              background. Focused on production-ready architecture, clean code, and scalable mobile delivery.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#projects">
                View Projects
              </a>
              <a
                className="btn btn-secondary"
                href={asset('/Ardit-Konjuhi-CV.pdf')}
                target="_blank"
                rel="noreferrer noopener"
              >
                Download CV
              </a>
            </div>
            <div className="social-row">
              <a href="https://github.com/Konjuhi" target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ardit-konjuhi-185a6719b/" target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img src={asset('/ardit-konjuhi-headshot.jpg')} alt="Portrait of Ardit Konjuhi" />
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Featured Work</p>
            <h2>Products and teams I am building with</h2>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article className="project-card" key={project.name}>
                <p className="card-meta">{project.context}</p>
                <div className="app-logo-wrap">
                  <img
                    className="app-logo"
                    src={project.logoUrl.startsWith('/') ? asset(project.logoUrl) : project.logoUrl}
                    alt={project.logoAlt}
                    loading="lazy"
                  />
                </div>
                <h3>{project.name}</h3>
                <ul>
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="card-links">
                  <a className="card-link" href={project.url} target="_blank" rel="noreferrer noopener">
                    {project.primaryCtaLabel ?? 'Visit Website'}
                  </a>
                  <div className="store-links">
                    {project.appStoreUrl ? (
                      <a href={project.appStoreUrl} target="_blank" rel="noreferrer noopener">
                        App Store
                      </a>
                    ) : null}
                    {project.playStoreUrl ? (
                      <a href={project.playStoreUrl} target="_blank" rel="noreferrer noopener">
                        Google Play
                      </a>
                    ) : null}
                    {project.widgetbookUrl ? (
                      <a href={project.widgetbookUrl} target="_blank" rel="noreferrer noopener">
                        View Components
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Experience</p>
            <h2>Professional experience in Flutter and mobile delivery</h2>
          </div>
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-item" key={`${item.company}-${item.period}`}>
                <div className="timeline-head">
                  <div>
                    <h3>
                      {item.companyUrl ? (
                        <a
                          className="company-link"
                          href={item.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          data-tooltip="Click to see team website"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </h3>
                    <p>
                      {item.viaUrl && item.viaLabel ? (
                        <a
                          className="company-link"
                          href={item.viaUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          data-tooltip="Click to see team website"
                        >
                          {item.viaLabel}
                        </a>
                      ) : (
                        item.engagement
                      )}
                    </p>
                  </div>
                  <p className="period">{item.period}</p>
                </div>
                <p className="role">{item.role}</p>
                <p className="products-line">
                  {item.products.map((product) => (
                    <span key={`${item.company}-${product.name}`}>
                      <strong>{product.name}</strong>
                      {product.note ? ` (${product.note})` : ''}
                      {product.url ? (
                        <>
                          {' - '}
                          <a href={product.url} target="_blank" rel="noreferrer noopener">
                            {product.ctaLabel ?? 'Open'}
                          </a>
                        </>
                      ) : null}
                      {product.appStoreUrl ? (
                        <>
                          {' | '}
                          <a href={product.appStoreUrl} target="_blank" rel="noreferrer noopener">
                            App Store
                          </a>
                        </>
                      ) : null}
                    </span>
                  ))}
                </p>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="skills">
          <div className="section-head">
            <p className="eyebrow">Skills</p>
            <h2>Core strengths</h2>
          </div>
          <div className="skills-grid">
            {[
              'Flutter',
              'Dart',
              'Mobile Development',
              'REST APIs',
              'Firebase',
              'Version Control (Git/GitHub)',
              'Communication',
              'Problem Solving',
              'Team Collaboration',
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Education</p>
            <h2>Bachelor's in Computer Engineering</h2>
          </div>
          <div className="education-card">
            <h3>Faculty of Electrical and Computer Engineering (FIEK)</h3>
            <p>University of Prishtina</p>
            <a href="https://fiek.uni-pr.edu/" target="_blank" rel="noreferrer noopener">
              Visit FIEK Website
            </a>
          </div>
        </section>

        <section id="cv" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">CV</p>
            <h2>Preview and download</h2>
          </div>
          <div className="cv-frame-wrap">
            <iframe title="Ardit Konjuhi CV" src={`${asset('/Ardit-Konjuhi-CV.pdf')}#view=FitH`} />
          </div>
          <div className="cv-actions">
            <a
              className="btn btn-primary"
              href={asset('/Ardit-Konjuhi-CV.pdf')}
              target="_blank"
              rel="noreferrer noopener"
            >
              Open CV in New Tab
            </a>
            <a className="btn btn-secondary" href={asset('/Ardit-Konjuhi-CV.pdf')} download>
              Download CV
            </a>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer reveal">
        <p>Ardit Konjuhi</p>
        <p>Maribor, Slovenia</p>
        <a href="mailto:arditkonjuhi8@gmail.com">arditkonjuhi8@gmail.com</a>
        <a href="tel:+38670882474">+38670882474</a>
      </footer>

      <button
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        Top
      </button>
    </div>
  )
}

export default App

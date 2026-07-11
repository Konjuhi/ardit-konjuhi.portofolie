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

type SkillGroup = {
  title: string
  skills: string[]
}

const featuredProjects: FeaturedProject[] = [
  {
    name: 'PayByPhone',
    url: 'https://www.paybyphone.com/',
    context: 'Corpay · via RiTech International AG',
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
    context: 'Moxie Labs · Remote',
    logoUrl: '/logos/honeygrow-logo.svg',
    logoAlt: 'Honeygrow logo',
    appStoreUrl: 'https://apps.apple.com/us/app/honeygrow/id1391932075',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.honeygrow.hgmg.android.app&hl=en',
    impact: [
      'Contributing to an already-built Honeygrow mobile app across App Store and Google Play.',
      'Delivering menu browsing, customization, secure checkout, rewards, and push notifications.',
      'Adding live activity support for real-time order status updates.',
    ],
  },
  {
    name: "Hattie B's Mobile Work",
    url: 'http://hattieb.com/',
    context: 'Moxie Labs · Remote',
    logoUrl: '/logos/hattieb-logo.svg',
    logoAlt: "Hattie B's logo",
    appStoreUrl: 'https://apps.apple.com/us/app/hattie-bs-hot-chicken/id1550059818',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.thanx.hattieb&hl=en',
    impact: [
      "Contributing to Hattie B's mobile app from start to finish (end-to-end).",
      'Delivering mobile features aligned with brand consistency and high performance.',
      'Focusing on reliable, production-ready app behavior and smooth user flows.',
    ],
  },
  {
    name: 'Fleet Rewards',
    url: 'https://fleet-rewards.web.app/login',
    context: 'Pichler Automobile',
    logoUrl: '/logos/pichler-automobile-logo.svg',
    logoAlt: 'Pichler Automobile logo',
    primaryCtaLabel: 'Open Web App',
    appStoreUrl: 'https://apps.apple.com/us/app/pichler-rewards/id6753695664',
    impact: [
      'Built with Flutter for the web experience and aligned mobile app delivery.',
      'Delivered cross-platform support for iOS and Android alongside the web app.',
      'Focused on secure login flow, consistent UI, and production-ready performance.',
    ],
  },
]

const experiences: ExperienceItem[] = [
  {
    company: 'Moxie Labs',
    companyUrl: 'https://www.moxielabs.co/#team',
    engagement: 'Remote · Digital product & marketing agency',
    role: 'Senior Flutter Developer',
    period: 'Jun 2025 — Present',
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
      'Working on Honeygrow and Hattie B mobile experiences with support for pickup and delivery.',
      'Implemented secure checkout, rewards, notifications, and live activity updates.',
      'Collaborating closely with product and engineering teams to keep apps fast and reliable.',
    ],
  },
  {
    company: 'Corpay',
    companyUrl: 'https://www.corpay.com/',
    viaLabel: 'via RiTech International AG',
    viaUrl: 'https://www.ritech.co/',
    engagement: 'via RiTech International AG',
    role: 'Senior Flutter Developer',
    period: 'Jun 2024 — Mar 2026',
    products: [{ name: 'PayByPhone', url: 'https://www.paybyphone.com/', note: 'Powered by Corpay' }],
    highlights: [
      'Rewrote the app in Flutter using the Fluxus design system, acting as one of the main developers maintaining design components via Widgetbook.',
      'Built secure payment features including Google Pay and Apple Pay, plus remote session and EV charging capabilities.',
      'Supported the migration from native stack toward Flutter for a globally used parking platform.',
    ],
  },
  {
    company: 'Artichoke Holding GmbH',
    companyUrl: 'https://artichoke.eu/',
    engagement: 'Remote',
    role: 'Flutter Developer',
    period: 'Sep 2023 — Jun 2024',
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
    period: 'Feb 2021 — Sep 2023',
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

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & frameworks',
    skills: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'Java', 'Mobile Development', 'Android', 'iOS', 'Web'],
  },
  {
    title: 'Backend & data',
    skills: ['REST APIs', 'GraphQL', 'Firebase', 'Supabase', 'Push notifications'],
  },
  {
    title: 'Architecture & delivery',
    skills: ['Clean Architecture', 'MVVM', 'Widgetbook', 'CI/CD', 'App Store & Play Store releases', 'Version Control (Git/GitHub)'],
  },
  {
    title: 'Ways of working',
    skills: ['Communication', 'Problem Solving', 'Team Collaboration'],
  },
]

const navLinks = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'cv', label: 'CV' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const navSectionIds = navLinks.map((link) => link.id)

function IconArrowRight() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

function IconExternal() {
  return (
    <svg className="icon icon-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg className="icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconGraduationCap() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  )
}

const gridProjects = featuredProjects.slice(0, 3)
const wideProjects = featuredProjects.slice(3)

function getNavOffset() {
  const nav = document.querySelector<HTMLElement>('.top-nav')
  return (nav?.offsetHeight ?? 72) + 16
}

function App() {
  const [showTop, setShowTop] = useState(false)
  const [activeNav, setActiveNav] = useState('projects')
  const [navLockTarget, setNavLockTarget] = useState<string | null>(null)
  const navLockStartedAtRef = useRef<number | null>(null)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme-mode')
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme-mode', theme)
  }, [theme])

  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
  const cvUrl = asset('/Ardit-Konjuhi-CV.pdf?v=20260318-2')

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 },
    )

    revealElements.forEach((el) => observer.observe(el))

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && navSectionIds.includes(hash)) {
        setActiveNav(hash)
      }
    }

    const getCurrentSection = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const atPageBottom = window.scrollY >= maxScroll - 2
      if (atPageBottom) {
        return 'contact'
      }

      const offset = getNavOffset() + 80
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
        const targetSection = document.getElementById(navLockTarget)
        if (!targetSection) {
          setNavLockTarget(null)
          navLockStartedAtRef.current = null
          setActiveNav(getCurrentSection())
          return
        }

        const rect = targetSection.getBoundingClientRect()
        const reachOffset = getNavOffset() + 16
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const atPageBottom = window.scrollY >= maxScroll - 2
        const closeToTargetTop = Math.abs(rect.top - reachOffset) <= 24
        const reached = closeToTargetTop || (navLockTarget === 'contact' && atPageBottom)
        if (reached) {
          setActiveNav(navLockTarget)
          setNavLockTarget(null)
          navLockStartedAtRef.current = null
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
    const navOffset = getNavOffset()
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
    <>
      <header className="top-nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            Ardit Konjuhi
          </a>
          <nav aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={activeNav === link.id ? 'active' : ''}
                href={`#${link.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="site-shell" id="top">
        <section className="hero reveal">
          <div className="hero-content">
            <p className="eyebrow">Flutter Engineer</p>
            <h1>Building reliable mobile products that people use every day.</h1>
            <p className="intro">
              Experienced Flutter Developer with 5+ years of professional experience and a Computer Engineering
              background. Focused on production-ready architecture, clean code, and scalable mobile delivery.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href="#projects"
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick('projects')
                }}
              >
                View Projects
                <IconArrowRight />
              </a>
              <a className="btn btn-secondary" href={cvUrl} target="_blank" rel="noreferrer noopener">
                <IconDownload />
                Download CV
              </a>
            </div>
            <div className="social-row">
              <a href="https://github.com/Konjuhi" target="_blank" rel="noreferrer noopener">
                <IconGitHub />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ardit-konjuhi-185a6719b/" target="_blank" rel="noreferrer noopener">
                <IconLinkedIn />
                LinkedIn
              </a>
            </div>
          </div>
          {/* Portrait area: swap the image below to update the photo. */}
          <div className="hero-media">
            <img src={asset('/ardit-konjuhi-headshot.jpg')} alt="Portrait of Ardit Konjuhi" />
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Featured Work</p>
            <h2>Products and teams I am building with</h2>
            <p className="section-sub">
              A selection of production apps I have shipped and maintained across the App Store and Google Play.
            </p>
          </div>
          <div className="project-grid">
            {gridProjects.map((project) => (
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
                    {project.primaryCtaLabel ?? 'Visit website'}
                    <IconExternal />
                  </a>
                  <div className="store-links">
                    {project.appStoreUrl ? (
                      <a href={project.appStoreUrl} target="_blank" rel="noreferrer noopener">
                        App Store
                        <IconExternal />
                      </a>
                    ) : null}
                    {project.playStoreUrl ? (
                      <a href={project.playStoreUrl} target="_blank" rel="noreferrer noopener">
                        Google Play
                        <IconExternal />
                      </a>
                    ) : null}
                    {project.widgetbookUrl ? (
                      <a href={project.widgetbookUrl} target="_blank" rel="noreferrer noopener">
                        View Components
                        <IconExternal />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
            {wideProjects.map((project) => (
              <article className="project-card wide" key={project.name}>
                <div className="wide-head">
                  <div className="app-logo-wrap">
                    <img
                      className="app-logo"
                      src={project.logoUrl.startsWith('/') ? asset(project.logoUrl) : project.logoUrl}
                      alt={project.logoAlt}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="card-meta">{project.context}</p>
                    <h3>{project.name}</h3>
                  </div>
                </div>
                <ul>
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="store-links">
                  <a href={project.url} target="_blank" rel="noreferrer noopener">
                    {project.primaryCtaLabel ?? 'Visit website'}
                    <IconExternal />
                  </a>
                  {project.appStoreUrl ? (
                    <a href={project.appStoreUrl} target="_blank" rel="noreferrer noopener">
                      App Store
                      <IconExternal />
                    </a>
                  ) : null}
                  {project.playStoreUrl ? (
                    <a href={project.playStoreUrl} target="_blank" rel="noreferrer noopener">
                      Google Play
                      <IconExternal />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Skills</p>
            <h2>Tools and practices I work with</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.skills.map((skill) => (
                    <span className="tag" key={skill}>
                      {skill}
                    </span>
                  ))}
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
                <div className="products-line">
                  {item.products.map((product) => (
                    <span key={`${item.company}-${product.name}`}>
                      <strong>{product.name}</strong>
                      {product.note ? ` (${product.note})` : ''}
                      {product.url ? (
                        <>
                          {' · '}
                          <a href={product.url} target="_blank" rel="noreferrer noopener">
                            {product.ctaLabel ?? 'Open'}
                          </a>
                        </>
                      ) : null}
                      {product.appStoreUrl ? (
                        <>
                          {' · '}
                          <a href={product.appStoreUrl} target="_blank" rel="noreferrer noopener">
                            App Store
                          </a>
                        </>
                      ) : null}
                    </span>
                  ))}
                </div>
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="cv" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">CV</p>
            <h2>Preview and download</h2>
          </div>
          <div className="cv-card">
            <div className="cv-copy">
              <h3>Ardit Konjuhi — Flutter Engineer</h3>
              <p>
                Experienced Flutter Developer with 5 years of professional experience and a degree in Computer
                Engineering. Skilled in building intuitive, user-friendly mobile applications with Flutter and Dart,
                following clean architecture and the MVVM pattern for scalable, production-ready code.
              </p>
              <div className="cv-actions">
                <a className="btn btn-primary" href={cvUrl} download>
                  <IconDownload />
                  Download CV
                </a>
                <a className="btn btn-secondary" href={cvUrl} target="_blank" rel="noreferrer noopener">
                  Open full preview
                </a>
              </div>
            </div>
            <div className="cv-preview" aria-hidden="true">
              <div className="cv-preview-head">
                <div>
                  <p className="cv-preview-name">Ardit Konjuhi</p>
                  <p className="cv-preview-role">Flutter Engineer</p>
                </div>
                <div className="cv-preview-contact">
                  <p>arditkonjuhi8@gmail.com</p>
                  <p>+386 70 882 474</p>
                  <p>Maribor, Slovenia</p>
                </div>
              </div>
              <div className="cv-preview-divider" />
              <p className="cv-preview-label">Summary</p>
              <p className="cv-preview-text">
                Experienced Flutter Developer with 5 years of professional experience and a Computer Engineering
                degree. Proficient in RESTful APIs, Firebase, and Supabase, with a focus on clean, maintainable,
                production-ready code.
              </p>
            </div>
          </div>
        </section>

        <section id="education" className="section reveal">
          <div className="section-head">
            <p className="eyebrow">Education</p>
            <h2>Bachelor's in Computer Engineering</h2>
          </div>
          <div className="education-card">
            <div className="icon-badge">
              <IconGraduationCap />
            </div>
            <div>
              <h3>Faculty of Electrical and Computer Engineering (FIEK)</h3>
              <p>University of Prishtina</p>
              <a href="https://fiek.uni-pr.edu/" target="_blank" rel="noreferrer noopener">
                Visit FIEK website
                <IconExternal />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section reveal">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>Let's build something reliable together.</h2>
            <p className="contact-sub">
              Open to Flutter roles and freelance mobile projects. The fastest way to reach me is by email.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="mailto:arditkonjuhi8@gmail.com">
                <IconMail />
                Email me
              </a>
            </div>
            <div className="contact-meta">
              <span>
                <IconMapPin />
                Maribor, Slovenia
              </span>
              <a href="tel:+38670882474">
                <IconPhone />
                +386 70 882 474
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>© 2026 Ardit Konjuhi — Flutter Engineer</p>
          <div className="footer-links">
            <a href="https://github.com/Konjuhi" target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ardit-konjuhi-185a6719b/" target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <a href="mailto:arditkonjuhi8@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <button
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        Top
      </button>
    </>
  )
}

export default App

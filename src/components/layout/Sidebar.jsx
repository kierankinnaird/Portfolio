import { useEffect, useState } from "react"
import styles from "./Sidebar.module.css"

const NAV = [
  { id: "about", label: "About" },
  { id: "poise", label: "Poise" },
  { id: "work", label: "Work" },
  { id: "availability", label: "Availability" },
  { id: "contact", label: "Contact" },
]

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/kierankinnaird",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kierankinnaird",
    icon: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:kieran.kinnaird@mail.com",
    icon: (
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 5.2L19.8 6H4.2ZM20 7.7l-7.4 4.94a1 1 0 0 1-1.2 0L4 7.7V18h16V7.7Z" />
    ),
  },
]

export default function Sidebar() {
  const [active, setActive] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className={styles.sidebar}>
      <div>
        <h1 className={styles.name}>
          Kieran
          <br />
          Kinnaird
        </h1>
        <p className={styles.role}>Developer</p>
        <p className={styles.tagline}>
          Building <span className={styles.accent}>Poise</span>, on-device
          movement screening for practitioners.
        </p>

        <a href="#availability" className={styles.availability}>
          <span className={styles.availabilityDot} aria-hidden />
          Open to a 2026 placement
        </a>

        <nav className={styles.nav} aria-label="In-page">
          <ul>
            {NAV.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? styles.active : ""}
                >
                  <span className={styles.navLine} aria-hidden />
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className={styles.socials}>
        {SOCIALS.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                {icon}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

import { useEffect, useState } from "react"
import styles from "./Header.module.css"
import Button from "../ui/Button"

export default function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = ["home", "about", "projects"]

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    )

    sections.forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden />
          Kieran Kinnaird
        </a>

        <div className={styles.right}>
          <ul className={styles.links}>
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? styles.active : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? styles.active : ""}
              >
                Projects
              </a>
            </li>
          </ul>

          <Button
            href="#contact"
            variant="secondary"
            size="sm"
            className={styles.navCta}
          >
            Contact
          </Button>
        </div>
      </nav>
    </header>
  )
}

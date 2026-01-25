import { useEffect, useState } from "react"
import styles from "./Header.module.css"

export default function Header() {
  const [activeSection, setActiveSection] = useState("home")

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

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#home" className={styles.brand}>
          Kieran Kinnaird
        </a>

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
      </nav>
    </header>
  )
}
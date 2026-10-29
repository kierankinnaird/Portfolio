import { motion } from "motion/react"
import styles from "./Home.module.css"

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
}

const POISE_STATS = [
  { value: "5", label: "movements screened" },
  { value: "<2 min", label: "per screen" },
  { value: "0-100", label: "movement score" },
  { value: "100%", label: "on-device" },
]

const POISE_TECH = ["Flutter", "Dart", "Google ML Kit", "Firebase", "Stripe"]

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none">
    <path
      d="M7 17 17 7M17 7H8M17 7v9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Home() {
  return (
    <>
      {/* ---------- About ---------- */}
      <motion.section id="about" className={styles.section} {...reveal}>
        <h2 className={styles.label}>
          <span>01</span> / About
        </h2>
        <p className={styles.paragraph}>
          I'm a computer science student and developer who likes turning fuzzy
          problems into software that feels considered. I care about clean
          architecture, maintainable code, and the small details most people
          never notice.
        </p>
        <p className={styles.paragraph}>
          Most of my focus right now goes into <strong>Poise</strong>, a mobile
          app that turns a quick movement screen into objective performance data
          for practitioners. The project below is where I'm putting these ideas
          into practice.
        </p>
      </motion.section>

      {/* ---------- Poise (featured) ---------- */}
      <motion.section id="poise" className={styles.section} {...reveal}>
        <h2 className={styles.label}>
          <span>02</span> / Featured Project
        </h2>
        <h3 className={styles.poiseTitle}>Poise</h3>
        <p className={styles.poiseTagline}>
          A two-minute movement screen, tracked over time.
        </p>

        <div className={styles.panel}>
          <div className={styles.panelTop}>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden />
              iOS · In development
            </span>
            <a
              className={styles.inlineLink}
              href="https://getpoise.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              getpoise.app <ArrowUpRight />
            </a>
          </div>

          <p className={styles.poiseBody}>
            Poise uses a phone's front camera and on-device pose detection to
            screen five everyday movements: squat, lunge, single-leg stand, hip
            hinge and shoulder rotation. It scores movement quality from 0 to 100
            and tracks that score over time, giving practitioners an objective
            performance metric for each client. It also pulls movement faults
            that can suggest potential issues for the practitioner to review.
            Every frame is processed on device, so only anonymised metrics leave
            the phone, never raw video.
          </p>

          <div className={styles.stats}>
            {POISE_STATS.map(stat => (
              <div key={stat.label} className={styles.stat}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <ul className={styles.chips}>
            {POISE_TECH.map(tech => (
              <li key={tech} className={styles.chip}>
                {tech}
              </li>
            ))}
          </ul>

          <a
            className={styles.panelCta}
            href="https://getpoise.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit getpoise.app <ArrowUpRight />
          </a>
        </div>
      </motion.section>

      {/* ---------- Selected Work ---------- */}
      <motion.section id="work" className={styles.section} {...reveal}>
        <h2 className={styles.label}>
          <span>03</span> / Selected Work
        </h2>

        <div className={styles.work}>
          <a
            className={styles.workItem}
            href="https://github.com/kierankinnaird"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.workYear}>2026</span>
            <span className={styles.workMain}>
              <span className={styles.workName}>
                Personal Portfolio <ArrowUpRight />
              </span>
              <span className={styles.workDesc}>
                This site, designed and built from scratch.
              </span>
              <span className={styles.workTech}>React · Vite · Motion</span>
            </span>
          </a>
        </div>

        <p className={styles.workNote}>
          More projects in progress. Check back soon.
        </p>
      </motion.section>

      {/* ---------- Availability ---------- */}
      <motion.section id="availability" className={styles.section} {...reveal}>
        <h2 className={styles.label}>
          <span>04</span> / Availability
        </h2>
        <div className={styles.availabilityCard}>
          <h3 className={styles.availabilityTitle}>Open to placements</h3>
          <p className={styles.availabilityText}>
            I'm looking for a year-long industrial placement as part of my
            degree, and I can start any time before September 2026.
          </p>
          <ul className={styles.facts}>
            <li>Year-long placement</li>
            <li>Start before Sept 2026</li>
            <li>Anywhere in the UK</li>
            <li>Full right to work</li>
            <li>Full driving licence</li>
          </ul>
          <a className={styles.panelCta} href="#contact">
            Get in touch <ArrowUpRight />
          </a>
        </div>
      </motion.section>

      {/* ---------- Contact ---------- */}
      <motion.section id="contact" className={styles.section} {...reveal}>
        <h2 className={styles.label}>
          <span>05</span> / Contact
        </h2>
        <h3 className={styles.contactTitle}>Let's build something.</h3>
        <p className={styles.contactText}>
          I'm always happy to talk about projects, collaborations, or an
          interesting problem. Email is the best way to reach me.
        </p>
        <a
          className={styles.contactEmail}
          href="mailto:kieran.kinnaird@mail.com"
        >
          kieran.kinnaird@mail.com <ArrowUpRight />
        </a>
        <p className={styles.contactNote}>That's mail.com, not gmail.com.</p>
      </motion.section>
    </>
  )
}

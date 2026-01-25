import { motion } from "motion/react"
import DecryptedText from "../components/ui/DecryptedText"
import styles from "./Home.module.css"
import ProjectCard from "../components/ui/ProjectCard"

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.kicker}>Developer Portfolio</p>

          <DecryptedText
            text="Kieran Kinnaird"
            className={styles.title}
          />

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.4,
            }}
          >
            Building thoughtful web experiences with modern JavaScript and clean
            architecture.
          </motion.p>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About</h2>

          <p className={styles.aboutText}>
            I'm a computer science student with a strong interest in both software development and building thoughtful web applications. I enjoy working with modern technologies, focusing on clean architecture, maintainable code, and solving problems in a clear, practical way.
          </p>

          <p className={styles.aboutText}>
            I'm currently developing my portfolio through personal projects alongside my studies, with the goal of building practical, real-world software and continuing to refine my technical and design skills.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionDivider} />
          <h2 className={styles.sectionTitle}>Selected Projects</h2>

          <p className={styles.sectionSubtitle}>
            A small selection of projects focused on clean architecture, thoughtful UI, and practical problem solving.
          </p>

          <div className={styles.projectsGrid}>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>

          <p className={styles.comingSoon}>
            More projects coming soon.
          </p>
        </div>
      </section>
    </>
  )
}
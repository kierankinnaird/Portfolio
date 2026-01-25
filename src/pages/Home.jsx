import { motion } from "motion/react"
import DecryptedText from "../components/ui/DecryptedText"
import styles from "./Home.module.css"
import ProjectCard from "../components/ui/ProjectCard"
import { useEffect, useState} from "react";

export default function Home() {
  const [hideScroll, setHideScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setHideScroll(true);
      } else {
        setHideScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section id="home" className={styles.hero}>
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
            Building thoughtful web experiences with modern JavaScript and clean architecture.
          </motion.p>
        </div>

        <div
          className={`${styles.scrollIndicator} ${
            hideScroll ? styles.scrollHidden : ""
          }`}
        >
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      <section id="about" className={styles.container}>
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

      <section id="projects" className={styles.section}>
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

      <section id="contact" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Contact</h2>

          <p className={styles.contactText}>
            If you'd like to get in touch, feel free to reach out via email or connect with me on LinkedIn or Github.
          </p>

          <ul className={styles.contactLinks}>
            <li>
              <a href="mailto:kieran@kinnaird.dev">
                kieran@kinnaird.dev
              </a>
            </li>
            <li>
              <a
                href="https://github.com/kierankinnaird"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/kierankinnaird"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>

    </>
  );
}
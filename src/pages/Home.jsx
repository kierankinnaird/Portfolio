import { motion } from "motion/react"
import DecryptedText from "../components/ui/DecryptedText"
import styles from "./Home.module.css"

export default function Home() {
  return (
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
  )
}
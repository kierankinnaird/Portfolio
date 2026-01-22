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

        <p className={styles.description}>
          Building thoughtful web experiences with modern JavaScript and clean
          architecture.
        </p>
      </div>
    </section>
  )
}
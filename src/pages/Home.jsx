import styles from "./Home.module.css"

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.kicker}>Developer Portfolio</p>

        <h1 className={styles.title}>Kieran Kinnaird</h1>

        <p className={styles.description}>
          Building thoughtful web experiences with modern JavaScript and clean
          architecture.
        </p>
      </div>
    </section>
  )
}
import Sidebar from "./Sidebar"
import styles from "./Layout.module.css"

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

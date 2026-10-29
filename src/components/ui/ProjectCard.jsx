import styles from "./ProjectCard.module.css"

export default function ProjectCard({
    title = "Project Title",
    description = "A short description of the project will live here. This is a placeholder for future work.",
    tech = "React · JavaScript · CSS",
    status = "Coming Soon",
}) {
    return (
        <article className={styles.card}>
            <header className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.status}>{status}</span>
            </header>

            <p className={styles.description}>{description}</p>

            <p className={styles.tech}>{tech}</p>
        </article>
    )
}
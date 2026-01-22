export default function Home() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
          Developer Portfolio
        </p>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.1 }}>
          Kieran Kinnaird
        </h1>
        <p
          style={{
            maxWidth: "40ch",
            marginTop: "1.5rem",
            color: "var(--muted)",
          }}
        >
          Building thoughtful web experiences with modern JavaScript and clean
          architecture.
        </p>
      </div>
    </section>
  )
}
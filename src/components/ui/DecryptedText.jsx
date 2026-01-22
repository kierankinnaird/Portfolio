import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

const wrapperStyle = {
  display: "inline-block",
  whiteSpace: "pre-wrap",
}

const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
}

export default function DecryptedText({
  text,
  speed = 40,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
}) {
  const [displayText, setDisplayText] = useState("")
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  // generate random text of same length
  const randomize = () =>
    text
      .split("")
      .map(char =>
        char === " "
          ? " "
          : characters[Math.floor(Math.random() * characters.length)]
      )
      .join("")

  useEffect(() => {
    setDisplayText(randomize())
  }, []) // initial scramble

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true
        let revealedCount = 0

        const interval = setInterval(() => {
          setDisplayText(prev =>
            prev
              .split("")
              .map((char, i) => {
                if (i < revealedCount) return text[i]
                if (text[i] === " ") return " "
                return characters[Math.floor(Math.random() * characters.length)]
              })
              .join("")
          )

          revealedCount++

          if (revealedCount > text.length) {
            clearInterval(interval)
            setDisplayText(text)
          }
        }, speed)
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [characters, speed, text])

  return (
    <motion.span ref={containerRef} style={wrapperStyle}>
      <span style={srOnly}>{text}</span>
      <span aria-hidden className={className}>
        {displayText}
      </span>
    </motion.span>
  )
}
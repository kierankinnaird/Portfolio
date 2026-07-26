import styles from "./Button.module.css"

/**
 * Reusable button that renders as an <a> when `href` is provided,
 * otherwise a <button>. Variants: "primary" | "secondary".
 * Sizes: "md" (default) | "sm".
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ...props
}) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ")

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

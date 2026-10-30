import NextLink from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const styles =
  "min-h-hit inline-flex items-center underline underline-offset-4 transition-colors duration-200 hover:bg-accent hover:text-accent-ink";

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

// Underlined at rest so a link never relies on colour alone. Hover fills with
// the accent (a filled shape, which also works on the light theme).
export function TextLink({ href, children, className }: TextLinkProps) {
  const classes = className ? `${styles} ${className}` : styles;

  if (isInternal(href)) {
    return (
      <NextLink href={href} className={classes}>
        {children}
      </NextLink>
    );
  }

  const opensNewTab = href.startsWith("http");

  return (
    <a
      href={href}
      className={classes}
      {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {opensNewTab ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}

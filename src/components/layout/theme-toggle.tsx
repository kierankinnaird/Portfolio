"use client";

import { useTheme } from "@/components/layout/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      onClick={toggleTheme}
      className="group min-h-hit flex w-64 items-center"
    >
      <span className="bg-ink-muted group-hover:bg-ink relative block h-32 w-64 rounded-full transition-colors duration-200">
        {/* Position comes from data-theme, which the inline script sets before
            paint, so a saved light choice never animates on load. */}
        <span className="bg-bg absolute top-4 left-4 h-24 w-24 rounded-full transition-transform duration-300 [:root[data-theme=dark]_&]:translate-x-32" />
      </span>
    </button>
  );
}

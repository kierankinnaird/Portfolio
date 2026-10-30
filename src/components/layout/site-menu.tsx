"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";
import type { NavItem } from "@/types/content";

interface SiteMenuProps {
  items: NavItem[];
}

export function SiteMenu({ items }: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useClickOutside(containerRef, close, open);

  useEffect(() => {
    if (open) panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (open && event.key === "Escape") closeAndRestoreFocus();
  };

  // Tabbing out of the open panel closes it, so it never lingers behind
  // whatever the keyboard user moved on to.
  const onBlur = (event: React.FocusEvent) => {
    if (open && !containerRef.current?.contains(event.relatedTarget)) close();
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className="relative"
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="text-small min-h-hit min-w-hit tracking-label cursor-pointer uppercase"
      >
        {open ? "Close" : "Menu"}
      </button>

      <ul
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="border-rule bg-bg absolute top-full left-0 min-w-xs border"
      >
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={closeAndRestoreFocus}
              className="text-small tracking-label hover:bg-accent hover:text-accent-ink aria-[current=page]:border-ink block border-l-2 border-transparent p-16 uppercase transition-colors duration-200 focus-visible:-outline-offset-2 aria-[current=page]:font-semibold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

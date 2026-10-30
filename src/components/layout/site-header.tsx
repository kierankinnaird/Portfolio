import Link from "next/link";

import { SiteMenu } from "@/components/layout/site-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { fullName } from "@/content/site";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="bg-bg border-rule fixed inset-x-0 top-0 z-20 border-b">
      <div className="px-gutter max-w-content mx-auto grid h-64 grid-cols-[1fr_auto_1fr] items-center">
        {/* The nav landmark only exists once there is something to navigate to;
            the empty cell keeps the wordmark centred in the grid. */}
        {navigation.length > 0 ? (
          <nav aria-label="Primary" className="justify-self-start">
            <SiteMenu items={navigation} />
          </nav>
        ) : (
          <div />
        )}

        <Link
          href="/"
          className="text-small tracking-label min-h-hit flex items-center justify-self-center uppercase"
        >
          {fullName}
        </Link>

        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

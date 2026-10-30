import { fullName, site } from "@/content/site";

// Temporary: replaced by the hero in step 4.
export default function Home() {
  return (
    <main className="bg-bg text-ink p-gutter">
      <h1 className="text-title">{fullName}</h1>
      <p className="text-lead text-ink-muted mt-16">{site.tagline}</p>
    </main>
  );
}

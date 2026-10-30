import { TextLink } from "@/components/ui/link";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

interface ContactRow {
  label: string;
  value: string;
  href: string;
}

const rows: ContactRow[] = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  ...site.socials.map(({ label, href }) => ({
    label,
    value: href.replace(/^https?:\/\//, ""),
    href,
  })),
];

export function Contact() {
  return (
    <section className="px-gutter max-w-content mx-auto pt-128 pb-128">
      <h1 className="text-title">{contact.heading}</h1>
      <p className="text-lead text-ink-muted max-w-measure mt-16">
        {contact.intro}
      </p>

      <dl className="border-rule mt-64 border-t">
        {rows.map((row) => (
          <div
            key={row.label}
            className="border-rule grid gap-8 border-b py-24 md:grid-cols-12 md:items-baseline"
          >
            <dt className="text-small tracking-label text-ink-muted uppercase md:col-span-3">
              {row.label}
            </dt>
            <dd className="md:col-span-9">
              <TextLink
                href={row.href}
                className="text-lead md:text-title wrap-anywhere"
              >
                {row.value}
              </TextLink>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

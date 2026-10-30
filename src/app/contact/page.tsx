import type { Metadata } from "next";

import { Contact } from "@/components/sections/contact/contact";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: contact.heading,
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xingtong-lin-world.louisa20051018.chatgpt.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const base = new URL(siteUrl);
const title = "Xingtong (Louisa) Lin — Neuroscience & Biomedical Technology";
const description =
  "The interactive portfolio of Xingtong (Louisa) Lin, a Carnegie Mellon neuroscience and biomedical technology student researching EEG, behavior, cells, and useful technology.";

export const metadata: Metadata = {
    metadataBase: base,
    title,
    description,
    icons: {
      icon: `${basePath}/favicon.svg`,
      shortcut: `${basePath}/favicon.svg`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL(`${basePath}/og.png`, base).toString(), width: 1200, height: 630, alt: "Xingtong Louisa Lin portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL(`${basePath}/og.png`, base).toString()],
    },
  };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

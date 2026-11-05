import type { Metadata } from "next";
import "./globals.css";
import "./interactive-portfolio.css";
import "./styles/visual-refinement.css";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://louisa-lin-lxt.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const base = new URL(siteUrl);
const title = "Xingtong (Louisa) Lin — Neuroscience & Biomedical Technology";
const description =
  "Xingtong (Louisa) Lin — CMU Neuroscience and Biomedical Technology, a Business Administration minor, and Venture Fellow at Next Capital. Explore research, experience, and interests.";

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

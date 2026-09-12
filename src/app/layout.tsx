import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.home.title, template: "%s" },
  description: seo.home.description,
  alternates: { canonical: "/" },
  verification: { google: site.googleSiteVerification },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: site.url,
    title: seo.home.title,
    description: seo.home.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

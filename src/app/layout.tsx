import type { Metadata } from "next";
import { Schibsted_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { seo } from "@/data/seo";

// A sans carrega a frase. A serifada italica entra so no sotaque.
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--fonte-sans",
  display: "swap",
});

const sotaque = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--fonte-sotaque",
  display: "swap",
});

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
    <html lang="pt-BR" className={`${sans.variable} ${sotaque.variable}`}>
      <head>
        {/* Antes da pintura, para nao haver um quadro com o conteudo escondido
            se o React demorar, e para o conteudo ficar visivel sem JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.mentoria.title,
  description: seo.mentoria.description,
  alternates: { canonical: "/mentoria" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <Pagina h1={seo.mentoria.h1} intro="Acompanhamento mensal para quem já fez oficina e quer desenvolver trabalho próprio. R$390 por mês.">
      <AFazer>Página sem link no menu e com noindex, feita para ser enviada por WhatsApp no fim da aula individual. Rever o contrato da aluna contínua, que provavelmente deveria estar aqui e não como aula solta.</AFazer>
      <ContactForm assunto="/mentoria" />
    </Pagina>
  );
}

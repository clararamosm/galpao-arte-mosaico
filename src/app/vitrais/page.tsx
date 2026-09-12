import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.vitrais.title,
  description: seo.vitrais.description,
  alternates: { canonical: "/vitrais" },
};

export default function Page() {
  return (
    <Pagina h1={seo.vitrais.h1} intro="Vitral Tiffany com vidro fundido importado, fita de cobre e solda, e vitral em resina sobre policarbonato. Curso, encomenda e restauração.">
      <AFazer>Três blocos: curso em cima, que é quem traz busca; encomenda no meio, a partir de R$2.600 o metro quadrado; restauração embaixo, com o texto do post de 2018 sobre os vitrais do Retiro das Pedras como matéria-prima. Case da capela de quatro janelas.</AFazer>
      <ContactForm assunto="/vitrais" />
    </Pagina>
  );
}

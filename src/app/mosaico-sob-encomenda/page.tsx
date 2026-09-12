import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.mosaicoSobEncomenda.title,
  description: seo.mosaicoSobEncomenda.description,
  alternates: { canonical: "/mosaico-sob-encomenda" },
};

export default function Page() {
  return (
    <Pagina h1={seo.mosaicoSobEncomenda.h1} intro="Painéis, tampos, pisos e revestimentos em mosaico autoral para projetos de arquitetura e interiores.">
      <AFazer>Página de conversão para arquiteto, designer de ambiente e construtora, não de tráfego. Portfólio de obra instalada, processo de orçamento e prazo. Sem meta de busca: 13 impressões em 16 meses.</AFazer>
      <ContactForm assunto="/mosaico-sob-encomenda" />
    </Pagina>
  );
}

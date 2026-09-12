import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.aulasIndividuais.title,
  description: seo.aulasIndividuais.description,
  alternates: { canonical: "/aulas-individuais" },
};

export default function Page() {
  return (
    <Pagina h1={seo.aulasIndividuais.h1} intro="Seis horas, uma pessoa, no ateliê do apartamento. Mosaico a partir de R$620, vitral em resina a partir de R$900, vitral Tiffany R$2.200 em 12 horas. Material incluso, 50% na reserva e 50% na conclusão.">
      <AFazer>Tabela de preços visível, que é o filtro desta página. Texto que qualifica sem vender, e aponta a Oficina de Sábado para quem achar o preço alto. Arte têxtil fica fora do site por ora.</AFazer>
      <ContactForm assunto="/aulas-individuais" />
    </Pagina>
  );
}

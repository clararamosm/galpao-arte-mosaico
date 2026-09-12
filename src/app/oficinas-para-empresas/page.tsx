import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.oficinasParaEmpresas.title,
  description: seo.oficinasParaEmpresas.description,
  alternates: { canonical: "/oficinas-para-empresas" },
};

export default function Page() {
  return (
    <Pagina h1={seo.oficinasParaEmpresas.h1} intro="Dinâmica de mosaico para confraternização e integração, na empresa ou no galpão. De 6 a 90 anos, sem experiência.">
      <AFazer>Case do painel modular instalado no escritório em BH. Formato, duração de 2 a 3 horas, faixa de R$4.500 a R$9.000. Claro, Vale e a siderúrgica de Betim só entram com autorização por escrito para citar.</AFazer>
      <ContactForm assunto="/oficinas-para-empresas" />
    </Pagina>
  );
}

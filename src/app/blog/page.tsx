import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return (
    <Pagina h1={seo.blog.h1} intro="Técnica, bastidor de obra e histórias do ateliê.">
      <AFazer>Salvar os dois posts de 2018 antes de perder o Wix. O do Retiro das Pedras vira seção de /vitrais e também pode ficar aqui.</AFazer>
      <ContactForm assunto="/blog" />
    </Pagina>
  );
}

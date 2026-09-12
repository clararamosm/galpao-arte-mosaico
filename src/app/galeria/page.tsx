import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.galeria.title,
  description: seo.galeria.description,
  alternates: { canonical: "/galeria" },
};

export default function Page() {
  return (
    <Pagina h1={seo.galeria.h1} intro="Painéis, tampos, pisos, luminárias e vitrais instalados ao longo de 26 anos, em Belo Horizonte e no Espírito Santo.">
      <AFazer>Galeria de verdade, que o site atual nunca teve: o menu aponta para /produtos. Fotos são pré-requisito. Baixar tudo de static.wixstatic.com antes de cancelar o Wix.</AFazer>
      <ContactForm assunto="/galeria" />
    </Pagina>
  );
}

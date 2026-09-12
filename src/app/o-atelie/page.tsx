import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Pagina, AFazer } from "@/components/Pagina";

export const metadata: Metadata = {
  title: seo.oAtelie.title,
  description: seo.oAtelie.description,
  alternates: { canonical: "/o-atelie" },
};

export default function OAtelie() {
  const e = site.endereco;
  return (
    <>
      {/* Esta pagina alimenta o Perfil da Empresa. Endereco, telefone e horario
          precisam bater caractere por caractere com o que esta no Google. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${site.url}/o-atelie`,
          name: site.nome,
          url: `${site.url}/o-atelie`,
          description: seo.oAtelie.description,
          telephone: site.telefones.celular,
          address: {
            "@type": "PostalAddress",
            streetAddress: e.rua,
            addressLocality: e.cidade,
            addressRegion: e.estado,
            addressCountry: e.pais,
          },
          sameAs: [site.social.instagram, site.social.facebook, site.social.pinterest],
        }}
      />
      <Pagina
        h1={seo.oAtelie.h1}
        intro="O galpão do Prado é onde a Mônica executa as obras grandes e onde acontecem as Oficinas de Sábado. As aulas individuais são no ateliê do apartamento, mais intimista."
      >
        <AFazer>
          Como chegar, referência de quarteirão, estacionamento, horário de funcionamento e fotos
          atuais do galpão. Conferir cada dado contra o Perfil da Empresa antes de publicar.
        </AFazer>
      </Pagina>
    </>
  );
}

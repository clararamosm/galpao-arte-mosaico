import { seo } from "@/data/seo";
import { site, whatsappLink } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Assinatura } from "@/components/Assinatura";
import { Capsula } from "@/components/Capsula";
import { Botao } from "@/components/Botao";

export default function Home() {
  const e = site.endereco;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.nome,
          url: site.url,
          description: seo.home.description,
          telephone: site.telefones.celular,
          address: {
            "@type": "PostalAddress",
            streetAddress: e.rua,
            addressLocality: e.cidade,
            addressRegion: e.estado,
            addressCountry: e.pais,
          },
          founder: { "@type": "Person", name: site.artista },
          sameAs: [site.social.instagram, site.social.facebook, site.social.pinterest],
        }}
      />

      {/* O hero e o modelo de composicao de todas as paginas:
          assinatura, titulo-frase que ocupa a altura livre, e base ancorada. */}
      <section className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-[1440px] flex-col px-6 pb-28 sm:px-[72px]">
        <div className="pt-3">
          <Assinatura />
        </div>

        <h1 className="flex grow flex-col justify-center gap-1 py-8 text-[10.5vw] font-black leading-[0.95] tracking-[-0.04em] sm:gap-0 sm:py-0 sm:text-[clamp(56px,7.8vw,112px)] sm:leading-[0.92] sm:tracking-[-0.045em]">
          <span>Desde 2001</span>
          <span className="flex items-center gap-6">
            transformando
            <span className="hidden lg:inline">
              <Capsula largura={260} alt="Cacos de azulejo cortados à mão" />
            </span>
          </span>
          <span className="flex items-center gap-6">
            <span className="text-laranja-texto">caco</span> e{" "}
            <span className="text-verde">vidro</span>
            <span className="hidden lg:inline">
              <Capsula largura={200} alt="Vitral em laranja e verde" />
            </span>
          </span>
          {/* O unico ponto focal da tela. Uma vez por pagina. */}
          <em className="texto-vitral font-sotaque pb-3.5 text-[13vw] font-normal italic leading-[0.95] tracking-[-0.02em] lg:whitespace-nowrap sm:text-[clamp(72px,10vw,172px)]">
            em obra de arte.
          </em>
        </h1>

        {/* No celular o botao vem antes do texto de apoio: 77% dos cliques sao de
            telefone, e o que fica abaixo da dobra na pratica nao existe. */}
        <div className="flex flex-col gap-8 border-t-2 border-tinta pt-[22px] lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-wrap gap-3 lg:hidden">
            <Botao href="/oficina-de-sabado">Fazer uma oficina</Botao>
          </div>
          <p className="max-w-[500px] text-[19px] font-medium leading-[1.5]">
            Oficinas de mosaico e vitral para quem quer aprender o ofício com quem vive dele, e
            obra sob encomenda para casas, igrejas e empresas.
          </p>
          <p className="max-w-[230px] text-sm leading-[1.6] text-apoio">
            Casa Cor · Assembleia Legislativa de MG · Shopping Vitória · Barcelona
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="hidden lg:inline-block">
              <Botao href="/oficina-de-sabado">Fazer uma oficina</Botao>
            </span>
            <Botao href="/mosaico-sob-encomenda" tipo="secundario">
              Encomendar uma obra
            </Botao>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-[72px]">
        <h2 className="max-w-[18ch] text-[clamp(40px,5vw,64px)] font-black leading-[0.95] tracking-[-0.04em]">
          Um sábado, e você sai com a{" "}
          <span className="font-sotaque text-[1.2em] italic text-laranja-texto">peça pronta</span>
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {[
            ["Um sábado", "Das 9h às 14h30, no galpão do Prado."],
            ["Material incluso", "Ferramentas, azulejo, rejunte, café e lanche."],
            ["Sem experiência", "Ela conduz a técnica. A criação é inteiramente sua."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="text-[22px] font-extrabold leading-tight">{t}</h3>
              <p className="mt-2 text-[19px] leading-[1.5] text-apoio">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Botao href="/oficina-de-sabado">Ver as próximas datas</Botao>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-[72px]">
        <p className="text-[19px] leading-[1.5] text-apoio">
          Ateliê em {e.bairro}, {e.cidade}. Visitas com hora marcada.{" "}
          <a
            href={whatsappLink("Oi! Vim pelo site e queria marcar uma visita ao ateliê.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-verde underline underline-offset-4"
          >
            Falar no WhatsApp
          </a>
        </p>
      </section>
    </>
  );
}

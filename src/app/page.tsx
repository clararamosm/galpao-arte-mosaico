import Link from "next/link";
import { seo } from "@/data/seo";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { AFazer } from "@/components/Pagina";

const caminhos = [
  { href: "/oficina-de-sabado", titulo: "Oficina de Sábado", linha: "Um sábado no galpão, em turma pequena, e você sai com a peça pronta." },
  { href: "/aulas-individuais", titulo: "Aula individual", linha: "Seis horas, só você e a Mônica, no ateliê do apartamento." },
  { href: "/vitrais", titulo: "Vitral", linha: "Tiffany e resina. Curso, encomenda e restauração." },
  { href: "/oficinas-para-empresas", titulo: "Para empresas", linha: "O time faz um painel que fica na parede da empresa." },
];

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

      <section className="mx-auto max-w-3xl px-5 pt-16 pb-10">
        <h1 className="text-3xl leading-tight sm:text-5xl">{seo.home.h1}</h1>
        <p className="mt-6 text-lg leading-relaxed text-tinta/80">
          Ateliê da {site.artista}, em {e.bairro}, {e.cidade}. {site.anosDeOficio} anos de mosaico,
          vitral e obra instalada.
        </p>
        <Link
          href="/oficina-de-sabado"
          className="mt-8 inline-block rounded bg-terra px-6 py-3 text-sm font-medium text-papel transition hover:opacity-90"
        >
          Ver as próximas datas de sábado
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10">
        <h2 className="text-2xl">Quatro caminhos</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {caminhos.map((c) => (
            <li key={c.href} className="rounded border border-rejunte bg-white p-5">
              <Link href={c.href} className="font-[family-name:var(--font-titulo)] text-lg hover:text-azulejo">
                {c.titulo}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-tinta/75">{c.linha}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-5 py-10">
        <h2 className="text-2xl">Quem é a Mônica</h2>
        <AFazer>
          Bio curta a partir de <code>o-que-a-monica-ensina.md</code>. A vinda da tecelagem para o
          mosaico, os atalhos de técnica que ela criou, e o fato de não interferir na criação da
          aluna. Nada de pintura em vidro, costura ou modelagem, que saíram da oferta.
        </AFazer>
        <h2 className="text-2xl">Prova</h2>
        <AFazer>
          Casa Cor, Assembleia Legislativa de MG, Shopping Vitória, curso em Barcelona, capela de
          quatro janelas. Fotos são pré-requisito, não acabamento.
        </AFazer>
      </section>
    </>
  );
}

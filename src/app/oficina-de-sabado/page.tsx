import type { Metadata } from "next";
import Link from "next/link";
import { seo } from "@/data/seo";
import { site, whatsappLink } from "@/data/site";
import { getOficinas, formatarData, formatarPreco, PRECO_PADRAO } from "@/data/oficinas";
import { JsonLd } from "@/components/JsonLd";
import { AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.oficinaDeSabado.title,
  description: seo.oficinaDeSabado.description,
  alternates: { canonical: "/oficina-de-sabado" },
};

const grade = [
  ["9h00", "Chegada, café, materiais e ferramentas, escolha do projeto"],
  ["9h30", "Corte e assentamento"],
  ["12h30", "Lanche, 30 minutos, tempo de cura da cola"],
  ["13h00", "Rejunte, limpeza e acabamento"],
  ["14h30", "Fim, foto das peças, todo mundo sai com a peça pronta"],
];

export default function OficinaDeSabado() {
  const oficinas = getOficinas();
  const e = site.endereco;

  return (
    <>
      {oficinas.map((o) => (
        <JsonLd
          key={o.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: `Oficina de mosaico: ${o.peca}`,
            description: o.descricao,
            startDate: o.inicio,
            endDate: o.fim,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            organizer: { "@type": "Organization", name: site.nome, url: site.url },
            location: {
              "@type": "Place",
              name: site.nome,
              address: {
                "@type": "PostalAddress",
                streetAddress: e.rua,
                addressLocality: e.cidade,
                addressRegion: e.estado,
                addressCountry: e.pais,
              },
            },
            offers: {
              "@type": "Offer",
              price: o.precoBRL,
              priceCurrency: "BRL",
              availability:
                o.vagasDisponiveis > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/SoldOut",
              url: `${site.url}/oficina-de-sabado`,
            },
          }}
        />
      ))}

      <article className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="text-3xl leading-tight sm:text-4xl">{seo.oficinaDeSabado.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-tinta/80">
          Oficina presencial de mosaico no galpão do Prado, em Belo Horizonte. Das 9h às 14h30,
          turma pequena, material e ferramentas inclusos. Sem experiência nenhuma.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl">Próximas datas</h2>

          {oficinas.length === 0 ? (
            <div className="mt-5 rounded border border-dashed border-terra/50 bg-terra/5 p-5 text-sm leading-relaxed">
              <strong className="font-medium">Bloqueante:</strong> as duas primeiras datas ainda não
              vieram da Mônica. Sem data, esta página não pode ir ao ar como página de inscrição.
              Preencher em <code>src/data/oficinas.ts</code>.
            </div>
          ) : (
            <ul className="mt-5 space-y-4">
              {oficinas.map((o) => (
                <li key={o.id} className="rounded border border-rejunte bg-white p-5">
                  <p className="font-[family-name:var(--font-titulo)] text-lg capitalize">
                    {formatarData(o.inicio)}
                  </p>
                  <p className="mt-1 text-sm text-tinta/75">
                    {o.peca}. {o.descricao}
                  </p>
                  <p className="mt-3 text-sm">
                    {formatarPreco(o.precoBRL)} com material incluso,{" "}
                    {o.vagasDisponiveis > 0
                      ? `${o.vagasDisponiveis} de ${o.vagasTotais} vagas`
                      : "turma cheia"}
                  </p>
                  {o.vagasDisponiveis > 0 ? (
                    <a
                      href={whatsappLink(
                        `Oi! Quero garantir minha vaga na Oficina de Sábado de ${formatarData(o.inicio)}, a peça da ${o.peca}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-evento="clique-inscricao"
                      className="mt-4 inline-block rounded bg-terra px-5 py-2.5 text-sm font-medium text-papel transition hover:opacity-90"
                    >
                      Garantir minha vaga
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl">Como é o dia</h2>
          <dl className="mt-5 space-y-3">
            {grade.map(([hora, o]) => (
              <div key={hora} className="flex gap-4 text-sm leading-relaxed">
                <dt className="w-16 shrink-0 font-medium tabular-nums">{hora}</dt>
                <dd className="text-tinta/80">{o}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl">O que está incluso</h2>
          <AFazer>
            Material, ferramentas, café da manhã e lanche. Vale detalhar a peça, porque a agenda é
            rotativa e a peça muda a cada sábado. Preço base {formatarPreco(PRECO_PADRAO)}.
          </AFazer>
          <h2 className="text-2xl">Para quem nunca fez</h2>
          <AFazer>
            A objeção número um é achar que precisa saber desenhar. A resposta é o método dela: ela
            conduz sem interferir, e o erro vira acerto. Texto a partir da entrevista.
          </AFazer>
        </section>

        {/* Unico link para a pagina de interceptacao, junto com o de /pecas.
            Fora do rodape de proposito: a palavra ceramica nao pode aparecer
            nas doze paginas, e nunca na home. */}
        <p className="mt-12 text-sm text-tinta/70">
          Chegou aqui procurando aula de cerâmica?{" "}
          <Link href="/mosaico-ou-ceramica" className="underline underline-offset-4 hover:text-azulejo">
            Veja a diferença entre as duas
          </Link>
          .
        </p>

        <section className="mt-12">
          <h2 className="text-2xl">Ainda com dúvida?</h2>
          <p className="mt-3 text-sm text-tinta/75">
            Deixe seu WhatsApp e a Mônica responde.
          </p>
          <div className="mt-5">
            <ContactForm assunto="Oficina de Sábado" />
          </div>
        </section>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { seo } from "@/data/seo";
import { AFazer } from "@/components/Pagina";

export const metadata: Metadata = {
  title: seo.mosaicoOuCeramica.title,
  description: seo.mosaicoOuCeramica.description,
  alternates: { canonical: "/mosaico-ou-ceramica" },
};

const comparacao = [
  ["Forno", "Precisa. A peça é queimada.", "Não precisa."],
  ["Sessões até levar a peça", "Duas ou três, com cura e queima entre elas.", "Uma. Você sai com ela."],
  ["O que você usa", "Argila.", "Azulejo, cerâmica, pastilha e vidro cortados à mão."],
  ["Precisa saber desenhar", "Ajuda.", "Não."],
];

export default function MosaicoOuCeramica() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-3xl leading-tight sm:text-4xl">{seo.mosaicoOuCeramica.h1}</h1>

      <p className="mt-5 text-lg leading-relaxed text-tinta/80">
        O Galpão Arte Mosaico não trabalha com cerâmica. Não tem forno, não tem torno e não tem
        modelagem em argila. Se é isso que você procura, esta página vai te economizar tempo.
      </p>
      <p className="mt-4 leading-relaxed text-tinta/80">
        Mas cerâmica é um dos materiais que a Mônica usa no mosaico, junto com azulejo, pastilha e
        vidro. E se o que te trouxe até aqui foi a vontade de sair da tela, usar as mãos e levar
        alguma coisa feita por você para casa, tem uma diferença que talvez importe mais que a
        técnica.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-rejunte text-left">
              <th className="py-3 pr-4 font-medium"> </th>
              <th className="py-3 pr-4 font-medium">Cerâmica</th>
              <th className="py-3 font-medium">Mosaico</th>
            </tr>
          </thead>
          <tbody>
            {comparacao.map(([q, c, m]) => (
              <tr key={q} className="border-b border-rejunte/60 align-top">
                <td className="py-3 pr-4 font-medium">{q}</td>
                <td className="py-3 pr-4 text-tinta/75">{c}</td>
                <td className="py-3 text-tinta/75">{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-6">
        <AFazer>
          Um parágrafo honesto sobre por que a cerâmica virou hype e por que a promessa que atrai
          (usar as mãos, sair com a peça) o mosaico cumpre em um dia. Sem depreciar cerâmica.
        </AFazer>
      </div>

      <Link
        href="/oficina-de-sabado"
        className="mt-8 inline-block rounded bg-terra px-6 py-3 text-sm font-medium text-papel transition hover:opacity-90"
      >
        Ver a Oficina de Sábado
      </Link>
    </article>
  );
}

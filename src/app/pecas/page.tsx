import type { Metadata } from "next";
import Link from "next/link";
import { seo } from "@/data/seo";
import { Pagina, AFazer } from "@/components/Pagina";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: seo.pecas.title,
  description: seo.pecas.description,
  alternates: { canonical: "/pecas" },
};

export default function Page() {
  return (
    <Pagina h1={seo.pecas.h1} intro="Espelhos, tampos, bandejas e quadros feitos à mão no ateliê. Não estão à venda: estão aqui para mostrar o que dá para aprender a fazer.">
      <AFazer>Galeria sem preço e sem carrinho, por decisão da Mônica. Cada peça com uma linha sobre técnica e um caminho para a Oficina de Sábado. ATENÇÃO: title e meta desta página são provisórios até filtrar /produtos-pronta-entrega por página no Search Console. São 67 cliques em jogo.</AFazer>
      <p className="text-sm text-tinta/70">
        Chegou aqui procurando aula de cerâmica?{" "}
        <Link href="/mosaico-ou-ceramica" className="underline underline-offset-4 hover:text-verde">
          Veja a diferença entre as duas
        </Link>
        .
      </p>
      <ContactForm assunto="/pecas" />
    </Pagina>
  );
}

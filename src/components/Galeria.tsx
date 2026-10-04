import Image from "next/image";

export type Foto = { src: string; alt: string };

/**
 * Galerias espalhadas pelo site, cada uma com um proposito, em vez de uma
 * pagina unica de galeria. Decisao da Clara em 04/10/2026.
 *
 * No celular vira uma faixa que rola na horizontal, para nao empurrar o
 * conteudo seguinte para tres rolagens abaixo.
 */
export function Galeria({
  fotos,
  legenda,
  altura = "alta",
}: {
  fotos: Foto[];
  legenda?: string;
  altura?: "alta" | "baixa";
}) {
  const h = altura === "alta" ? "h-[280px] sm:h-[360px]" : "h-[200px] sm:h-[260px]";
  return (
    <figure className="mt-10">
      <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 lg:-mx-[72px] lg:px-[72px]">
        {fotos.map((f) => (
          <div key={f.src} className={`foto-galeria relative ${h} w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[400px]`}>
            <Image
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 640px) 78vw, 400px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {legenda ? (
        <figcaption className="mt-3 text-sm leading-[1.6] text-apoio">{legenda}</figcaption>
      ) : null}
    </figure>
  );
}

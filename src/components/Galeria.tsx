import Image from "next/image";

export type Foto = { src: string; alt: string };

/**
 * Galerias espalhadas pelo site, cada uma com um proposito, em vez de uma
 * pagina unica de galeria. Decisao da Clara em 04/10/2026.
 *
 * No celular vira uma faixa que rola na horizontal, para nao empurrar o
 * conteudo seguinte para tres rolagens abaixo. As larguras alternam de
 * proposito: faixa de retangulos identicos vira listra, e a home ja tem
 * texto demais em bloco.
 */
export function Galeria({
  fotos,
  legenda,
  altura = "alta",
  tom = "papel",
}: {
  fotos: Foto[];
  legenda?: string;
  altura?: "alta" | "baixa";
  tom?: "papel" | "escuro";
}) {
  const h = altura === "alta" ? "h-[340px] sm:h-[400px]" : "h-[260px] sm:h-[300px]";
  const escuro = tom === "escuro";
  const corApoio = escuro ? "text-papel/65" : "text-apoio";

  return (
    <figure className="mt-10">
      {/* scroll-pl: sem isso o snap encosta a primeira foto na borda da tela e
          come o respiro lateral de 24px que o resto da pagina mantem. */}
      <div className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-3 overflow-x-auto px-6 pb-3 lg:-mx-[72px] lg:scroll-pl-[72px] lg:px-[72px]">
        {fotos.map((f, i) => {
          // Ritmo 2 a 1: duas largas, uma estreita. Nunca duas estreitas juntas.
          const estreita = i % 3 === 2;
          const w = estreita ? "w-[48vw] sm:w-[280px]" : "w-[74vw] sm:w-[420px]";
          return (
            <div
              key={f.src}
              className={`foto-galeria relative ${h} ${w} shrink-0 snap-start overflow-hidden`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={
                  estreita ? "(max-width: 640px) 48vw, 280px" : "(max-width: 640px) 74vw, 420px"
                }
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {legenda ? (
          <figcaption className={`text-sm leading-[1.6] ${corApoio}`}>{legenda}</figcaption>
        ) : null}
        <span className={`text-sm leading-[1.6] sm:hidden ${corApoio}`} aria-hidden="true">
          arraste para o lado
        </span>
      </div>
    </figure>
  );
}

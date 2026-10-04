/** Bloco da home. Titulo grande, sotaque em italico, e o conteudo embaixo. */
import { Revelar } from "./Revelar";

/**
 * A home passa de cinco mil pixels de altura no celular. Tudo no mesmo papel
 * cru vira parede de texto, que foi a critica da Clara em 04/10/2026.
 * O tom escuro quebra isso uma vez so, na secao das obras, onde a foto e o
 * assunto: fundo chumbo faz o mosaico saltar. Uma quebra de simetria, e so uma.
 */
export function Secao({
  id,
  titulo,
  sotaque,
  intro,
  children,
  sotaqueNaLinhaDeBaixo = false,
  tom = "papel",
}: {
  id: string;
  titulo: string;
  sotaque?: string;
  intro?: string;
  children?: React.ReactNode;
  /** Regra da Clara: o que vem depois do ponto final comeca na linha de baixo. */
  sotaqueNaLinhaDeBaixo?: boolean;
  tom?: "papel" | "escuro";
}) {
  const escuro = tom === "escuro";

  return (
    <section
      id={id}
      className={
        escuro ? "scroll-mt-24 bg-chumbo text-papel" : "scroll-mt-24 border-t-2 border-tinta"
      }
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-[72px] lg:py-28">
        <Revelar>
          <h2 className="max-w-[20ch] text-[clamp(38px,5vw,64px)] font-black leading-[0.95] tracking-[-0.04em]">
            {titulo}
            {sotaque ? (
              <>
                {" "}
                <span
                  className={`font-sotaque text-[1.15em] italic ${
                    escuro ? "text-laranja" : "text-laranja-texto"
                  }${sotaqueNaLinhaDeBaixo ? " apos-ponto" : ""}`}
                >
                  {sotaque}
                </span>
              </>
            ) : null}
          </h2>
          {intro ? (
            <p
              className={`mt-7 max-w-[62ch] text-[19px] font-medium leading-[1.5] ${
                escuro ? "text-papel/85" : ""
              }`}
            >
              {intro}
            </p>
          ) : null}
        </Revelar>
        {children}
      </div>
    </section>
  );
}

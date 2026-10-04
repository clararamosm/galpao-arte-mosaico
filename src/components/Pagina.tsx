export function Pagina({
  h1,
  intro,
  children,
}: {
  h1: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-[72px]">
      <h1 className="max-w-[20ch] text-[clamp(40px,5.5vw,72px)] font-black leading-[0.95] tracking-[-0.04em]">
        {h1}
      </h1>
      {intro ? (
        <p className="mt-7 max-w-[62ch] text-[19px] font-medium leading-[1.5]">{intro}</p>
      ) : null}
      <div className="mt-12 max-w-[72ch] space-y-7 text-[19px] leading-[1.5]">{children}</div>
    </article>
  );
}

/** Marca um bloco cujo texto final vem da sessao de ofertas e materiais. */
export function AFazer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-laranja bg-laranja/10 p-5 text-[17px] leading-relaxed text-apoio">
      <strong className="font-bold text-tinta">A escrever:</strong> {children}
    </div>
  );
}

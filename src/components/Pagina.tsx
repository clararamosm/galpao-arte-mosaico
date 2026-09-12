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
    <article className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-3xl leading-tight sm:text-4xl">{h1}</h1>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-tinta/80">{intro}</p> : null}
      <div className="mt-10 space-y-6 leading-relaxed">{children}</div>
    </article>
  );
}

/** Marca um bloco cujo texto final vem da sessao de ofertas e materiais. */
export function AFazer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border border-dashed border-terra/40 bg-terra/5 p-4 text-sm text-tinta/70">
      <strong className="font-medium">A escrever:</strong> {children}
    </div>
  );
}

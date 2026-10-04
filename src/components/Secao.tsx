/** Bloco da home. Titulo grande, sotaque em italico, e o conteudo embaixo. */
export function Secao({
  id,
  titulo,
  sotaque,
  intro,
  children,
}: {
  id: string;
  titulo: string;
  sotaque?: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 border-t-2 border-tinta px-6 py-20 lg:px-[72px] lg:py-28"
    >
      <h2 className="max-w-[20ch] text-[clamp(38px,5vw,64px)] font-black leading-[0.95] tracking-[-0.04em]">
        {titulo}
        {sotaque ? (
          <>
            {" "}
            <span className="font-sotaque text-[1.15em] italic text-laranja-texto">{sotaque}</span>
          </>
        ) : null}
      </h2>
      {intro ? (
        <p className="mt-7 max-w-[62ch] text-[19px] font-medium leading-[1.5]">{intro}</p>
      ) : null}
      {children}
    </section>
  );
}

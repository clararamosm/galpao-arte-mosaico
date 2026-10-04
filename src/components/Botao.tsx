import Link from "next/link";

/** Cantos retos de proposito. O peso vem da cor e da tipografia, nao da forma. */
export function Botao({
  href,
  children,
  tipo = "principal",
  externo = false,
  evento,
}: {
  href: string;
  children: React.ReactNode;
  tipo?: "principal" | "secundario";
  externo?: boolean;
  evento?: string;
}) {
  const base =
    "inline-block px-[30px] py-5 text-[17px] font-extrabold leading-none transition hover:opacity-90";
  const cor =
    tipo === "principal" ? "bg-laranja text-tinta" : "bg-tinta text-papel";
  const cls = `${base} ${cor}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-evento={evento}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-evento={evento}>
      {children}
    </Link>
  );
}

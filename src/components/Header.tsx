import Link from "next/link";
import { site } from "@/data/site";

/** /mentoria e /mosaico-ou-ceramica ficam fora do menu, por decisao de estrategia. */
const menu = [
  { href: "/oficina-de-sabado", label: "Oficina de Sábado" },
  { href: "/aulas-individuais", label: "Aulas individuais" },
  { href: "/vitrais", label: "Vitrais" },
  { href: "/galeria", label: "Galeria" },
  { href: "/pecas", label: "Peças" },
  { href: "/o-atelie", label: "O ateliê" },
];

export function Header() {
  return (
    <header className="border-b border-rejunte">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <Link href="/" className="font-[family-name:var(--font-titulo)] text-lg">
          {site.nome}
        </Link>
        <nav aria-label="Principal">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {menu.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-azulejo hover:underline underline-offset-4">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

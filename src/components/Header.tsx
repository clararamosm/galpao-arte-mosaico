import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

/**
 * Logo a esquerda, menu a direita, sem fundo, sobre o papel.
 *
 * NOTA DE DIVERGENCIA: o hero aprovado mostra cinco itens, com "Sobre a Monica"
 * e sem "Pecas" e sem "O atelie". Aqui estao os seis da arquitetura acordada,
 * porque `/pecas` herda 66 cliques e `/o-atelie` e quem alimenta o Maps, e porque
 * nao existe pagina `/sobre` no plano: a bio da Monica vive na home.
 * Decisao pendente da Clara.
 */
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
    <header className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-4 sm:gap-5 sm:py-6 sm:px-[72px]">
      <Link href="/" aria-label={site.nome}>
        <Image
          src="/identidade/logo.png"
          alt={site.nome}
          width={718}
          height={386}
          priority
          className="h-10 w-auto sm:h-[52px]"
        />
      </Link>
      <nav aria-label="Principal">
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-medium sm:gap-x-[30px] sm:text-[15px]">
          {menu.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="hover:text-[#C4501C]">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

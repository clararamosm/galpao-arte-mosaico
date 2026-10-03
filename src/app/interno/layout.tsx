import type { Metadata } from "next";

// Area interna. Nao aparece no menu, nao entra no sitemap e esta bloqueada no
// robots.txt. Nao e area privada: quem souber a URL abre. Nao colocar nada
// sigiloso aqui. Para fechar de verdade, usar a protecao por senha do Vercel.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LayoutInterno({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

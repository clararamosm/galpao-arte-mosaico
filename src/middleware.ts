import { NextResponse, type NextRequest } from "next/server";

/**
 * Mapa de redirecionamento da migracao Wix para Vercel.
 * Ver `spec-migracao-site.md`, secao "Mapa de redirecionamento".
 *
 * Por que middleware e nao `redirects()` do next.config:
 * 1. O helper do Next emite 308 quando `permanent: true`. O Google trata 308 e 301
 *    como equivalentes, mas a spec pede 301 e crawlers de auditoria sinalizam 308
 *    como divergencia. Aqui o codigo e 301 literal.
 * 2. A normalizacao de barra final do Next roda antes de `redirects()` e criava
 *    cadeia de dois saltos. Aqui barra final e mapa sao resolvidos juntos, num
 *    unico 301.
 *
 * `/`     -> `/`     mesma URL, 92% dos cliques. Fora do mapa de proposito.
 * `/blog` -> `/blog` mantida. Fora do mapa de proposito.
 */
const mapa: Record<string, string> = {
  "/produtos-pronta-entrega": "/pecas",
  "/produtos-sob-encomenda": "/mosaico-sob-encomenda",
  "/produtos": "/pecas",
  "/galeria-de-produtos": "/pecas",
  "/single-post/2018/07/05/vitrais-e-instala-c3-a7-c3-a3o": "/vitrais",
  "/single-post/2018/07/11/workshop-de-marcenaria-para-mulheres": "/oficina-de-sabado",
};

function destinoDe(path: string): string | null {
  if (mapa[path]) return mapa[path];
  // Rede de seguranca: qualquer outro post antigo do blog Wix cai no blog novo.
  if (path.startsWith("/single-post/")) return "/blog";
  return null;
}

export function middleware(req: NextRequest) {
  const bruto = req.nextUrl.pathname;
  const limpo = bruto.replace(/\/+$/, "") || "/";

  const destino = destinoDe(limpo);

  // Uma unica volta: ou vai direto para o destino final da migracao,
  // ou so normaliza a barra final. Nunca os dois em sequencia.
  const alvo = destino ?? (bruto !== limpo ? limpo : null);
  if (!alvo) return NextResponse.next();

  // Montar a URL do zero, e nao com `req.nextUrl.clone()`: o clone carrega o estado
  // de barra final da requisicao e reinjeta a barra no destino, o que transforma
  // `/vitrais/` num 301 para ele mesmo, em loop.
  const url = new URL(alvo, req.url);
  if (!destino) url.search = req.nextUrl.search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Tudo, menos assets e arquivos com extensao.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"],
};

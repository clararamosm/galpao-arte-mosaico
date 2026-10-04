import type { Foto } from "@/components/Galeria";

/**
 * Selecao provisoria, para a estrutura poder ser julgada. A curadoria final da
 * Clara substitui os arquivos em public/fotos sem mexer neste arquivo.
 *
 * As fotos de aula tem autorizacao de uso confirmada pela Clara em 03/10/2026.
 * Todas passaram pela conversao que removeu o metadado de GPS.
 */
export const fotosAulas: Foto[] = Array.from({ length: 12 }, (_, i) => ({
  src: `/fotos/aulas/aula-${i + 1}.jpg`,
  alt: "Peça feita por uma aluna na oficina do Galpão Arte Mosaico",
}));

export const fotosObras: Foto[] = Array.from({ length: 12 }, (_, i) => ({
  src: `/fotos/obras/obra-${i + 1}.jpg`,
  alt: "Obra em mosaico executada por Mônica Fonseca",
}));

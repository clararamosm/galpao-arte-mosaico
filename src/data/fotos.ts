import type { Foto } from "@/components/Galeria";

/**
 * Selecao provisoria, espacada ao longo do acervo convertido para dar variedade.
 * A curadoria final da Clara substitui os arquivos em public/fotos sem mexer
 * neste arquivo.
 *
 * As fotos de aula tem autorizacao de uso confirmada pela Clara em 03/10/2026.
 * Todas passaram pela conversao que removeu o metadado de GPS.
 */
function serie(pasta: string, prefixo: string, de: number, ate: number, alt: string): Foto[] {
  const fotos: Foto[] = [];
  for (let i = de; i <= ate; i++) {
    fotos.push({ src: `/fotos/${pasta}/${prefixo}-${i}.jpg`, alt });
  }
  return fotos;
}

/** Oficina de Sabado: as 12 primeiras. */
export const fotosOficina = serie(
  "aulas",
  "aula",
  1,
  12,
  "Peça feita por uma aluna na Oficina de Sábado do Galpão Arte Mosaico",
);

/** Aulas individuais: as 12 seguintes, para as duas galerias nao se repetirem. */
export const fotosAulasIndividuais = serie(
  "aulas",
  "aula",
  13,
  24,
  "Peça feita em aula individual no ateliê de Mônica Fonseca",
);

export const fotosObras = serie(
  "obras",
  "obra",
  1,
  16,
  "Obra em mosaico e vitral executada por Mônica Fonseca",
);

// Agenda da Oficina de Sábado.
//
// ATENCAO: mecanismo de edicao ainda nao decidido (spec, "O que esta spec nao cobre").
// Hoje editar aqui exige deploy. A interface abaixo foi desenhada para que trocar
// a fonte por planilha ou CMS seja alteracao deste arquivo e de mais nenhum.
//
// Para trocar a fonte depois, basta reimplementar `getOficinas()`.

export type Oficina = {
  id: string;
  /** ISO 8601 com fuso, ex.: 2026-09-26T09:00:00-03:00 */
  inicio: string;
  fim: string;
  /** A peca da agenda rotativa, ex.: "Moldura de espelho" */
  peca: string;
  /** Uma linha sobre a peca, aparece no card */
  descricao: string;
  precoBRL: number;
  vagasTotais: number;
  vagasDisponiveis: number;
  /** "galpao" ou "apartamento". A de sabado e sempre no galpao. */
  local: "galpao";
};

// Decisao da Clara em 12/09/2026: 6 a 7 vagas, nao 10.
export const VAGAS_PADRAO = 7;
export const PRECO_PADRAO = 450;

const agenda: Oficina[] = [
  // TODO BLOQUEANTE: as duas primeiras datas ainda nao vieram da Monica.
  // Sem elas a pagina nao pode ser publicada como pagina de inscricao.
  // Exemplo de formato, remover quando as datas reais chegarem:
  //
  // {
  //   id: "2026-09-26",
  //   inicio: "2026-09-26T09:00:00-03:00",
  //   fim: "2026-09-26T14:30:00-03:00",
  //   peca: "Moldura de espelho",
  //   descricao: "Espelho redondo de 30 cm, revestido em azulejo cortado à mão.",
  //   precoBRL: PRECO_PADRAO,
  //   vagasTotais: VAGAS_PADRAO,
  //   vagasDisponiveis: VAGAS_PADRAO,
  //   local: "galpao",
  // },
];

export function getOficinas(): Oficina[] {
  const agora = Date.now();
  return agenda
    .filter((o) => new Date(o.inicio).getTime() > agora)
    .sort((a, b) => a.inicio.localeCompare(b.inicio));
}

export function formatarData(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export function formatarPreco(v: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(v);
}

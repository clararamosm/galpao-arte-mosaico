// Agenda da Oficina de Sábado.
//
// Fonte: uma planilha do Google Sheets publicada como CSV, para que a Mônica
// edite data e peça sem deploy e sem aprender interface nova. O endereco vem da
// variavel de ambiente AGENDA_CSV_URL.
//
// Sem a variavel definida, cai no array local `agendaLocal`, que hoje esta vazio.
// O site nao quebra: a pagina mostra o estado "sem datas publicadas".
//
// Para trocar a fonte depois (CMS, admin proprio, banco), reimplementar
// `getOficinas()` e mais nada no projeto precisa mudar.

export type Oficina = {
  id: string;
  /** ISO 8601 com fuso, ex.: 2026-10-17T09:00:00-03:00 */
  inicio: string;
  fim: string;
  /** A peca da agenda rotativa, ex.: "Moldura de espelho" */
  peca: string;
  descricao: string;
  precoBRL: number;
  vagasTotais: number;
  vagasDisponiveis: number;
  local: "galpao";
};

// Decisao da Clara em 12/09/2026: 6 a 7 vagas, nao 10.
export const VAGAS_PADRAO = 7;
export const PRECO_PADRAO = 450;
export const HORA_INICIO_PADRAO = "09:00";
export const HORA_FIM_PADRAO = "14:30";

// As duas primeiras datas (17 e 31 de outubro de 2026) vivem na PLANILHA, nao aqui.
// Planilha "Eventos - Galpao arte mosaico". O endereco esta em .env.example.
// Este array e so o fallback de quando AGENDA_CSV_URL nao esta definida.
const agendaLocal: Oficina[] = [];

/* ------------------------------------------------------------------ *
 * Leitura da planilha
 * ------------------------------------------------------------------ */

/** Parser de CSV que respeita campo entre aspas com virgula e quebra de linha. */
function parseCSV(texto: string): string[][] {
  const linhas: string[][] = [];
  let campo = "";
  let linha: string[] = [];
  let dentroDeAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (dentroDeAspas) {
      if (c === '"') {
        if (texto[i + 1] === '"') { campo += '"'; i++; } else { dentroDeAspas = false; }
      } else campo += c;
      continue;
    }
    if (c === '"') { dentroDeAspas = true; continue; }
    if (c === ",") { linha.push(campo); campo = ""; continue; }
    if (c === "\n" || c === "\r") {
      if (c === "\r" && texto[i + 1] === "\n") i++;
      linha.push(campo); campo = "";
      if (linha.some((v) => v.trim() !== "")) linhas.push(linha);
      linha = [];
      continue;
    }
    campo += c;
  }
  linha.push(campo);
  if (linha.some((v) => v.trim() !== "")) linhas.push(linha);
  return linhas;
}

function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Aceita 17/10/2026, 17-10-2026, 2026-10-17 e 17/10/26.
 * Retorna a parte de data em ISO, ou null se nao der para entender.
 * Ambiguidade de dia e mes nao existe aqui: o formato brasileiro e sempre dia primeiro.
 */
function parseData(bruto: string): string | null {
  const v = bruto.trim();
  if (!v) return null;

  let m = v.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;

  m = v.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/);
  if (m) {
    const dia = m[1].padStart(2, "0");
    const mes = m[2].padStart(2, "0");
    const ano = m[3].length === 2 ? `20${m[3]}` : m[3];
    const d = Number(dia), mo = Number(mes);
    if (d < 1 || d > 31 || mo < 1 || mo > 12) return null;
    return `${ano}-${mes}-${dia}`;
  }
  return null;
}

function parseHora(bruto: string, padrao: string): string {
  const m = bruto.trim().match(/^(\d{1,2})[:h.]?(\d{2})?/);
  if (!m) return padrao;
  const h = m[1].padStart(2, "0");
  const min = (m[2] ?? "00").padStart(2, "0");
  if (Number(h) > 23 || Number(min) > 59) return padrao;
  return `${h}:${min}`;
}

function parseNumero(bruto: string, padrao: number): number {
  const limpo = bruto.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const n = Number(limpo);
  return Number.isFinite(n) && n >= 0 ? n : padrao;
}

/** Aceita variacoes de cabecalho, para a planilha nao quebrar por acento ou maiuscula. */
const colunas: Record<string, string[]> = {
  data: ["data"],
  peca: ["peca", "peça", "projeto"],
  descricao: ["descricao", "descrição", "detalhe"],
  vagasTotais: ["vagas", "vagas totais", "total de vagas"],
  vagasDisponiveis: ["vagas disponiveis", "vagas disponíveis", "disponiveis", "sobraram"],
  preco: ["preco", "preço", "valor"],
  inicio: ["inicio", "início", "hora inicio", "hora de inicio", "comeca"],
  fim: ["fim", "hora fim", "termina"],
  publicar: ["publicar", "publicado", "mostrar no site", "ativo"],
};

function mapearCabecalho(cab: string[]) {
  const indice: Record<string, number> = {};
  cab.forEach((nome, i) => {
    const n = normalizar(nome);
    for (const [chave, apelidos] of Object.entries(colunas)) {
      if (apelidos.some((a) => normalizar(a) === n)) indice[chave] = i;
    }
  });
  return indice;
}

function linhaParaOficina(linha: string[], idx: Record<string, number>): Oficina | null {
  const pega = (chave: string) => (idx[chave] !== undefined ? (linha[idx[chave]] ?? "").trim() : "");

  // Coluna "Publicar": qualquer coisa que nao seja um "nao" explicito publica.
  const publicar = pega("publicar");
  if (publicar && ["nao", "no", "false", "0", "n"].includes(normalizar(publicar))) return null;

  const data = parseData(pega("data"));
  const peca = pega("peca");
  // Sem data valida ou sem peca, a linha e descartada em silencio.
  // Melhor uma data de menos no site que uma data errada.
  if (!data || !peca) return null;

  const inicio = parseHora(pega("inicio"), HORA_INICIO_PADRAO);
  const fim = parseHora(pega("fim"), HORA_FIM_PADRAO);
  const vagasTotais = Math.round(parseNumero(pega("vagasTotais"), VAGAS_PADRAO));
  const brutoDisp = pega("vagasDisponiveis");
  const vagasDisponiveis = brutoDisp
    ? Math.min(Math.round(parseNumero(brutoDisp, vagasTotais)), vagasTotais)
    : vagasTotais;

  const iso = `${data}T${inicio}:00-03:00`;
  if (Number.isNaN(new Date(iso).getTime())) return null;

  return {
    id: data,
    inicio: iso,
    fim: `${data}T${fim}:00-03:00`,
    peca,
    descricao: pega("descricao"),
    precoBRL: Math.round(parseNumero(pega("preco"), PRECO_PADRAO)),
    vagasTotais,
    vagasDisponiveis,
    local: "galpao",
  };
}

async function lerDaPlanilha(): Promise<Oficina[] | null> {
  const url = process.env.AGENDA_CSV_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
      console.error(`[agenda] planilha respondeu ${res.status}`);
      return null;
    }
    const linhas = parseCSV(await res.text());
    if (linhas.length < 2) return [];
    const idx = mapearCabecalho(linhas[0]);
    if (idx.data === undefined || idx.peca === undefined) {
      console.error("[agenda] planilha sem coluna Data ou Peça");
      return null;
    }
    return linhas
      .slice(1)
      .map((l) => linhaParaOficina(l, idx))
      .filter((o): o is Oficina => o !== null);
  } catch (erro) {
    // Planilha fora do ar nunca derruba a pagina.
    console.error("[agenda] falha ao ler a planilha:", erro);
    return null;
  }
}

export async function getOficinas(): Promise<Oficina[]> {
  const daPlanilha = await lerDaPlanilha();
  const todas = daPlanilha ?? agendaLocal;
  const agora = Date.now();
  return todas
    .filter((o) => new Date(o.fim).getTime() > agora)
    .sort((a, b) => a.inicio.localeCompare(b.inicio));
}

/** Diz se a agenda esta vindo da planilha, para a pagina interna avisar a Monica. */
export function fonteDaAgenda() {
  return process.env.AGENDA_CSV_URL ? "planilha" : "arquivo local";
}

/* ------------------------------------------------------------------ *
 * Formatacao
 * ------------------------------------------------------------------ */

export function formatarData(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", day: "numeric", month: "long", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

/** "17 de outubro", sem dia da semana, para usar dentro de frase. */
export function formatarDataCurta(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric", month: "long", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export function formatarHora(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

export function formatarPreco(v: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency", currency: "BRL", minimumFractionDigits: 0,
  }).format(v);
}

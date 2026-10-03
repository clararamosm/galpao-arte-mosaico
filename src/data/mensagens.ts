// Modelos de mensagem da Oficina de Sabado.
//
// A Monica nao edita texto nenhum: ela preenche a data na planilha da agenda e
// estes modelos saem prontos em /interno/mensagens, com data, peca, horario,
// preco e vagas ja dentro.
//
// O unico campo que sobra para a mao dela e [NOME], nas mensagens individuais,
// porque esse muda a cada pessoa.
//
// Voz: primeira pessoa, direta, sem emoji e sem travessao. Reconhece o contato,
// uma linha de contexto, e vai direto para a data concreta. Sem pedir desculpa
// pelo tempo que passou e sem explicar problema de site.

import type { Oficina } from "./oficinas";
import { formatarData, formatarDataCurta, formatarHora, formatarPreco } from "./oficinas";
import { site } from "./site";

export type Modelo = {
  id: string;
  titulo: string;
  canal: "WhatsApp" | "Email" | "Perfil da Empresa";
  quando: string;
  cuidado?: string;
  assunto?: string;
  texto: string;
};

export function modelosPara(o: Oficina): Modelo[] {
  const diaSemana = formatarData(o.inicio);          // "sábado, 17 de outubro"
  const dataCurta = formatarDataCurta(o.inicio);     // "17 de outubro"
  const hIni = formatarHora(o.inicio);
  const hFim = formatarHora(o.fim);
  const preco = formatarPreco(o.precoBRL);
  const vagas = o.vagasDisponiveis;
  const end = `${site.endereco.rua}, ${site.endereco.bairro}`;
  const link = `${site.url}/oficina-de-sabado`;

  return [
    {
      id: "wpp-lista-fria",
      titulo: "WhatsApp para quem já me procurou",
      canal: "WhatsApp",
      quando: "Primeira mensagem para os 78 contatos antigos. Uma por pessoa, nunca em grupo e nunca em lista de transmissão.",
      cuidado: "Mandar de 15 a 20 por dia, começando pelos contatos mais recentes. Trocar [NOME] antes de enviar.",
      texto: `Oi, [NOME], aqui é a Mônica, do Galpão Arte Mosaico.

Você chegou até mim procurando oficina de mosaico, e naquela época eu só trabalhava com aula individual. Agora abri turma de sábado, e lembrei de você.

Vai ser ${diaSemana}, de ${hIni} às ${hFim}, no galpão no ${site.endereco.bairro}. A peça desse dia é ${o.peca.toLowerCase()}. São ${preco} com todo o material e as ferramentas inclusos, e você sai com a peça pronta na mão, no mesmo dia.

Abri ${vagas} ${vagas === 1 ? "vaga" : "vagas"} só, porque quero conduzir cada uma de perto.

Quer que eu guarde uma pra você?`,
    },
    {
      id: "email-lista",
      titulo: "Email para a lista",
      canal: "Email",
      quando: "Para quem deixou email e não respondeu no WhatsApp, ou não tem WhatsApp.",
      cuidado: "Em lotes de 15 a 20, nunca os 78 de uma vez. Domínio sem histórico de envio cai em spam.",
      assunto: `Abri turma de sábado no ateliê, dia ${dataCurta}`,
      texto: `Oi, [NOME],

Aqui é a Mônica Fonseca, do Galpão Arte Mosaico, em Belo Horizonte.

Você entrou em contato comigo em algum momento querendo aprender mosaico. Até agora eu só dava aula individual, e acabei de abrir um formato novo: uma oficina de sábado, em turma pequena.

${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}
De ${hIni} às ${hFim}
No galpão, ${end}
A peça do dia: ${o.peca.toLowerCase()}
${preco}, com material e ferramentas inclusos
${vagas} ${vagas === 1 ? "vaga" : "vagas"}

Não precisa ter experiência nenhuma e não precisa saber desenhar. Em 26 anos de mosaico eu criei atalhos de técnica que fazem a pessoa sair com uma peça grande e bonita em um dia só. Eu conduzo, mas a criação é sua: a peça é inteiramente autoral.

Se quiser garantir o lugar, me responda aqui ou me chame no WhatsApp ${site.telefones.celularFormatado}.

A página da oficina está em ${link}

Um abraço,
Mônica Fonseca
Galpão Arte Mosaico`,
    },
    {
      id: "wpp-confirmacao",
      titulo: "WhatsApp de confirmação",
      canal: "WhatsApp",
      quando: "Assim que a pessoa diz que quer a vaga.",
      texto: `Que bom, [NOME]. Sua vaga está guardada.

${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}, de ${hIni} às ${hFim}
${end}, Belo Horizonte
${preco}, com todo o material incluso

Como funciona o pagamento: metade agora, para reservar, e metade no dia, quando a peça estiver pronta.

O que você precisa trazer: nada. Material, ferramentas, café da manhã e o lanche do meio-dia estão todos inclusos. Venha com roupa que possa sujar e sapato fechado, porque a gente corta azulejo.

Qualquer dúvida até lá, me chame por aqui.`,
    },
    {
      id: "wpp-lembrete",
      titulo: "WhatsApp de lembrete",
      canal: "WhatsApp",
      quando: "Na véspera, à tarde.",
      cuidado: "Este é o que evita a cadeira vazia. Cada lugar vazio custa a margem inteira.",
      texto: `Oi, [NOME], é a Mônica. Passando só para confirmar que amanhã a gente se vê.

${hIni}, ${end}. A peça é ${o.peca.toLowerCase()}.

Roupa que possa sujar e sapato fechado. O resto está todo aqui.

Até amanhã.`,
    },
    {
      id: "wpp-recompra",
      titulo: "Oferta do próximo sábado",
      canal: "WhatsApp",
      quando: "No fim da oficina, com a peça pronta na mão da aluna. Falar olhando, e mandar a mensagem depois.",
      cuidado: "É aqui que compra única vira recompra. A peça pronta na mão é o melhor argumento que existe, e ele dura poucos minutos.",
      texto: `[NOME], que peça linda você fez hoje.

A agenda é rotativa, então no próximo sábado a peça é diferente, e um pouco mais desafiadora. Se você quiser continuar, me avisa que eu guardo seu lugar.

E se conhecer alguém que ia gostar desse dia, me manda o contato. Também faço essa oficina na casa das pessoas, para um grupo de amigas.`,
    },
    {
      id: "perfil-empresa",
      titulo: "Evento no Perfil da Empresa do Google",
      canal: "Perfil da Empresa",
      quando: "Publicar cada sábado como evento, assim que a data entrar na planilha.",
      cuidado: "É o que atende a busca 'perto de mim', que o site não resolve. Publicar sempre, uma por data.",
      texto: `Oficina de mosaico: ${o.peca}

${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}, de ${hIni} às ${hFim}, no Galpão Arte Mosaico, ${end}.

Uma oficina de artesanato presencial em Belo Horizonte, em turma de até ${o.vagasTotais} pessoas. Você corta, assenta e rejunta a sua peça, e sai com ela pronta no mesmo dia. Material e ferramentas inclusos. Não precisa de experiência.

${preco} por pessoa. Informações e reserva pelo WhatsApp ${site.telefones.celularFormatado}.`,
    },
  ];
}

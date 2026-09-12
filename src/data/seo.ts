// Title, meta description e H1 de cada pagina.
// Fonte: titles-e-metas.md. Nao editar aqui sem editar la.
//
// Regra dura: nenhuma pagina carrega "artesanato", "ceramica", "pintura" ou "loja"
// no title, com a unica excecao de /mosaico-ou-ceramica.

export type Seo = { title: string; description: string; h1: string; noindex?: boolean };

export const seo = {
  home: {
    title: "Oficinas de mosaico e vitral em BH | Galpão Arte Mosaico",
    description:
      "Ateliê de mosaico e vitral em Belo Horizonte. Oficinas presenciais com material incluso, onde você sai com a sua peça pronta. 26 anos de ofício.",
    h1: "Mosaico e vitral em Belo Horizonte, com a peça pronta no fim do dia",
  },
  oficinaDeSabado: {
    title: "Curso de mosaico em um sábado, em BH | Galpão Arte Mosaico",
    description:
      "Oficina presencial de mosaico em Belo Horizonte, das 9h às 14h30. R$450 com material incluso, sem experiência, e você sai com a peça pronta.",
    h1: "Um sábado, uma peça sua, pronta para levar para casa",
  },
  mosaicoOuCeramica: {
    title: "Mosaico ou cerâmica: qual oficina é pra você em BH",
    description:
      "Procurando aula de cerâmica em BH? O Galpão Arte Mosaico não trabalha com forno, mas usa cerâmica no mosaico e você leva a peça pronta no mesmo dia.",
    h1: "Você quer cerâmica ou quer sair com uma peça pronta hoje?",
  },
  aulasIndividuais: {
    title: "Aulas individuais de mosaico e vitral | Belo Horizonte",
    description:
      "Aula particular de 6 horas com a Mônica Fonseca, material incluso. Mosaico a partir de R$620 e vitral a partir de R$900, no ateliê no Prado, em BH.",
    h1: "Uma aula, uma pessoa, seis horas",
  },
  vitrais: {
    title: "Vitral em Belo Horizonte: curso, encomenda e restauro",
    description:
      "Vitral Tiffany e vitral em resina sobre policarbonato. Aulas individuais, projetos sob encomenda a partir de R$2.600 o m² e restauração de vitrais em BH.",
    h1: "Vitral Tiffany e vitral em resina, em Belo Horizonte",
  },
  pecas: {
    // PROVISORIO: depende de filtrar /produtos-pronta-entrega por pagina no Search Console.
    title: "Peças em mosaico feitas no ateliê | Galpão Arte Mosaico",
    description:
      "Espelhos, tampos, bandejas e quadros em mosaico, feitos à mão no ateliê em BH. Veja o que dá para fazer e aprenda a fazer o seu na oficina de sábado.",
    h1: "O que sai das mãos daqui",
  },
  mosaicoSobEncomenda: {
    title: "Mosaico sob encomenda para arquitetos e projetos | BH",
    description:
      "Painéis, tampos, pisos e revestimentos em mosaico autoral para projetos de arquitetura e interiores em Belo Horizonte. 26 anos de obra executada.",
    h1: "Mosaico autoral para projeto de arquitetura e interiores",
  },
  oficinasParaEmpresas: {
    title: "Oficina de mosaico para empresas | Galpão Arte Mosaico",
    description:
      "Dinâmica de mosaico para confraternização e integração de times em Belo Horizonte. O grupo sai com um painel feito por ele, que fica na parede da empresa.",
    h1: "O time faz um painel. O painel fica na parede.",
  },
  galeria: {
    title: "Galeria de obras em mosaico e vitral | Galpão Arte Mosaico",
    description:
      "Painéis, tampos, pisos, luminárias e vitrais instalados, feitos por Mônica Fonseca ao longo de 26 anos em Belo Horizonte e no Espírito Santo.",
    h1: "26 anos de obra instalada",
  },
  oAtelie: {
    title: "Ateliê de mosaico no Prado, em BH | Galpão Arte Mosaico",
    description:
      "Rua Brumadinho 1004, Prado, Belo Horizonte. Onde a Mônica executa as obras e recebe as turmas de sábado. Como chegar, horário e contato.",
    h1: "Rua Brumadinho 1004, Prado",
  },
  blog: {
    title: "Blog do Galpão Arte Mosaico | Mosaico, vitral e ofício",
    description:
      "Técnica, bastidor de obra e histórias do ateliê de mosaico e vitral da Mônica Fonseca, em Belo Horizonte.",
    h1: "Do ateliê",
  },
  mentoria: {
    title: "Mentoria em mosaico com Mônica Fonseca",
    description:
      "Acompanhamento mensal para quem já fez oficina e quer desenvolver trabalho próprio em mosaico.",
    h1: "Para quem já sabe e quer continuar",
    noindex: true,
  },
} satisfies Record<string, Seo>;

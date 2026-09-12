// Fonte unica de NAP (nome, endereco, telefone).
// Precisa bater caractere por caractere com o Perfil da Empresa do Google.
export const site = {
  nome: "Galpão Arte Mosaico",
  artista: "Mônica Fonseca",
  url: "https://www.galpaoartemosaico.com.br",
  descricaoCurta: "Ateliê de mosaico e vitral em Belo Horizonte",
  anosDeOficio: 26,

  endereco: {
    rua: "Rua Brumadinho, 1004",
    bairro: "Prado",
    cidade: "Belo Horizonte",
    estado: "MG",
    pais: "BR",
  },

  telefones: {
    celular: "+5531996694369",
    celularFormatado: "(31) 99669-4369",
    fixo: "+553132431169",
    fixoFormatado: "(31) 3243-1169",
  },

  whatsapp: {
    numero: "5531996694369",
    mensagemPadrao: "Oi! Vim pelo site e queria saber sobre a Oficina de Sábado.",
  },

  social: {
    instagram: "https://www.instagram.com/galpaoartemosaico",
    facebook: "https://www.facebook.com/galpaoartemosaico",
    pinterest: "https://br.pinterest.com/galpaoartemosaico",
  },

  // TODO: confirmar antes de virar o DNS.
  googleSiteVerification: "SKA7l1mH0zKIl_cP7ETbEADZsRPvPXZKEI2Smyu2iaU",
} as const;

export function whatsappLink(mensagem: string = site.whatsapp.mensagemPadrao) {
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

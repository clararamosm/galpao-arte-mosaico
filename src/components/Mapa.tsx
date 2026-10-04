import { site } from "@/data/site";

/**
 * Mapa do Perfil da Empresa.
 *
 * Usa o embed sem chave de API, com a busca pelo NOME do negocio mais o
 * endereco, para o pin cair na ficha do Google Meu Negocio e nao num ponto
 * generico da rua.
 *
 * `loading="lazy"` porque o iframe do Google puxa script e cookie de terceiro,
 * e isso nao pode custar na primeira carga. Se um dia a pagina precisar de
 * consentimento de cookie, este iframe e o que fica atras do aceite.
 */
export function Mapa() {
  const e = site.endereco;
  const busca = encodeURIComponent(
    `${site.nome}, ${e.rua}, ${e.bairro}, ${e.cidade}, ${e.estado}`,
  );
  return (
    <div className="mt-10 border-2 border-tinta">
      <iframe
        title={`Mapa do ${site.nome}, ${e.rua}, ${e.bairro}`}
        src={`https://www.google.com/maps?q=${busca}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full sm:h-[420px]"
      />
    </div>
  );
}

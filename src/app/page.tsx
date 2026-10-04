import Link from "next/link";
import { seo } from "@/data/seo";
import { site, whatsappLink } from "@/data/site";
import { getOficinas, formatarData, formatarPreco, formatarHora } from "@/data/oficinas";
import { fotosOficina, fotosAulasIndividuais, fotosObras } from "@/data/fotos";
import { JsonLd } from "@/components/JsonLd";
import { Assinatura } from "@/components/Assinatura";
import { Capsula } from "@/components/Capsula";
import { Botao } from "@/components/Botao";
import { Galeria } from "@/components/Galeria";
import { Secao } from "@/components/Secao";
import { Revelar } from "@/components/Revelar";
import { Mapa } from "@/components/Mapa";

// A home le a mesma planilha da pagina da oficina.
export const revalidate = 300;

function VerTudo({
  href,
  children,
  tom = "papel",
}: {
  href: string;
  children: React.ReactNode;
  tom?: "papel" | "escuro";
}) {
  const cor =
    tom === "escuro"
      ? "border-papel text-papel hover:text-laranja"
      : "border-tinta hover:text-laranja-texto";
  return (
    <Link href={href} className={`mt-8 inline-block border-b-2 pb-1 text-[19px] font-bold ${cor}`}>
      {children}
    </Link>
  );
}

export default async function Home() {
  const e = site.endereco;
  const oficinas = await getOficinas();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.nome,
          url: site.url,
          description: seo.home.description,
          telephone: site.telefones.celular,
          address: {
            "@type": "PostalAddress",
            streetAddress: e.rua,
            addressLocality: e.cidade,
            addressRegion: e.estado,
            addressCountry: e.pais,
          },
          founder: { "@type": "Person", name: site.artista },
          sameAs: [site.social.instagram, site.social.facebook, site.social.pinterest],
        }}
      />

      {/* HERO: assinatura, frase, os dois botoes logo abaixo do titulo, base ancorada. */}
      <section className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pb-16 lg:min-h-[calc(100vh-124px)] lg:px-[72px] lg:pb-14">
        <Assinatura />

        <h1 className="flex grow flex-col justify-center gap-1 pt-8 text-[10.5vw] font-black leading-[0.95] tracking-[-0.04em] sm:gap-0 lg:pt-4 lg:text-[clamp(56px,7.8vw,112px)] lg:leading-[0.92] lg:tracking-[-0.045em]">
          <span>Desde 2001</span>
          <span className="flex items-center gap-0 lg:gap-6">
            transformando
            <span className="hidden lg:inline">
              <Capsula largura={260} alt="Cacos de azulejo cortados à mão" />
            </span>
          </span>
          <span className="flex items-center gap-0 lg:gap-6">
            <span>
              <span className="text-laranja-texto">caco</span> e{" "}
              <span className="text-verde">vidro</span>
            </span>
            <span className="hidden lg:inline">
              <Capsula largura={200} alt="Vitral em laranja e verde" />
            </span>
          </span>
          <em className="texto-vitral font-sotaque pb-3.5 text-[13vw] font-normal italic leading-[0.95] tracking-[-0.02em] lg:whitespace-nowrap lg:text-[clamp(84px,10vw,172px)]">
            em obra de arte.
          </em>
        </h1>

        <div className="flex flex-wrap gap-3">
          <Botao href="#oficinas">Fazer uma oficina</Botao>
          <Botao href="#encomenda" tipo="secundario">
            Encomendar uma obra
          </Botao>
        </div>

        <div className="mt-10 border-t-2 border-tinta pt-[22px]">
          <p className="max-w-[640px] text-[19px] font-medium leading-[1.5]">
            Oficinas de mosaico e vitral para quem quer aprender o ofício com quem vive dele, e
            obra sob encomenda para casas, igrejas e empresas.
          </p>
        </div>
      </section>

      {/* 1. OFICINAS */}
      <Secao
        id="oficinas"
        titulo="Um sábado, e você sai com a"
        sotaque="peça pronta"
        intro="Uma oficina de artesanato presencial em Belo Horizonte, e a técnica é mosaico. No galpão do Prado, das 9h às 14h30, turma de até sete pessoas, material e ferramentas inclusos. Sem experiência nenhuma, e sem precisar saber desenhar."
      >
        {oficinas.length > 0 ? (
          <Revelar grupo como="ul" className="mt-10 grid list-none gap-4 sm:grid-cols-2">
            {oficinas.map((o) => (
              <li key={o.id} className="border-2 border-tinta p-6">
                <p className="font-sotaque text-[26px] italic leading-tight text-verde first-letter:uppercase">
                  {formatarData(o.inicio)}
                </p>
                <p className="mt-2 text-[22px] font-extrabold">{o.peca}</p>
                <p className="mt-2 text-[17px] leading-[1.5] text-apoio">{o.descricao}</p>
                <p className="mt-4 text-[17px] font-bold">
                  {formatarHora(o.inicio)} às {formatarHora(o.fim)} · {formatarPreco(o.precoBRL)} ·{" "}
                  {o.vagasDisponiveis} {o.vagasDisponiveis === 1 ? "vaga" : "vagas"}
                </p>
                <div className="mt-5">
                  <Botao
                    href={whatsappLink(
                      `Oi! Quero garantir minha vaga na Oficina de Sábado de ${formatarData(o.inicio)}, a peça da ${o.peca}.`,
                    )}
                    externo
                    evento="clique-inscricao"
                  >
                    Garantir minha vaga
                  </Botao>
                </div>
              </li>
            ))}
          </Revelar>
        ) : (
          <p className="mt-10 border-2 border-tinta p-6 text-[19px] leading-[1.5]">
            As próximas datas estão sendo fechadas. Chame no WhatsApp que a Mônica avisa assim que
            a agenda abrir.
          </p>
        )}

        <Revelar>
          <Galeria
            fotos={fotosOficina}
            legenda="Peças feitas por alunas nas oficinas. Fotos publicadas com autorização."
          />
          <VerTudo href="/oficina-de-sabado">Ver tudo sobre a Oficina de Sábado</VerTudo>
        </Revelar>
      </Secao>

      {/* 2. AULAS INDIVIDUAIS */}
      <Secao
        id="aulas-individuais"
        titulo="Uma aula, uma pessoa,"
        sotaque="seis horas"
        intro="No ateliê do apartamento, no seu ritmo, com a técnica que você quiser. Material incluso, metade na reserva e metade na conclusão."
      >
        {/* O preco e o dado que a pessoa veio buscar: entra como numero grande,
            nao como linha de apoio em corpo de texto. */}
        <Revelar grupo className="mt-10 grid gap-px border-t-2 border-tinta bg-tinta sm:grid-cols-3">
          {[
            ["Mosaico", "620", "6 horas"],
            ["Vitral em resina", "900", "6 horas"],
            ["Vitral Tiffany", "2.200", "12 horas"],
          ].map(([t, p, d]) => (
            <div key={t} className="bg-papel pb-7 pt-6">
              <p className="text-[17px] font-bold uppercase tracking-[0.08em] text-apoio">{t}</p>
              <p className="mt-3 flex items-baseline gap-1.5 font-black leading-none tracking-[-0.04em]">
                <span className="text-[24px] text-apoio">R$</span>
                <span className="text-[clamp(52px,12vw,68px)]">{p}</span>
              </p>
              <p className="mt-3 text-[19px] font-medium text-apoio">{d} de ateliê</p>
            </div>
          ))}
        </Revelar>

        <Revelar>
          <Galeria
            fotos={fotosAulasIndividuais}
            altura="baixa"
            legenda="Peças que saíram de aulas individuais. Fotos publicadas com autorização."
          />
          <VerTudo href="/aulas-individuais">Ver tudo sobre as aulas individuais</VerTudo>
        </Revelar>
      </Secao>

      {/* 3. VITRAIS E MOSAICO SOB ENCOMENDA */}
      <Secao
        id="encomenda"
        titulo="Vitral e mosaico"
        sotaque="sob encomenda"
        tom="escuro"
        intro="Vitral Tiffany e vitral em resina sobre policarbonato, para casas, igrejas e empresas. Painéis, tampos, pisos e revestimentos em mosaico autoral para projetos de arquitetura. A partir de R$2.600 o metro quadrado."
      >
        <Revelar>
          <Galeria
            fotos={fotosObras}
            tom="escuro"
            legenda="Obras executadas ao longo de 26 anos de ofício."
          />
        </Revelar>
        <div className="flex flex-wrap gap-x-8 gap-y-0">
          <VerTudo href="/vitrais" tom="escuro">
            Ver tudo sobre vitrais
          </VerTudo>
          <VerTudo href="/mosaico-sob-encomenda" tom="escuro">
            Ver mosaico sob encomenda
          </VerTudo>
        </div>
      </Secao>

      {/* 4. EMPRESAS */}
      <Secao
        id="empresas"
        titulo="O time faz um painel."
        sotaque="O painel fica na parede."
        sotaqueNaLinhaDeBaixo
        intro="Dinâmica de mosaico para confraternização e integração, na empresa ou no galpão. De 6 a 90 anos, sem experiência, e o grupo sai com uma peça coletiva."
      >
        <div className="mt-10 border-2 border-dashed border-laranja bg-laranja/10 p-6 text-[17px] leading-relaxed text-apoio">
          <strong className="font-bold text-tinta">Galeria pendente:</strong> faltam fotos de
          oficina em empresa. É a única das quatro galerias sem material. Combinar de fotografar na
          próxima, ou procurar nos arquivos das que já aconteceram.
        </div>
        <VerTudo href="/oficinas-para-empresas">Ver tudo sobre oficinas para empresas</VerTudo>
      </Secao>

      {/* 5. O ATELIE */}
      <Secao
        id="o-atelie"
        titulo="Rua Brumadinho 1004,"
        sotaque="Prado"
        intro="O galpão é onde ficam as obras grandes e as Oficinas de Sábado. As aulas individuais acontecem no ateliê do apartamento, mais intimista. Visitas com hora marcada, de segunda a sábado, das 8h às 18h."
      >
        <Revelar>
          <Mapa />
        </Revelar>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Botao
            href={whatsappLink("Oi! Vim pelo site e queria marcar uma visita ao ateliê.")}
            externo
            evento="clique-visita"
          >
            Marcar uma visita
          </Botao>
          <VerTudo href="/o-atelie">Como chegar</VerTudo>
        </div>
        <p className="mt-12 border-t-2 border-tinta pt-5 text-sm leading-[1.6] text-apoio">
          Casa Cor · Assembleia Legislativa de MG · Shopping Vitória · Feira Nacional de
          Artesanato · Curso em Barcelona
        </p>
      </Secao>
    </>
  );
}

import type { Metadata } from "next";
import { getOficinas, formatarData, formatarPreco, fonteDaAgenda } from "@/data/oficinas";
import { modelosPara } from "@/data/mensagens";
import { BotaoCopiar } from "@/components/BotaoCopiar";

export const metadata: Metadata = {
  title: "Mensagens da Oficina de Sábado",
  robots: { index: false, follow: false },
};

export const revalidate = 300;

export default async function Mensagens() {
  const oficinas = await getOficinas();
  const fonte = fonteDaAgenda();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-3xl leading-tight">Mensagens da Oficina de Sábado</h1>
      <p className="mt-5 leading-relaxed text-tinta/80">
        Tudo aqui já sai com a data, o horário, a peça, o preço e as vagas preenchidos, do jeito
        que está na planilha da agenda. Não precisa editar nada, só copiar e colar.
      </p>
      <p className="mt-3 leading-relaxed text-tinta/80">
        Onde aparecer <code className="rounded bg-tinta/10 px-1.5 py-0.5 text-sm">[NOME]</code>, é
        para trocar pelo nome da pessoa antes de enviar.
      </p>
      <p className="mt-3 text-sm text-tinta/60">
        Agenda lida de: {fonte}. Se você acabou de mudar a planilha, pode levar até cinco minutos
        para aparecer aqui.
      </p>

      {oficinas.length === 0 ? (
        <div className="mt-10 rounded border border-dashed border-laranja/60 bg-laranja/10 p-5 leading-relaxed">
          <p className="font-medium">Nenhuma data publicada ainda.</p>
          <p className="mt-2 text-sm text-tinta/75">
            Preencha uma linha na planilha da agenda com a data e a peça. As mensagens aparecem
            aqui prontas em seguida.
          </p>
        </div>
      ) : (
        oficinas.map((o) => (
          <section key={o.id} className="mt-14">
            <div className="rounded border border-verde/30 bg-verde/5 p-5">
              <h2 className="text-2xl capitalize">{formatarData(o.inicio)}</h2>
              <p className="mt-1 text-sm text-tinta/75">
                {o.peca}. {formatarPreco(o.precoBRL)}. {o.vagasDisponiveis} de {o.vagasTotais}{" "}
                {o.vagasTotais === 1 ? "vaga" : "vagas"}.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {modelosPara(o).map((m) => (
                <article key={m.id} className="rounded border border-tinta/25 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sotaque italic text-lg">{m.titulo}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-tinta/50">
                        {m.canal}
                      </p>
                    </div>
                    <BotaoCopiar
                      texto={m.assunto ? `${m.assunto}\n\n${m.texto}` : m.texto}
                      rotulo="Copiar texto"
                    />
                  </div>

                  <p className="mt-3 text-sm text-tinta/75">
                    <strong className="font-medium">Quando usar:</strong> {m.quando}
                  </p>
                  {m.cuidado ? (
                    <p className="mt-2 text-sm text-laranja-texto">
                      <strong className="font-medium">Atenção:</strong> {m.cuidado}
                    </p>
                  ) : null}

                  {m.assunto ? (
                    <div className="mt-4 flex items-center gap-3">
                      <p className="flex-1 rounded bg-tinta/5 px-3 py-2 text-sm">
                        <span className="text-tinta/60">Assunto: </span>
                        {m.assunto}
                      </p>
                      <BotaoCopiar texto={m.assunto} rotulo="Copiar assunto" />
                    </div>
                  ) : null}

                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded bg-papel p-4 font-sans text-sm leading-relaxed">
                    {m.texto}
                  </pre>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

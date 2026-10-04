/**
 * Requisito da spec: campo de telefone, que o site do Wix nunca teve.
 * Os 78 contatos herdados nao tem telefone nenhum por causa disso.
 *
 * TODO: ligar o `action` a um destino real (rota de API, Formspree, Resend).
 * Decisao pendente junto com a de onde vai morar o email marketing.
 */
export function ContactForm({ assunto }: { assunto: string }) {
  const campo =
    "mt-1 w-full rounded border border-tinta/25 bg-white px-3 py-2 text-sm outline-none focus:border-verde";

  return (
    <form className="max-w-md space-y-4" data-evento="formulario-contato">
      <input type="hidden" name="assunto" value={assunto} />

      <label className="block text-sm">
        Nome
        <input name="nome" required autoComplete="name" className={campo} />
      </label>

      <label className="block text-sm">
        Email
        <input type="email" name="email" required autoComplete="email" className={campo} />
      </label>

      <label className="block text-sm">
        WhatsApp
        <input
          type="tel"
          name="telefone"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(31) 90000-0000"
          className={campo}
        />
      </label>

      <label className="block text-sm">
        Mensagem
        <textarea name="mensagem" rows={4} className={campo} />
      </label>

      <button
        type="submit"
        className="rounded bg-laranja px-5 py-2.5 text-sm font-medium text-tinta transition hover:opacity-90"
      >
        Enviar
      </button>
    </form>
  );
}

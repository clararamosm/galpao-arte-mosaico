"use client";

import { useState } from "react";

export function BotaoCopiar({ texto, rotulo = "Copiar" }: { texto: string; rotulo?: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Navegador sem permissao de area de transferencia: o texto continua
      // selecionavel na tela, entao nao ha o que fazer alem de nao travar.
      setCopiado(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="rounded border border-azulejo px-3 py-1.5 text-xs font-medium text-azulejo transition hover:bg-azulejo hover:text-papel"
    >
      {copiado ? "Copiado" : rotulo}
    </button>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Entrada por rolagem. Observa o elemento e marca `visivel` quando ele aparece.
 *
 * Tres cuidados:
 * 1. O estado escondido mora em `.js .revelar`, e a classe `js` so entra se o
 *    script do layout rodar. Sem JS a pagina continua legivel.
 * 2. `unobserve` depois de revelar: a animacao acontece uma vez, nao toda vez
 *    que o bloco cruza a tela.
 * 3. `prefers-reduced-motion` desliga tudo pelo CSS.
 */
export function Revelar({
  children,
  grupo = false,
  className = "",
}: {
  children: React.ReactNode;
  grupo?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se ja esta na tela no primeiro quadro, revela sem esperar rolagem.
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${grupo ? "revelar-grupo" : "revelar"} ${className}`}>
      {children}
    </div>
  );
}

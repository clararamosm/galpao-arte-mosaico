"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { menu } from "@/data/menu";

/**
 * Desktop: menu inteiro na horizontal.
 * Celular: hamburguer. Seis itens em linha ocupavam duas linhas e comiam a
 * primeira dobra, que e onde 77% dos cliques decidem.
 */
export function Menu() {
  const [aberto, setAberto] = useState(false);

  // Escape fecha, e com o painel aberto a pagina nao rola por tras.
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <>
      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex gap-x-[30px] text-[15px] font-medium">
          {menu.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="hover:text-laranja-texto">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-expanded={aberto}
        aria-controls="menu-celular"
        className="flex h-11 items-center gap-2 px-1 text-[15px] font-bold lg:hidden"
      >
        <span className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="block h-[2px] w-6 bg-tinta" />
          <span className="block h-[2px] w-6 bg-tinta" />
          <span className="block h-[2px] w-6 bg-tinta" />
        </span>
        Menu
      </button>

      {aberto ? (
        <div
          id="menu-celular"
          className="fixed inset-0 z-[60] flex flex-col bg-papel px-6 py-4 lg:hidden"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setAberto(false)}
              className="h-11 px-1 text-[15px] font-bold"
            >
              Fechar
            </button>
          </div>
          <ul className="mt-6 flex flex-col gap-1">
            {menu.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  onClick={() => setAberto(false)}
                  className="block py-3 text-[32px] font-black leading-tight tracking-[-0.03em]"
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-auto font-sotaque text-2xl italic text-verde">
            Mônica Fonseca, artista autoral
          </p>
        </div>
      ) : null}
    </>
  );
}

import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const e = site.endereco;
  return (
    <footer className="mt-24 border-t border-rejunte bg-rejunte/40">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-titulo)] text-base">{site.nome}</p>
          <address className="mt-2 not-italic text-sm leading-relaxed">
            {e.rua}, {e.bairro}
            <br />
            {e.cidade}, {e.estado}
            <br />
            <a href={`tel:${site.telefones.celular}`} className="hover:underline">
              {site.telefones.celularFormatado}
            </a>
            <br />
            <a href={`tel:${site.telefones.fixo}`} className="hover:underline">
              {site.telefones.fixoFormatado}
            </a>
          </address>
        </div>

        <nav aria-label="Rodapé">
          <ul className="space-y-2 text-sm">
            <li><Link href="/oficinas-para-empresas" className="hover:underline">Oficinas para empresas</Link></li>
            <li><Link href="/mosaico-sob-encomenda" className="hover:underline">Mosaico sob encomenda</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </nav>

        <ul className="space-y-2 text-sm">
          <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
          <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
          <li><a href={site.social.pinterest} target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a></li>
        </ul>
      </div>
    </footer>
  );
}

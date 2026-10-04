import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const e = site.endereco;
  return (
    <footer className="mt-24 bg-tinta text-papel">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 sm:grid-cols-3 sm:px-[72px]">
        <div>
          <Image
            src="/identidade/logo-claro.png"
            alt={site.nome}
            width={718}
            height={386}
            className="h-11 w-auto"
          />
          <address className="mt-5 not-italic text-[17px] leading-relaxed">
            {e.rua}, {e.bairro}
            <br />
            {e.cidade}, {e.estado}
            <br />
            <span className="text-papel/70">Visitas com hora marcada</span>
            <br />
            <a href={`tel:${site.telefones.celular}`} className="hover:underline">
              {site.telefones.celularFormatado}
            </a>
          </address>
        </div>

        <nav aria-label="Rodapé">
          <ul className="space-y-3 text-[17px]">
            <li><Link href="/oficinas-para-empresas" className="hover:underline">Oficinas para empresas</Link></li>
            <li><Link href="/mosaico-sob-encomenda" className="hover:underline">Mosaico sob encomenda</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          </ul>
        </nav>

        <ul className="space-y-3 text-[17px]">
          <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
          <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
          <li><a href={site.social.pinterest} target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a></li>
        </ul>
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 sm:px-[72px]">
        <p className="font-sotaque text-2xl italic text-papel/80">
          Mônica Fonseca, artista autoral
        </p>
      </div>
    </footer>
  );
}

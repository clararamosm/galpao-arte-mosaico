import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-6 py-4 sm:py-6 lg:px-[72px]">
      <Link href="/" aria-label={site.nome}>
        <Image
          src="/identidade/logo.png"
          alt={site.nome}
          width={718}
          height={386}
          priority
          className="h-10 w-auto sm:h-[52px]"
        />
      </Link>
      <Menu />
    </header>
  );
}

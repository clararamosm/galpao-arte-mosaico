/**
 * Como a Monica "assina" a pagina: retrato em circulo com aro laranja,
 * ao lado do nome em italico verde.
 *
 * PENDENTE: o retrato dela. Nao escolhi no escuro porque as fotos de `aulas`
 * sao de alunas, nao dela. Trocar o bloco por <Image src="/identidade/monica.jpg" />
 * assim que a Clara apontar o arquivo.
 */
export function Assinatura() {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-laranja bg-papel text-center text-[9px] leading-tight text-apoio"
        aria-hidden="true"
        title="Retrato da Mônica, pendente de curadoria"
      >
        foto
        <br />
        pendente
      </div>
      <p className="font-sotaque text-2xl italic text-verde sm:text-[30px]">
        Mônica Fonseca, artista autoral
      </p>
    </div>
  );
}

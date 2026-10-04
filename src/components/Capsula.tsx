/**
 * Foto de obra dentro do titulo, em formato de capsula, como se fosse palavra.
 * Altura de cerca de 0,8 da altura da letra. No maximo duas por titulo.
 * So foto de obra ou de material, nunca rosto.
 *
 * PENDENTE: as duas fotos do hero. Enquanto a curadoria nao define, o espaco
 * fica com o padrao de vitral, que e a linguagem grafica dela, em vez de uma
 * foto escolhida no escuro.
 */
export function Capsula({ largura, alt }: { largura: number; alt: string }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className="inline-block shrink-0 rounded-full border-2 border-chumbo bg-cover bg-center"
      style={{
        width: largura,
        height: 92,
        backgroundImage: "url(/identidade/vitral-fundo.svg)",
        backgroundSize: "420px auto",
      }}
    />
  );
}

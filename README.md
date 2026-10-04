# Galpão Arte Mosaico

Site do ateliê de Mônica Fonseca, em Belo Horizonte. Next.js 15 (App Router), TypeScript, Tailwind v4, hospedado na Vercel.

Substitui o site da Wix em `galpaoartemosaico.com.br`. O plano de migração, a análise de busca que o orienta e as decisões já fechadas estão fora deste repositório, na pasta do projeto: `PLANO.md`, `spec-migracao-site.md`, `analise-consultas-gsc.md`, `titles-e-metas.md`, `wireframe.md`.

## Rodar local

```bash
npm install
npm run dev
```

## Variável de ambiente

Uma só, e o site depende dela:

```
AGENDA_CSV_URL="https://docs.google.com/spreadsheets/d/<id>/export?format=csv"
```

É a planilha onde a Mônica escreve as datas da Oficina de Sábado. **Sem essa variável a home mostra o aviso de "datas sendo fechadas" mesmo com a planilha preenchida.** Em local vai no `.env.local`, que o git ignora. Na Vercel vai em Settings, Environment Variables, nos três ambientes.

## Onde ficam as coisas

| Caminho | O que é |
|---|---|
| `src/app/page.tsx` | A home longa, que concentra todas as ofertas |
| `src/app/<rota>/` | As páginas dedicadas, que existem para o SEO |
| `src/app/interno/` | Área da Mônica, com `noindex` e fora do sitemap |
| `src/middleware.ts` | O mapa de 301 do site antigo. **Mexer aqui é mexer no tráfego** |
| `src/data/site.ts` | Endereço, telefones e redes. Fonte única do NAP |
| `src/data/seo.ts` | Title, description e H1 de cada página |
| `src/data/oficinas.ts` | Leitura da planilha da agenda |
| `src/data/mensagens.ts` | Modelos de WhatsApp e email com variáveis |
| `public/fotos/` | Seleção em uso. O acervo completo mora fora do repositório |

## Três coisas que quebram se forem mexidas sem cuidado

1. **O 301 é literal.** O `redirects()` do Next emite 308, não 301, por isso o mapa vive no `middleware.ts`. E ele monta a URL com `new URL(alvo, req.url)`: `nextUrl.clone()` carrega o estado da barra final e cria laço infinito.
2. **`a { color: inherit }` precisa ficar dentro de `@layer base`.** CSS sem camada vence as utilidades do Tailwind v4 e apaga o texto dos botões.
3. **Foto nova precisa entrar sem metadado.** 222 das 274 originais carregavam coordenada de GPS, inclusive as das alunas.

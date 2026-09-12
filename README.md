# Site do Galpão Arte Mosaico

Migração do Wix para Next.js no Vercel. Mesmo domínio, mesma URL raiz.

Documentos que governam este código, na pasta acima:

- `spec-migracao-site.md` arquitetura, mapa de 301, fases e riscos
- `titles-e-metas.md` title, meta e H1 de cada página
- `analise-consultas-gsc.md` classificação das 422 consultas
- `o-que-a-monica-ensina.md` fonte única sobre oferta

## Rodar

```
npm install
npm run dev
```

## Antes de virar o DNS

1. Conferir os sete redirecionamentos de `next.config.ts`
2. Conferir que `/` nunca mudou de endereço
3. Substituir a verificação do Search Console em `src/data/site.ts`
4. Enviar o sitemap novo e pedir reindexação

## Onde ficam as datas da Oficina de Sábado

`src/data/oficinas.ts`. Hoje é um arquivo, o que exige deploy a cada mudança.
O mecanismo definitivo (planilha ou CMS) ainda não foi decidido. A interface
`Oficina` foi desenhada para que a troca de fonte seja alteração de um arquivo só.

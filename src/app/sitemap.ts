import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// /mentoria fica fora do sitemap de proposito: e noindex.
const rotas = [
  { path: "/", priority: 1.0 },
  { path: "/oficina-de-sabado", priority: 0.9 },
  { path: "/aulas-individuais", priority: 0.8 },
  { path: "/vitrais", priority: 0.7 },
  { path: "/pecas", priority: 0.8 },
  { path: "/mosaico-ou-ceramica", priority: 0.6 },
  { path: "/mosaico-sob-encomenda", priority: 0.6 },
  { path: "/oficinas-para-empresas", priority: 0.5 },
  { path: "/galeria", priority: 0.6 },
  { path: "/o-atelie", priority: 0.6 },
  { path: "/blog", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return rotas.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: agora,
    priority: r.priority,
  }));
}

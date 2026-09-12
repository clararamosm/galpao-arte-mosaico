import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Os redirecionamentos da migracao NAO ficam aqui. O helper `redirects()` do Next
  // emite 308, e a spec pede 301 explicito. Ver `src/middleware.ts`.
  //
  // Esta flag desliga a normalizacao automatica de barra final do Next, que rodava
  // antes do middleware e criava cadeia de dois saltos em `/produtos-pronta-entrega/`.
  // Com ela desligada, o middleware resolve barra final e mapa de migracao numa
  // unica volta de 301. A spec proibe cadeia.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

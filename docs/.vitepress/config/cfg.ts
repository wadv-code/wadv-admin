import type { HeadConfig } from "vitepress";
import type { PwaOptions } from "@vite-pwa/vitepress";
import { resolve } from "node:path";

export function head(): HeadConfig[] {
  return [
    // jsdelivr
    // [
    //   'link',
    //   { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css' }
    // ],
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' }],

    // unpkg
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://unpkg.com/@fancyapps/ui@4.0.31/dist/fancybox.css",
      },
    ],
    [
      "script",
      { src: "https://unpkg.com/@fancyapps/ui@4.0.31/dist/fancybox.umd.js" },
    ],
    ["link", { href: "/docs/favicon.ico", rel: "icon" }],
  ];
}

export function pwa(): PwaOptions {
  return {
    includeManifestIcons: false,
    manifest: {
      description:
        "WAdv Admin is a modern admin dashboard template based on Vue 3. ",
      id: "/",
      name: "WAdv Admin Doc",
      short_name: "wadv_admin_doc",
      theme_color: "#ffffff",
    },
    outDir: resolve(process.cwd(), ".vitepress/dist"),
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
    },
  };
}

import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = Number(env.VITE_PORT || 5173)
  const outDir = env.VITE_APP_OUTDIR || 'dist'
  const devtools = env.VITE_DEVTOOLS === 'true'
  const base = env.VITE_BASE || '/'
  const title = env.VITE_APP_TITLE || 'WAdv Admin'

  // 插件
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    createHtmlPlugin({ inject: { data: { title } } }),
    VitePWA(),
  ]

  // 开启devtools
  if (devtools) plugins.push(vueDevTools())

  return {
    base,
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: { port },
    build: {
      outDir,
      rollupOptions: {
        output: {
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'jse/index-[name]-[hash].js',
        },
      },
    },
    define: {
      __VITE_PORT__: port,
      __VITE_DEVTOOLS__: devtools,
      __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
      __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
    },
  }
})

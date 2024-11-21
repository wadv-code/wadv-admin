import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const port = Number(env.VITE_PORT || 5173);
    const outDir = env.VITE_APP_OUTDIR || 'dist';
    const devtools = env.VITE_DEVTOOLS === 'true';
    const plugins = [vue(), vueJsx(), VitePWA()];
    if (devtools)
        plugins.push(vueDevTools());
    return {
        plugins,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: { port },
        build: { outDir },
        define: {
            __VITE_PORT__: port,
            __VITE_DEVTOOLS__: devtools,
            __NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
            __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
        },
    };
});

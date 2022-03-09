import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const { API_PROXY_URL } = loadEnv(mode, process.cwd())

  const proxyUrl = API_PROXY_URL || 'http://localhost:3333'

  return {
    test: {
      environment: 'happy-dom',
    },
    build: {
      outDir: path.resolve(__dirname, '..', './public'),
    },
    plugins: [vue()],
    resolve: {
      alias: [{ find: '@layouts', replacement: path.resolve(__dirname, 'layouts') }],
    },
    server: {
      proxy: {
        '^/api/.*': {
          target: `${proxyUrl}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})

import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const input = {
  main: resolve(__dirname, 'index.html'),
  dashboard: resolve(__dirname, 'dashboard.html'),
  vision: resolve(__dirname, 'vision.html'),
}

if (fs.existsSync(resolve(__dirname, 'palette-8.html'))) {
  input.palette8 = resolve(__dirname, 'palette-8.html')
}

export default defineConfig({
  base: './',
  server: {
    allowedHosts: ['.lhr.life', '.trycloudflare.com', '.loca.lt', 'localhost', '127.0.0.1'],
  },
  preview: {
    allowedHosts: ['.lhr.life', '.trycloudflare.com', '.loca.lt', 'localhost', '127.0.0.1'],
  },
  build: {
    rollupOptions: {
      input,
    },
  },
})



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // UiPath Coded Apps mount under a non-root path — assets must be relative.
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: 5180, strictPort: true },
  build: { chunkSizeWarningLimit: 700 },
})

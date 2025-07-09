import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { intlayerPlugin } from 'vite-intlayer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})

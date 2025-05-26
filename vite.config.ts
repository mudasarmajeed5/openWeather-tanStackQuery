import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'  // <-- import path module

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // <-- tell Vite what '@' means
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      manifest: {
        name: 'My Vite PWA App',
        short_name: 'VitePWA',
        description: 'A React Vite App with PWA support',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo2.png',
            sizes: 'any',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
})

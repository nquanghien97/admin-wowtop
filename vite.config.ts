import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4001,
    host: true,
    // proxy:{
    //   '/api': {
    //     target: 'https://unamocdon.vn',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // },
  },
  preview: {
    port: 4001,
  }
})

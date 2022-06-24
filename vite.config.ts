import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: './src',
  base: './',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
    fs: {
      strict: false
    }
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js'
      }
    },
    brotliSize: false,
    minify: 'esbuild' // or `false`
  }
})

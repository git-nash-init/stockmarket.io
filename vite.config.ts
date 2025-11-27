import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/pages": resolve(__dirname, "./src/pages"),
      "@/lib": resolve(__dirname, "./src/lib"),
      "@/services": resolve(__dirname, "./src/services"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/assets": resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          ui: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    port: 4173,
    host: true,
    open: true,
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/storage',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
})
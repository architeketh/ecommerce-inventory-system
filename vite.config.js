import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠ IMPORTANT: set the base to your GitHub repo name for correct asset paths
export default defineConfig({
  plugins: [react()],
  base: '/ecommerce-inventory-system/',  // GitHub Pages subpath
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clears previous builds
  },
  server: {
    port: 5173,
  },
})

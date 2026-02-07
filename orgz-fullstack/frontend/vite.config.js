import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true, // Expose to network
    port: 5173, // Fixed port
    open: true  // Auto-open browser
  }
})

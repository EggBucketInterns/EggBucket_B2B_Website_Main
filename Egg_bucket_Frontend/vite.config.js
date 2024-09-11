import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use the environment variable PORT or default to 3000
    host: '0.0.0.0',  // Listen on all available network interfaces
  },
})

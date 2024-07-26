import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  // Porta http (localhost)
  plugins: [react()],
  server: {
    port: 3001
  }
})

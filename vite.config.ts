import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rocketcup-ban-pick-tool/',
  plugins: [react(), tailwindcss()],
})

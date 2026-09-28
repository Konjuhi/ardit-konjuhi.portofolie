import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain GitHub Pages (arditkonjuhi.xyz) serves from the site root.
// A repo-path base like /ardit-konjuhi.portofolie/ 404s those assets on the apex.
export default defineConfig({
  plugins: [react()],
  base: '/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()]
  // base: "https://andrias01.github.io/github-pages",
  // npm i --save-dev gh-pages
  // "predeploy": "npm run build",
  //   "deploy": "gh-pages -d dist"
  // en consola
  // npm run deploy
  // https://www.youtube.com/watch?v=ZI7MXe-6HzA
})

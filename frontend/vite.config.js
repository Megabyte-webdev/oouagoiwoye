import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8020,
    proxy: {
      "/api" : "https://api.oouweb.site"
      // "/api" : "http://localhost:5000"
    }
  }
})


///addd to package .json
//"homepage": "https://megabyte-webdev.github.io/olabisionabanjouniversitywithreact.com/",
// add to script
// "predeploy": "npm run build",
//     "deploy": "gh-pages -d build"
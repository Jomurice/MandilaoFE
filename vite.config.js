import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080', // địa chỉ backend Spring Boot
    //     changeOrigin: true,

    //     secure: false, // chỉ dùng dev local, không được dùng trong production deploy.
    //     rewrite: path => path.replace(/^\/api/, ''), // <- Quan trọng!
    //     secure: false // chỉ dùng dev local, không được dùng trong production deploy.
    //   }
    // }

  }
})

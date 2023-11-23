import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // alias
  resolve: {
    alias: {
      socket: "/src/socket",
    },
  },

  plugins: [react()],
});

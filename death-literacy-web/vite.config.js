import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Cse3CAPGroup404/',
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: true
  }
});

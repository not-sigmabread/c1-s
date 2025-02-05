import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.gitpod.io'  // This will allow all Gitpod workspace domains
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});

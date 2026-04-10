import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    host: true, // Exposes server to local network (0.0.0.0)
    port: 5173,
    strictPort: false,
    cors: true,
  }
});

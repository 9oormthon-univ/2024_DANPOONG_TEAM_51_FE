import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@component': path.resolve(__dirname, 'src/page/component'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@image': path.resolve(__dirname, 'src/common/asset/image'),
      '@style': path.resolve(__dirname, 'src/common/style'),
      '@main': path.resolve(__dirname, 'src/page/main'),
    },
  },
});
